import React, { useState } from 'react';
import { Info } from 'lucide-react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const timeSlots = [
  { id: 'morning', label: 'Morning', time: '(8:00 AM – 12:00 PM)' },
  { id: 'afternoon', label: 'Afternoon', time: '(12:00 PM – 5:00 PM)' },
  { id: 'evening', label: 'Evening', time: '(5:00 PM – 10:00 PM)' },
];

export default function LearningPreferences({ onNext, onBack }) {
  const [selectedDays, setSelectedDays] = useState(['Mon']);
  const [selectedTime, setSelectedTime] = useState('morning');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleDay = (day) => {
    setSelectedDays(prev => {
      const updated = prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
      if (updated.length > 0) setError('');
      return updated;
    });
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (selectedDays.length === 0) {
      setError('Please select at least one available day.');
      return;
    }
    setSubmitting(true);
    try {
      // The parent step saves everything to the server and throws if that fails.
      await onNext?.({ selectedDays, selectedTime });
    } catch (err) {
      setError(err.message || 'Could not save your preferences. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col justify-between">
      <div className="w-full space-y-6">
        
        {/* Header Section */}
        <div>
          <h2 className="text-xl font-bold text-[#111111] tracking-tight">
            Tell Us Your Learning Preferences
          </h2>
          <p className="mt-1 text-xs font-medium text-[#8B94AD]">
            Your preferences help us arrange classes that fit your availability.
          </p>
        </div>

        {/* Days of Week Section */}
        <div className="space-y-2.5">
          <div>
            <h3 className="text-xs font-bold text-[#111111]">Which days are you available?</h3>
            <p className="text-[11px] text-[#8B94AD] mt-0.5">Select all that apply.</p>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {daysOfWeek.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'border-[#30336B] bg-[#30336B] text-white shadow-xs'
                      : 'border-[#E2E8F0] bg-white text-[#111111] hover:border-gray-300'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
        </div>

        {/* Time of Day Section */}
        <div className="space-y-3 pt-2">
          <div>
            <h3 className="text-xs font-bold text-[#111111]">Time of Day</h3>
            <p className="text-[11px] text-[#8B94AD] mt-0.5">Choose the time of day you prefer most.</p>
          </div>

          <div className="space-y-3">
            {timeSlots.map((slot) => {
              const isChecked = selectedTime === slot.id;
              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.id)}
                  className="flex items-center space-x-3 cursor-pointer group select-none"
                >
                  {/* Custom Radio Circle */}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    isChecked ? 'border-[#30336B]' : 'border-[#E2E8F0] group-hover:border-gray-400'
                  }`}>
                    {isChecked && <div className="w-2 h-2 bg-[#30336B] rounded-full" />}
                  </div>

                  {/* Label Text */}
                  <span className="text-xs text-[#111111] font-medium">
                    {slot.label}{' '}
                    <span className="text-[#8B94AD] font-normal">{slot.time}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Notice Box */}
        <div className="bg-[#EEF2F6] border border-blue-100/60 rounded-xl p-4 flex items-start space-x-3 w-full">
          <Info className="w-4 h-4 text-[#30336B] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#64748B] leading-relaxed font-normal">
            Your preferences are not your final class schedule. Your tutor will confirm your actual class times.
          </p>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex w-full items-center justify-between border-t border-[#F1F3F7] pt-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#F1F3F7] px-6 text-xs font-bold text-[#30336B] transition-colors hover:bg-[#E8EBF1] cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={submitting}
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl bg-[#30336B] px-6 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#252854] cursor-pointer gap-2"
        >
          <span>{submitting ? 'Saving…' : 'Continue'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}