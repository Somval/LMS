import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { initials } from '../Dashboard/dashboardData';

const Avatar = ({ name }) => (
  <span
    aria-hidden="true"
    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700"
  >
    {initials(name)}
  </span>
);

// kids: the parent's linked children. The page owns which one is selected.
export default function FilterBar({ kids, selectedChild, onChildSelect }) {
  const [isChildOpen, setIsChildOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsChildOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChildClick = (child) => {
    setIsChildOpen(false);
    onChildSelect?.(child);
  };

  return (
    <div ref={containerRef} className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 flex items-center justify-center font-sans">
      {/* Main Container Card: 1085px max-width, 98px height on desktop with responsive padding and flex spacing */}
      <div className="w-[1085px] max-w-full lg:h-[98px] bg-white rounded-2xl shadow-xs border border-slate-200/80 px-4 sm:px-6 py-3 flex flex-col justify-center">

        {/* Select Child Section matching the design reference */}
        <div className="flex flex-col gap-1.5 relative w-full sm:w-[280px]">
          <label className="text-[11px] sm:text-xs font-semibold text-slate-800 tracking-tight">
            Select Child
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsChildOpen(!isChildOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 shadow-2xs hover:border-slate-300 focus:outline-none transition-all"
            >
              <div className="flex items-center gap-2.5 truncate pr-2">
                <Avatar name={selectedChild.fullName} />
                <span className="font-medium truncate">{selectedChild.fullName}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isChildOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Child Dropdown Menu */}
            {isChildOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                {kids.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleChildClick(child)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-left transition-colors ${
                      selectedChild.id === child.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <Avatar name={child.fullName} />
                      <span className="font-medium truncate">{child.fullName}</span>
                    </div>
                    {selectedChild.id === child.id && (
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
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
