import React, { useState } from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';

export default function EnterLinkCodeForm({ onBack }) {
  const [linkCode, setLinkCode] = useState('');

  // Sample learner preview data fetched from API
  const learnerData = {
    name: 'Olivia Johnson',
    grade: 'Year 1 · Learner Account',
    status: 'Account Found',
    courses: [
      { id: 1, title: 'Mathematics', grade: 'Year 1' },
      { id: 2, title: 'Mathematics', grade: 'Year 1' },
      { id: 3, title: 'Mathematics', grade: 'Year 1' },
      { id: 4, title: 'Mathematics', grade: 'Year 1' },
      { id: 5, title: 'Mathematics', grade: 'Year 1' },
      { id: 6, title: 'Mathematics', grade: 'Year 1' },
    ],
  };

  // Show account details only when a code has been entered
  const isCodeEntered = linkCode.trim().length > 0;

  return (
    <div className="w-full font-sans text-slate-800 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Enter Your Child's Link Code
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
          Ask your child for their link code. They can find it on their account setup complete page.
        </p>
      </div>

      {/* Input Field */}
      <div className="w-full">
        <label className="block text-xs font-bold text-gray-900 mb-2">
          Link Code
        </label>
        <input
          type="text"
          value={linkCode}
          onChange={(e) => setLinkCode(e.target.value)}
          placeholder="Enter the 6 character code"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base sm:text-sm placeholder:text-gray-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
        />
      </div>

      {/* Found Account Preview Box - Appears only when code is entered */}
      {isCodeEntered && (
        <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden w-full animate-in fade-in duration-300">
          {/* Profile Bar */}
          <div className="p-5 flex items-start gap-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 leading-snug">
                {learnerData.name}
              </h3>
              <p className="text-xs font-medium text-gray-400">
                {learnerData.grade}
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-100/70 text-emerald-600 font-semibold text-xs rounded-md">
                {learnerData.status}
              </span>
            </div>
          </div>

          {/* Courses Selected by Child */}
          <div className="px-5 pb-5 border-t border-gray-100/80 pt-4">
            <h4 className="text-xs font-bold text-gray-900 mb-3">
              Courses Selected by Child
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {learnerData.courses.map((course) => (
                <div key={course.id} className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-gray-100/80 shadow-sm">
                  <div className="w-9 h-9 bg-[#2D2A6E] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <Calculator className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 truncate leading-tight">
                      {course.title}
                    </h5>
                    <p className="text-[10px] font-semibold text-[#6C72B9]">
                      {course.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Choose another method</span>
      </button>
    </div>
  );
}