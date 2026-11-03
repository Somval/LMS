import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
export default function ChildSelectorBar({ kids, selectedChild, onChildSelect }) {
  const [isChildOpen, setIsChildOpen] = useState(false);
  const containerRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsChildOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full font-sans text-slate-800">
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 sm:p-6">

        {/* Select Child Section */}
        <div className="flex flex-col gap-2 relative max-w-sm">
          <label className="text-xs sm:text-sm font-semibold text-slate-700">
            Select Child
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsChildOpen(!isChildOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Avatar name={selectedChild.fullName} />
                <span className="font-semibold truncate">{selectedChild.fullName}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isChildOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Child Dropdown Menu */}
            {isChildOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                {kids.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => {
                      onChildSelect?.(child);
                      setIsChildOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left transition-colors ${
                      selectedChild.id === child.id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-900 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <Avatar name={child.fullName} />
                    <span className="truncate">{child.fullName}</span>
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
