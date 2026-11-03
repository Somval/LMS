import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
  Loader2,
} from "lucide-react";

import { api } from "../../lib/api";
import { initials } from "../Dashboard/dashboardData";
import WeeklySchedule from "./WeeklySchedule";
import SessionDetails from "./SessionDetails";
import {
  defaultDayFor,
  endOfWeek,
  formatDay,
  sameDay,
  weekDays,
  weekRangeString,
} from "./scheduleData";

// Weeks you can jump to: 4 back, 8 ahead.
const WEEK_OFFSETS = Array.from({ length: 13 }, (_, index) => index - 4);

const Avatar = ({ name }) => (
  <span
    aria-hidden="true"
    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700"
  >
    {initials(name)}
  </span>
);

export default function ChildSelectorBar() {
  const location = useLocation();

  const [children, setChildren] = useState(null); // null while loading
  const [childrenError, setChildrenError] = useState("");
  const [currentChild, setCurrentChild] = useState(null);

  const [isChildOpen, setIsChildOpen] = useState(false);
  const [isWeekOpen, setIsWeekOpen] = useState(false);

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(() => defaultDayFor(0));
  const [selectedClassId, setSelectedClassId] = useState(null);

  const [classes, setClasses] = useState(null); // null while loading
  const [classesError, setClassesError] = useState("");
  const [reload, setReload] = useState(0);

  const containerRef = useRef(null);

  const days = useMemo(() => weekDays(weekOffset), [weekOffset]);
  const dateRange = weekRangeString(weekOffset);

  // The parent's linked children.
  const loadChildren = useCallback(() => {
    setChildren(null);
    setChildrenError("");
    api
      .get("/parent/children")
      .then((list) => {
        setChildren(list);
        const wanted = list.find((child) => child.id === location.state?.childId);
        setCurrentChild((current) => current ?? wanted ?? list[0] ?? null);
      })
      .catch((err) => setChildrenError(err.message || "Could not load your children."));
  }, [location.state?.childId]);

  useEffect(loadChildren, [loadChildren]);

  // The selected child's classes for the shown week.
  useEffect(() => {
    if (!currentChild) return;

    let cancelled = false;
    setClasses(null);
    setClassesError("");

    api
      .get("/classes", {
        studentId: currentChild.id,
        from: days[0].toISOString(),
        to: endOfWeek(days[0]).toISOString(),
      })
      .then((list) => {
        if (!cancelled) {
          setClasses([...list].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt)));
        }
      })
      .catch(
        (err) => !cancelled && setClassesError(err.message || "Could not load the schedule.")
      );

    return () => {
      cancelled = true;
    };
  }, [currentChild, days, reload]);

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

  const goToWeek = (offset) => {
    setWeekOffset(offset);
    setSelectedDay(defaultDayFor(offset));
    setSelectedClassId(null);
    setIsWeekOpen(false);
  };

  const handleSelectChild = (child) => {
    setCurrentChild(child);
    setSelectedClassId(null);
    setIsChildOpen(false);
  };

  const handlePreviousWeek = (e) => {
    e?.stopPropagation();
    goToWeek(weekOffset - 1);
  };

  const handleNextWeek = (e) => {
    e?.stopPropagation();
    goToWeek(weekOffset + 1);
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setSelectedClassId(null);
  };

  const handleSelectClass = (cls) => {
    setSelectedDay(new Date(cls.startsAt));
    setSelectedClassId(cls.id);
  };

  // The class shown in "Session Details": the one clicked, else the first class of the selected day.
  const selectedClass = useMemo(() => {
    if (!classes) return null;
    return (
      classes.find((cls) => cls.id === selectedClassId) ??
      classes.find((cls) => sameDay(new Date(cls.startsAt), selectedDay)) ??
      null
    );
  }, [classes, selectedClassId, selectedDay]);

  if (childrenError) {
    return (
      <div className="w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{childrenError}</p>
          <button
            type="button"
            onClick={loadChildren}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (children === null) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentChild) {
    return (
      <div className="w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-base font-semibold text-slate-900">No child linked yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Link your child's learner account to see their class schedule here.
          </p>
          <Link
            to="/parent/link-children"
            className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Link a Child
          </Link>
        </div>
      </div>
    );
  }

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
                    <Avatar name={currentChild.fullName} />
                    <span className="truncate font-medium text-slate-900">
                      {currentChild.fullName}
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
                    {children.map((child) => (
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
                        <Avatar name={child.fullName} />
                        <span className="truncate">{child.fullName}</span>
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
                    <ChevronDown
                      className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
                        isWeekOpen ? "rotate-180" : ""
                      }`}
                    />
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
                    {WEEK_OFFSETS.map((offset) => (
                      <button
                        key={offset}
                        type="button"
                        onClick={() => goToWeek(offset)}
                        className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 ${
                          weekOffset === offset
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-slate-800"
                        }`}
                      >
                        <span className="truncate">
                          {weekRangeString(offset)}
                          {offset === 0 && (
                            <span className="ml-2 text-xs text-slate-400">This week</span>
                          )}
                        </span>
                        {weekOffset === offset && (
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

                <div className="flex h-11 w-full items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-semibold text-blue-600 shadow-sm">
                  <span className="truncate">{formatDay(selectedDay)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          WEEKLY SCHEDULE
      ============================== */}
      <section className="w-full">
        <WeeklySchedule
          currentChild={currentChild}
          days={days}
          classes={classes}
          error={classesError}
          onRetry={() => setReload((n) => n + 1)}
          selectedDay={selectedDay}
          selectedClassId={selectedClass?.id}
          onSelectDay={handleSelectDay}
          onSelectClass={handleSelectClass}
        />
      </section>

      {/* ==============================
          SESSION DETAILS
      ============================== */}
      <section className="w-full pt-6 pb-8">
        <SessionDetails
          currentChild={currentChild}
          cls={selectedClass}
          selectedDay={selectedDay}
        />
      </section>
    </div>
  );
}
