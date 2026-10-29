import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// Mock data structured as an array of objects[cite: 2]
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

export default function FilterBar({ onChildSelect }) {
  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
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
    setSelectedChild(child);
    setIsChildOpen(false);
    if (onChildSelect) {
      onChildSelect(child); // Passes full child object including ID and name to parent
    }
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
                <img
                  src={selectedChild.avatar}
                  alt={selectedChild.name}
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <span className="font-medium truncate">{selectedChild.name}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isChildOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Child Dropdown Menu */}
            {isChildOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                {childrenList.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => handleChildClick(child)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-left transition-colors ${
                      selectedChild.id === child.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <img
                        src={child.avatar}
                        alt={child.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                      />
                      <span className="font-medium truncate">{child.name}</span>
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