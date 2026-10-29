import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';

// Children data structured as an array of objects
const childrenList = [
  {
    id: 1,
    name: 'Olivia Johnson',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Liam Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
];

const periodList = [
  { id: 'month', label: 'This Month' },
  { id: 'week', label: 'This Week' },
  { id: 'year', label: 'This Year' },
];

export default function FilterBar({ onChildSelect, onPeriodSelect }) {
  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(periodList[0]);

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
    setSelectedChild(child);
    setIsChildOpen(false);
    if (onChildSelect) {
      onChildSelect(child); // Passes full child object including ID to parent
    }
  };

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
    setIsPeriodOpen(false);
    if (onPeriodSelect) {
      onPeriodSelect(period);
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-slate-50 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 flex items-start justify-center">
      {/* Main Container Card - Fully responsive up to max-w-[92rem] */}
      <div className="w-full max-w-[92rem] bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
        
        {/* Select Child Section */}
        <div className="flex flex-col gap-2 w-full sm:flex-[1.4] relative">
          <label className="text-xs sm:text-sm font-semibold text-slate-700">
            Select Child
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsChildOpen(!isChildOpen);
                setIsPeriodOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3 truncate pr-2">
                <img
                  src={selectedChild.avatar}
                  alt={selectedChild.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <span className="font-semibold truncate">{selectedChild.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isChildOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Child Dropdown Menu */}
            {isChildOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                {childrenList.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleChildClick(child)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                      selectedChild.id === child.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate pr-2">
                      <img
                        src={child.avatar}
                        alt={child.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                      />
                      <span className="font-medium truncate">{child.name}</span>
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
        <div className="flex flex-col gap-2 w-full sm:flex-1 relative">
          <label className="text-xs sm:text-sm font-semibold text-slate-700">
            Period
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsPeriodOpen(!isPeriodOpen);
                setIsChildOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-2.5 truncate pr-2">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-medium truncate">{selectedPeriod.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isPeriodOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Period Dropdown Menu */}
            {isPeriodOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                {periodList.map((period) => (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => handlePeriodClick(period)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                      selectedPeriod.id === period.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="font-medium truncate">{period.label}</span>
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