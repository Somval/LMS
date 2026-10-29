import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
} from "lucide-react";

import WeeklySchedule from "./WeeklySchedule";
import SessionDetails from "./SessionDetails";

const selectchild = [
  {
    id: 1,
    name: "Olivia Johnson",
    avatar:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Liam Smith",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Sophia Williams",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
];

// Helper to calculate week ranges based on an offset from the current week
const getWeekRangeString = (offset) => {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1);
  
  const monday = new Date(now.setDate(diffToMonday));
  monday.setDate(monday.getDate() + offset * 7);

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  const options = { month: "short", day: "numeric" };
  const startStr = monday.toLocaleDateString("en-US", options);
  const endStr = sunday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${startStr} – ${endStr}`;
};

export default function ChildSelectorBar() {
  const [currentChild, setCurrentChild] = useState(selectchild[0]);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [isWeekOpen, setIsWeekOpen] = useState(false);

  const [weekOffset, setWeekOffset] = useState(0);
  const [dateRange, setDateRange] = useState(getWeekRangeString(0));

  const [selectedDay, setSelectedDay] = useState(
    "Wednesday - May 20, 2026"
  );

  const containerRef = useRef(null);

  // Update date range whenever weekOffset changes
  useEffect(() => {
    setDateRange(getWeekRangeString(weekOffset));
  }, [weekOffset]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsChildOpen(false);
        setIsWeekOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectChild = (child) => {
    setCurrentChild(child);
    setIsChildOpen(false);
  };

  const handlePreviousWeek = (e) => {
    e?.stopPropagation();
    setWeekOffset((prev) => prev - 1);
    setIsWeekOpen(false);
  };

  const handleNextWeek = (e) => {
    e?.stopPropagation();
    setWeekOffset((prev) => prev + 1);
    setIsWeekOpen(false);
  };

  // Generate selectable weeks
  const weekOptions = [-2, -1, 0, 1, 2, 3].map((offset) => ({
    offset,
    label: getWeekRangeString(offset),
  }));

  return (
    <div ref={containerRef}>
      {/* ==============================
          TOP SELECTOR SECTION
      ============================== */}
      <section className="w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
            
            {/* CONTROLS */}
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:items-end">
              
              {/* ==============================
                  SELECT CHILD
              ============================== */}
              <div className="relative w-full">
                <label
                  htmlFor="child-selector"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Select Child
                </label>

                <button
                  id="child-selector"
                  type="button"
                  onClick={() => {
                    setIsChildOpen((prev) => !prev);
                    setIsWeekOpen(false);
                  }}
                  className="flex h-11 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <img
                      src={currentChild.avatar}
                      alt={currentChild.name}
                      className="h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                    <span className="truncate font-medium text-slate-900">
                      {currentChild.name}
                    </span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                      isChildOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isChildOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    {selectchild.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => handleSelectChild(child)}
                        className={`flex w-full items-center gap-3 px-3 py-3 text-left text-sm transition-colors hover:bg-slate-50 ${
                          currentChild.id === child.id
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-slate-800"
                        }`}
                      >
                        <img
                          src={child.avatar}
                          alt={child.name}
                          className="h-7 w-7 shrink-0 rounded-full object-cover"
                        />
                        <span className="truncate">{child.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ==============================
                  WEEK SELECTOR (RESPONSIVE)
              ============================== */}
              <div className="relative w-full">
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Week
                </label>

                <div className="flex h-11 w-full items-center rounded-lg border border-slate-300 bg-white shadow-sm">
                  {/* Previous Week Button */}
                  <button
                    type="button"
                    onClick={handlePreviousWeek}
                    aria-label="Previous week"
                    className="flex h-full w-11 shrink-0 items-center justify-center rounded-l-lg text-slate-600 transition hover:bg-slate-100 focus:outline-none"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Date Range Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsWeekOpen((prev) => !prev);
                      setIsChildOpen(false);
                    }}
                    className="flex min-w-0 flex-1 items-center justify-center gap-2 px-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 focus:outline-none"
                  >
                    <Calendar className="h-4 w-4 shrink-0 text-slate-500" />
                    <span className="truncate">{dateRange}</span>
                    <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${isWeekOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Next Week Button */}
                  <button
                    type="button"
                    onClick={handleNextWeek}
                    aria-label="Next week"
                    className="flex h-full w-11 shrink-0 items-center justify-center rounded-r-lg text-slate-600 transition hover:bg-slate-100 focus:outline-none"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Week Selection Dropdown */}
                {isWeekOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                    <div className="p-2 text-xs font-semibold text-slate-400 border-b border-slate-100">
                      Jump to week
                    </div>
                    {weekOptions.map((week) => (
                      <button
                        key={week.offset}
                        type="button"
                        onClick={() => {
                          setWeekOffset(week.offset);
                          setIsWeekOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                          weekOffset === week.offset
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-slate-800"
                        }`}
                      >
                        <span className="truncate">{week.label}</span>
                        {weekOffset === week.offset && (
                          <Check className="h-4 w-4 text-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ==============================
                  SELECTED DAY
              ============================== */}
              <div className="w-full">
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Selected Day
                </label>

                <div
                  className="flex h-11 w-full items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-600 shadow-sm"
                >
                  <span className="truncate">{selectedDay}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          WEEKLY SCHEDULE (Passed Props)
      ============================== */}
      <section className="w-full">
        <WeeklySchedule 
          currentChild={currentChild} 
          weekOffset={weekOffset}
          dateRange={dateRange}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </section>

      {/* ==============================
          SESSION DETAILS (Passed Props)
      ============================== */}
      <section className="w-full">
        <SessionDetails 
          currentChild={currentChild} 
          weekOffset={weekOffset}
          selectedDay={selectedDay}
        />
      </section>
    </div>
  );
}