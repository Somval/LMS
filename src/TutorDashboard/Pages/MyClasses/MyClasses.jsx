import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../../lib/api";
import { classStatusLabel, fullDate, timeRange } from "../../../StudentPortal/classFormat";
import {
  CalendarDays,
  Calendar,
  CheckCircle2,
  Plus,
  Search,
  Calculator,
  ChevronDown,
  Repeat,
} from "lucide-react";
import { Link } from "react-router-dom";

/* =========================================================
    CLASS DATA
========================================================= */


/* =========================================================
    MAIN COMPONENT
========================================================= */

export default function UpcomingClasses() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/classes"), api.get("/tutors/students")])
      .then(([list, students]) => {
        // How many of the tutor's students take each subject.
        const perSubject = new Map();
        students.forEach((st) => st.subjects.forEach((sub) => perSubject.set(sub.id, (perSubject.get(sub.id) ?? 0) + 1)));
        const now = Date.now();
        setClasses(
          list.map((c) => {
            const n = perSubject.get(c.subject.id) ?? 0;
            return {
              id: c.id,
              studentName: c.title,
              studentAvatar: "",
              subject: c.subject.name,
              level: `${n} student${n === 1 ? "" : "s"}`,
              description: classStatusLabel(c),
              recurringSchedule: "One-time class",
              recurringTime: "",
              date: fullDate(c.startsAt),
              time: timeRange(c.startsAt, c.endsAt),
              startsAt: c.startsAt,
              status: new Date(c.endsAt).getTime() < now || c.status === "COMPLETED" ? "past" : "upcoming",
            };
          })
        );
      })
      .catch((err) => setError(err.message || "Could not load your classes."))
      .finally(() => setLoading(false));
  }, []);

  const [activeTab, setActiveTab] = useState("Upcoming Classes");
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [dateFilter, setDateFilter] = useState("");

  /* TABS */
  const tabs = [
    { name: "All Classes", icon: CalendarDays },
    { name: "Past Classes", icon: CheckCircle2 },
    { name: "Upcoming Classes", icon: Calendar },
  ];

  /* TAB FILTER */
  const tabClasses = useMemo(() => {
    if (activeTab === "Past Classes") {
      return classes.filter((item) => item.status === "past");
    }
    if (activeTab === "Upcoming Classes") {
      return classes.filter((item) => item.status === "upcoming");
    }
    return classes;
  }, [activeTab, classes]);

  /* SEARCH + FILTER */
  const filteredClasses = useMemo(() => {
    return tabClasses.filter((item) => {
      const matchesSearch =
        item.subject.toLowerCase().includes(search.toLowerCase()) ||
        item.studentName.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesSubject =
        subject === "All Subjects" || item.subject === subject;

      let matchesDate = true;

      const start = new Date(item.startsAt);
      const now = new Date();
      if (dateFilter === "Today") {
        matchesDate = start.toDateString() === now.toDateString();
      }

      if (dateFilter === "This Week") {
        const weekStart = new Date(now);
        weekStart.setHours(0, 0, 0, 0);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        matchesDate = start >= weekStart && start < weekEnd;
      }

      if (dateFilter === "This Month") {
        matchesDate = start.getMonth() === now.getMonth() && start.getFullYear() === now.getFullYear();
      }

      return matchesSearch && matchesSubject && matchesDate;
    });
  }, [tabClasses, search, subject, dateFilter]);

  /* SECTION TITLE */
  const getSectionTitle = () => {
    if (activeTab === "Past Classes") {
      return "Past Classes";
    }
    if (activeTab === "Upcoming Classes") {
      return "Upcoming Classes";
    }
    return "All Classes";
  };

  return (
    <div className="w-full min-w-0 bg-[#F5F7FC] text-[#111827]">
      {/* TOP NAVIGATION */}
      <div className="border-b border-[#E1E4EB] bg-[#F5F7FC]">
        <div className="flex min-h-[72px] w-full items-center justify-between gap-3 px-3 sm:px-4 lg:px-6">
          {/* TABS (Overflow removed) */}
          <div className="flex h-[72px] min-w-0 flex-1 items-center gap-0 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  className={`
                    relative flex h-full shrink-0 items-center justify-center gap-1.5 px-3 text-[11px] font-medium transition-all duration-200 sm:min-w-[112px] sm:px-3 sm:text-[12px]
                    ${
                      active
                        ? "text-[#7000E8]"
                        : "text-[#667085] hover:text-[#344054]"
                    }
                  `}
                >
                  <Icon size={14} strokeWidth={active ? 2 : 1.5} />
                  <span className="whitespace-nowrap">{tab.name}</span>

                  {/* Active underline */}
                  {active && (
                    <span className="absolute bottom-[-1px] left-2 right-2 h-[2px] bg-[#7000E8] sm:left-0 sm:right-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* SCHEDULE BUTTON */}
          <Link to="schedule-class" className="inline-flex shrink-0">
            <button
              type="button"
              className="flex h-[36px] w-full shrink-0 items-center justify-center gap-1.5 rounded-[6px] bg-[#7500E8] px-3 text-[10px] font-medium text-white shadow-sm transition hover:bg-[#6400C9] active:scale-[0.98] sm:h-[42px] sm:px-4 sm:text-[12px]"
            >
              <Plus size={14} strokeWidth={2} />
              <span className="hidden sm:inline">Schedule Class</span>
              <span className="sm:hidden">Schedule</span>
            </button>
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full min-w-0 px-3 py-[14px] sm:px-4 lg:px-6">
        {/* FILTERS */}
        <div className="mb-[18px] flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-[9px]">
          {/* Search */}
          <div className="relative w-full sm:w-[220px]">
            <Search
              size={14}
              strokeWidth={1.6}
              className="pointer-events-none absolute left-[9px] top-1/2 -translate-y-1/2 text-[#98A2B3]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subjects or students..."
              className="h-[34px] w-full rounded-[4px] border border-[#D9DDE5] bg-white pl-[30px] pr-3 text-[10px] text-[#344054] outline-none placeholder:text-[#98A2B3] focus:border-[#7500E8] focus:ring-1 focus:ring-[#7500E8]/10 sm:h-[32px]"
            />
          </div>

          {/* Subject */}
          <div className="relative w-full sm:w-[140px]">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-[34px] w-full appearance-none rounded-[4px] border border-[#D9DDE5] bg-white px-[10px] pr-7 text-[10px] text-[#344054] outline-none focus:border-[#7500E8] sm:h-[32px]"
            >
              <option>All Subjects</option>
              {[...new Set(classes.map((c) => c.subject))].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#98A2B3]"
            />
          </div>

          {/* Date */}
          <div className="relative w-full sm:w-[140px]">
            <Calendar
              size={12}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-[8px] top-1/2 -translate-y-1/2 text-[#98A2B3]"
            />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-[34px] w-full appearance-none rounded-[4px] border border-[#D9DDE5] bg-white pl-[25px] pr-7 text-[10px] text-[#667085] outline-none focus:border-[#7500E8] sm:h-[32px]"
            >
              <option value="">Select Date</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2 text-[#98A2B3]"
            />
          </div>
        </div>

        {/* SECTION HEADER & COUNT BADGE */}
        <div className="mb-[12px] flex items-center gap-2">
          <h2 className="text-[16px] font-bold tracking-[-0.01em] text-[#101828]">
            {getSectionTitle()}
          </h2>
          <span className="flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-[#EDE4FF] px-[6px] text-[11px] font-semibold text-[#7000E8]">
            {filteredClasses.length}
          </span>
        </div>

        {/* TABLE CONTAINER */}
        <div className="w-full overflow-x-auto rounded-[8px] border border-[#E1E4EB] bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E1E4EB] bg-[#F8FAFC] text-[12px] font-semibold text-[#64748B]">
                <th className="py-3.5 pl-6 pr-4">Student</th>
                <th className="py-3.5 px-4">Subject & Level</th>
                <th className="py-3.5 px-4">Recurring Schedule</th>
                <th className="py-3.5 px-4">Next Class</th>
                <th className="py-3.5 pl-4 pr-6 text-right sm:text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E4EB] text-[13px] text-[#1E293B]">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((item) => (
                  <tr key={item.id} className="transition hover:bg-[#FAFAFB]">
                    {/* STUDENT */}
                    <td className="py-4 pl-6 pr-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-[#E2E8F0] flex items-center justify-center overflow-hidden font-medium text-[#64748B]">
                          {item.studentAvatar ? (
                            <img src={item.studentAvatar} alt={item.studentName} className="h-full w-full object-cover" />
                          ) : (
                            item.studentName.charAt(0)
                          )}
                        </div>
                        <span className="font-semibold text-[#101828]">
                          {item.studentName}
                        </span>
                      </div>
                    </td>

                    {/* SUBJECT & LEVEL */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#312E81]">
                          <Calculator size={20} strokeWidth={1.8} className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#101828]">
                            {item.subject}
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            {item.level}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* RECURRING SCHEDULE */}
                    <td className="py-4 px-4 whitespace-nowrap text-[#101828]">
                      <div className="flex items-center gap-2.5">
                        <Repeat size={15} strokeWidth={1.8} className="text-[#64748B]" />
                        <div>
                          <div className="font-medium">{item.recurringSchedule}</div>
                          <div className="text-[11px] text-[#64748B]">{item.recurringTime}</div>
                        </div>
                      </div>
                    </td>

                    {/* NEXT CLASS */}
                    <td className="py-4 px-4 whitespace-nowrap text-[#101828]">
                      <div className="flex items-center gap-2.5">
                        <Calendar size={15} strokeWidth={1.8} className="text-[#64748B]" />
                        <div>
                          <div className="font-medium">{item.date}</div>
                          <div className="text-[11px] text-[#64748B]">{item.time}</div>
                        </div>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="py-4 pl-4 pr-6 whitespace-nowrap text-right sm:text-left">
                      <Link to={`/tutor/open-class/${item.id}`} className="inline-flex">
                        <button
                          type="button"
                          className="inline-flex h-[34px] items-center justify-center rounded-[6px] bg-[#2563EB] px-4 text-[12px] font-medium text-white shadow-sm transition hover:bg-[#1D4ED8] active:scale-[0.98]"
                        >
                          Open Class
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-[#98A2B3]">
                    {loading ? "Loading…" : error || "No classes found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}