import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { PERIODS } from './academicData';
import { initials } from '../Dashboard/dashboardData';

const Avatar = ({ name }) => (
  <span
    aria-hidden="true"
    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700"
  >
    {initials(name)}
  </span>
);

// kids: the parent's linked children; selectedChild / selectedPeriod are chosen by the page.
export default function FilterBar({
  kids,
  selectedChild,
  onChildSelect,
  selectedPeriod,
  onPeriodSelect,
}) {
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const containerRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsChildOpen(false);
        setIsPeriodOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChildClick = (child) => {
    setIsChildOpen(false);
    onChildSelect?.(child);
  };

  const handlePeriodClick = (period) => {
    setIsPeriodOpen(false);
    onPeriodSelect?.(period);
  };

  return (
    <div ref={containerRef} className="w-full bg-slate-50 flex items-start justify-center px-2 py-4 sm:p-6">
      {/* Main Container Card - 100% full width on mobile with great padding */}
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-xl p-3.5 sm:p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-start">

        {/* Select Child Section */}
        <div className="flex flex-col gap-2 w-full relative">
          <label className="text-xs sm:text-sm font-semibold text-slate-700">
            Select Child
          </label>
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => {
                setIsChildOpen(!isChildOpen);
                setIsPeriodOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-3.5 sm:py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <Avatar name={selectedChild.fullName} />
                <span className="font-medium truncate">{selectedChild.fullName}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isChildOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Child Dropdown Menu */}
            {isChildOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 overflow-hidden py-1">
                {kids.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleChildClick(child)}
                    className={`w-full flex items-center justify-between px-3.5 py-3.5 sm:py-3 text-sm text-left transition-colors ${
                      selectedChild.id === child.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <Avatar name={child.fullName} />
                      <span className="truncate">{child.fullName}</span>
                    </div>
                    {selectedChild.id === child.id && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Period Section */}
        <div className="flex flex-col gap-2 w-full relative">
          <label className="text-xs sm:text-sm font-semibold text-slate-700">
            Period
          </label>
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => {
                setIsPeriodOpen(!isPeriodOpen);
                setIsChildOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-3.5 sm:py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-medium truncate">{selectedPeriod.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isPeriodOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Period Dropdown Menu */}
            {isPeriodOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 overflow-hidden py-1">
                {PERIODS.map((period) => (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => handlePeriodClick(period)}
                    className={`w-full flex items-center justify-between px-3.5 py-3.5 sm:py-3 text-sm text-left transition-colors ${
                      selectedPeriod.id === period.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="truncate">{period.label}</span>
                    </div>
                    {selectedPeriod.id === period.id && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
