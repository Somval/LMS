import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
//import Assignments from './Assignmentslist';
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

export default function ChildSelectorBar() {
  const [selectedChild, setSelectedChild] = useState(childrenList[0]);
  const [isChildOpen, setIsChildOpen] = useState(false);

  return (
    <div className="w-full font-sans text-slate-800">
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
                <img
                  src={selectedChild.avatar}
                  alt={selectedChild.name}
                  className="w-6 h-6 rounded-full object-cover shrink-0"
                />
                <span className="font-semibold truncate">{selectedChild.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isChildOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Child Dropdown Menu */}
            {isChildOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                {childrenList.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => {
                      setSelectedChild(child);
                      setIsChildOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-left transition-colors ${
                      selectedChild.id === child.id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-900 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <img
                      src={child.avatar}
                      alt={child.name}
                      className="w-6 h-6 rounded-full object-cover shrink-0"
                    />
                    <span className="truncate">{child.name}</span>
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