import React, { useState } from 'react';
import { Calculator, ArrowRight, Trash2, Edit3, Check, Loader2, Building2, CreditCard, ChevronDown } from 'lucide-react';
import BankTransferModal from './BankTransferModal';

const availableSubjects = [
  { id: 'math', name: 'Mathematics', levels: ['Beginner Level', 'Intermediate Level', 'Advanced Level'], price: 5.00 },
  { id: 'science', name: 'Science', levels: ['Beginner Level', 'Intermediate Level', 'Advanced Level'], price: 5.00 },
  { id: 'english', name: 'English', levels: ['Beginner Level', 'Intermediate Level', 'Advanced Level'], price: 5.00 },
  { id: 'coding', name: 'Coding', levels: ['Beginner Level', 'Intermediate Level', 'Advanced Level'], price: 5.00 },
];

export default function CompleteEnrollment({ 
  initialCourses = [
    { id: 'math', name: 'Mathematics', level: 'Beginner Level', price: 5.00 },
    { id: 'science', name: 'Science', level: 'Intermediate Level', price: 5.00 },
    { id: 'coding', name: 'Coding', level: 'Beginner Level', price: 5.00 },
  ],
  onBack, 
  onComplete,
  onEditCourses 
}) {
  const [courses, setCourses] = useState(initialCourses);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isEditing, setIsEditing] = useState(false);
  
  // Payment Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update a specific course's subject or level inline
  const handleUpdateCourse = (index, field, value) => {
    setCourses(prev => {
      const updated = [...prev];
      if (field === 'name') {
        const selectedSub = availableSubjects.find(s => s.name === value);
        if (selectedSub) {
          updated[index] = {
            ...updated[index],
            id: selectedSub.id,
            name: selectedSub.name,
            level: selectedSub.levels[0], // Reset to default level of new subject
          };
        }
      } else if (field === 'level') {
        updated[index] = {
          ...updated[index],
          level: value,
        };
      }
      return updated;
    });
  };

  const handleRemoveCourse = (index) => {
    setCourses(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate dynamic monthly total
  const monthlyTotal = courses.reduce((sum, course) => sum + (course.price || 5.00), 0);

  const handlePayNow = (e) => {
    e.preventDefault();
    if (courses.length === 0) return;

    if (paymentMethod === 'bank') {
      setShowBankModal(true);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        if (onComplete) {
          onComplete({
            courses,
            paymentMethod: 'card',
            monthlyTotal,
            status: 'success'
          });
        }
      }, 2000);
    }
  };

  const handleConfirmBankTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowBankModal(false);
      if (onComplete) {
        onComplete({
          courses,
          paymentMethod: 'bank',
          monthlyTotal,
          status: 'success'
        });
      }
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white flex flex-col justify-between font-sans relative">
      <div className="w-full space-y-6">
        
        {/* Header Section */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#111111]">
            Complete Your Enrollment
          </h2>
          <p className="mt-1 text-xs font-medium text-[#8B94AD]">
            Review your details and complete your payment to start learning.
          </p>
        </div>

        {/* Selected Courses Section */}
        <div className="space-y-3 w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#111111]">
              Selected Courses ({courses.length})
            </span>
            <button 
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-semibold text-[#30336B] hover:underline cursor-pointer flex items-center gap-1"
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">Done Editing</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3 h-3" />
                  <span>View & Edit</span>
                </>
              )}
            </button>
          </div>

          {/* Courses List Container */}
          <div className="divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
            {courses.length > 0 ? (
              courses.map((course, index) => {
                const currentSubject = availableSubjects.find(s => s.name === course.name) || availableSubjects[0];

                return (
                  <div key={index} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-3.5 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-[#2E3192] flex items-center justify-center shrink-0 shadow-xs">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>

                      {/* Normal view vs Dropdown Edit view */}
                      {!isEditing ? (
                        <div>
                          <h3 className="text-xs font-bold text-[#111111]">{course.name}</h3>
                          <p className="text-[11px] text-[#8B94AD] mt-0.5">{course.level}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1">
                          {/* Course Selection Dropdown */}
                          <div className="relative w-full sm:w-auto">
                            <select
                              value={course.name}
                              onChange={(e) => handleUpdateCourse(index, 'name', e.target.value)}
                              className="appearance-none bg-[#EEF2F6] border border-[#E2E8F0] text-[#111111] text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-[#3C2EFF] cursor-pointer w-full font-semibold"
                            >
                              {availableSubjects.map((sub) => (
                                <option key={sub.id} value={sub.name}>{sub.name}</option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-[#8B94AD] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>

                          {/* Level Selection Dropdown */}
                          <div className="relative w-full sm:w-auto">
                            <select
                              value={course.level}
                              onChange={(e) => handleUpdateCourse(index, 'level', e.target.value)}
                              className="appearance-none bg-[#EEF2F6] border border-[#E2E8F0] text-[#111111] text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-[#3C2EFF] cursor-pointer w-full"
                            >
                              {currentSubject.levels.map((lvl) => (
                                <option key={lvl} value={lvl}>{lvl}</option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-[#8B94AD] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#111111]">
                          ${(course.price || 5.00).toFixed(2)}
                        </span>
                        <span className="text-xs text-[#8B94AD] font-normal"> /mo</span>
                      </div>

                      {/* Remove Button in Edit mode */}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCourse(index)}
                          className="text-[#8B94AD] hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Remove Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-[#8B94AD]">
                No courses selected. Click "View & Edit" to add a course.
              </div>
            )}
          </div>
        </div>

        {/* Total (Monthly) Summary */}
        <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
          <span className="text-xs font-bold text-[#111111]">Total (Monthly)</span>
          <span className="text-sm font-bold text-[#3C2EFF]">${monthlyTotal.toFixed(2)}</span>
        </div>

        {/* Payment Method Section */}
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-bold text-[#111111]">Payment Method</h3>
          
          <div className="space-y-2.5">
            {/* Pay with Card Option */}
            <div
              onClick={() => setPaymentMethod('card')}
              className="flex items-center space-x-3 cursor-pointer select-none group p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#30336B] transition-all bg-white"
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                paymentMethod === 'card' ? 'border-[#30336B]' : 'border-[#E2E8F0] group-hover:border-gray-400'
              }`}>
                {paymentMethod === 'card' && <div className="w-2 h-2 bg-[#30336B] rounded-full" />}
              </div>
              <CreditCard className="w-4 h-4 text-[#30336B]" />
              <span className="text-xs text-[#111111] font-medium">Pay with Card (Instant)</span>
            </div>

            {/* Bank Transfer Option */}
            <div
              onClick={() => setPaymentMethod('bank')}
              className="flex items-center space-x-3 cursor-pointer select-none group p-2.5 rounded-xl border border-[#E2E8F0] hover:border-[#30336B] transition-all bg-white"
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                paymentMethod === 'bank' ? 'border-[#30336B]' : 'border-[#E2E8F0] group-hover:border-gray-400'
              }`}>
                {paymentMethod === 'bank' && <div className="w-2 h-2 bg-[#30336B] rounded-full" />}
              </div>
              <Building2 className="w-4 h-4 text-[#30336B]" />
              <span className="text-xs text-[#111111] font-medium">Bank Transfer (Manual)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation & Action Buttons */}
      <div className="mt-8 flex w-full items-center justify-between border-t border-[#F1F3F7] pt-5">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#F1F3F7] px-6 text-xs font-bold text-[#30336B] transition-colors hover:bg-[#E8EBF1] cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePayNow}
          disabled={courses.length === 0 || isProcessing}
          className={`inline-flex min-h-[42px] items-center justify-center rounded-xl px-6 text-xs font-bold text-white shadow-sm transition-colors gap-2 ${
            courses.length > 0 && !isProcessing
              ? 'bg-[#30336B] hover:bg-[#252854] cursor-pointer' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{paymentMethod === 'card' ? 'Pay Now' : 'Proceed to Bank Transfer'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Bank Transfer Instructions Modal Component */}
      {showBankModal && (
        <BankTransferModal
          monthlyTotal={monthlyTotal}
          copied={copied}
          isProcessing={isProcessing}
          onCopy={() => copyToClipboard('4098231902')}
          onClose={() => setShowBankModal(false)}
          onConfirm={handleConfirmBankTransfer}
        />
      )}
    </div>
  );
}