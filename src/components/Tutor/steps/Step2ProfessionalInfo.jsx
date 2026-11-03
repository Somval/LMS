import React, { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { ChevronDown, ChevronsUpDown } from 'lucide-react';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Step2ProfessionalInfo({ formData, onChange, onExtra }) {
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    api.get('/subjects').then((list) => {
      setSubjectOptions(list);
      onExtra?.('subjectOptions', list);
    }).catch(() => {});
  }, [onExtra]);

  useEffect(() => { onExtra?.('days', selectedDays); }, [selectedDays, onExtra]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="w-full text-left font-sans">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Professional Information
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tell us about what you teach and your availability.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-6">
        {/* Subjects You Teach */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
            Subjects You Teach
          </label>
          <div className="relative w-full">
            <select
              name="subjects"
              value={formData?.subjects || ''}
              onChange={onChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all cursor-pointer placeholder:text-slate-400"
            >
              <option value="" disabled hidden>
                Select subjects
              </option>
              {subjectOptions.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Year Levels / Grades You Teach */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
            Year Levels / Grades You Teach
          </label>
          <div className="relative w-full">
            <select
              name="yearLevels"
              value={formData?.yearLevels || ''}
              onChange={onChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all cursor-pointer placeholder:text-slate-400"
            >
              <option value="" disabled hidden>
                Select year level
              </option>
              <option value="Primary (Grades 1-5)">Primary (Grades 1-5)</option>
              <option value="Junior High (Grades 6-8)">Junior High (Grades 6-8)</option>
              <option value="Senior High (Grades 9-12)">Senior High (Grades 9-12)</option>
              <option value="Undergraduate / Tertiary">Undergraduate / Tertiary</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Years of Teaching Experience */}
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
            Years of Teaching Experience
          </label>
          <div className="relative w-full">
            <select
              name="experience"
              value={formData?.experience || '0-1 year'}
              onChange={onChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 appearance-none focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all cursor-pointer"
            >
              <option value="0-1 year">0-1 year</option>
              <option value="2-4 years">2-4 years</option>
              <option value="5-8 years">5-8 years</option>
              <option value="9+ years">9+ years</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Availability */}
        <div className="w-full pt-1">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-0.5">
            Availability
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Select the days and times you are generally available.
          </p>

          {/* Days Toggle Group */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = selectedDays.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all select-none ${
                    isSelected
                      ? 'bg-white border-slate-300 text-slate-800 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Time Picker Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
            <span>From</span>
            <div className="relative">
              <input
                type="text"
                name="timeFrom"
                value={formData?.timeFrom || '09:00 AM'}
                onChange={onChange}
                className="w-28 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-semibold text-center focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
              <ChevronsUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            <span className="ml-1">To</span>
            <div className="relative">
              <input
                type="text"
                name="timeTo"
                value={formData?.timeTo || '03:00 PM'}
                onChange={onChange}
                className="w-28 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 font-semibold text-center focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
              <ChevronsUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div> 
          </div>
        </div>
      </form>
    </div>
  );
}