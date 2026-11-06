
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";
import {
  Calculator,
  ArrowRight,
  MoreVertical,
  Eye,
  CalendarDays,
} from "lucide-react";

const SHOWN = 4;

const dayLabel = (date) => {
  const d = new Date(date);
  const today = new Date();
  const start = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate());
  const diff = Math.round((start(d) - start(today)) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};
const clock = (date) => new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export default function UpcomingClasses() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | error

  // GET /classes?upcoming=true (admins see every tutor's classes)
  useEffect(() => {
    let cancelled = false;
    api
      .get("/classes", { upcoming: true })
      .then((rows) => {
        if (cancelled) return;
        setUpcomingClasses(
          rows.slice(0, SHOWN).map((c) => ({
            id: c.id,
            subject: c.subject?.name ?? "Class",
            category: c.title,
            day: dayLabel(c.startsAt),
            time: `${clock(c.startsAt)} – ${clock(c.endsAt)}`,
            tutor: c.tutor?.user?.fullName ?? "Tutor",
          }))
        );
        setState("ready");
      })
      .catch(() => !cancelled && setState("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSchedule = () => {
    setActiveMenu(null);
    navigate("/admin/classes");
  };
  const handleViewClass = () => handleSchedule();

  return (
    <section className="box-border mt-5 lg:mt-1 w-full min-w-0 max-w-full overflow-hidden rounded-[9px] border border-[#F0F1F5] bg-white">
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-2 px-3 pb-3 pt-3 sm:gap-3 sm:px-4 sm:pt-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-[Inter] text-[13px] font-semibold leading-[1.4] text-[#171923] sm:text-[14px]">
            Upcoming Classes
          </h2>

          <p className="mt-0.5 text-[10px] leading-[1.5] text-[#9297A5] sm:text-[11px]">
            View today's and upcoming scheduled classes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSchedule}
          className="inline-flex shrink-0 items-center gap-1 rounded-md pt-0.5 text-[10px] font-medium text-[#159A42] transition-colors hover:text-[#107832] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] sm:text-[11px]"
        >
          <span>View Schedule</span>
          <ArrowRight size={12} strokeWidth={1.8} />
        </button>
      </div>

      <div className="mx-3 border-t border-[#F1F2F6] sm:mx-4" />

      {/* Class List */}
      <div className="min-w-0 px-3 sm:px-4">
        {upcomingClasses.length === 0 && (
          <p className="py-8 text-center text-[11px] text-[#777F90]">
            {state === "loading"
              ? "Loading classes…"
              : state === "error"
              ? "Could not load classes."
              : "No upcoming classes scheduled."}
          </p>
        )}
        {upcomingClasses.map((classItem, index) => (
          <div
            key={classItem.id}
            className={`relative flex min-w-0 items-center gap-2 py-3 sm:gap-3 ${
              index !== upcomingClasses.length - 1
                ? "border-b border-[#F1F2F6]"
                : ""
            }`}
          >
            {/* Subject Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E6E5F2] sm:h-10 sm:w-10">
              <Calculator
                size={22}
                strokeWidth={1.7}
                className="text-[#2F327D]"
                aria-hidden="true"
              />
            </div>

            {/* Subject Information */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-[Inter] text-[10px] font-semibold leading-[1.5] text-[#252833] sm:text-[11px]">
                {classItem.subject}
              </h3>

              <p className="truncate text-[9px] leading-[1.5] text-[#777F90]">
                {classItem.category}
              </p>

              <p className="mt-0.5 break-words text-[8px] leading-[1.5] text-[#777F90] sm:text-[9px]">
                <span className="block sm:inline">Tutor: {classItem.tutor}</span>
              </p>
            </div>

            {/* Class Time */}
            <div className="w-[76px] shrink-0 sm:w-[112px]">
              <p className="font-[Inter] text-[9px] font-semibold leading-[1.5] text-[#252833] sm:text-[10px]">
                {classItem.day}
              </p>

              <p className="text-[8px] leading-[1.6] text-[#777F90] sm:whitespace-nowrap sm:text-[9px]">
                {classItem.time}
              </p>
            </div>

            {/* Actions */}
            <div className="relative shrink-0">
              <button
                type="button"
                aria-label={`More options for ${classItem.subject}, class ${index + 1}`}
                aria-expanded={activeMenu === classItem.id}
                onClick={() =>
                  setActiveMenu((current) =>
                    current === classItem.id ? null : classItem.id
                  )
                }
                className="flex h-7 w-6 items-center justify-center rounded text-[#858B99] transition-colors hover:bg-[#F4F5F8] hover:text-[#39368E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
              >
                <MoreVertical size={15} strokeWidth={1.8} />
              </button>

              {activeMenu === classItem.id && (
                <div className="absolute right-0 top-8 z-20 w-[145px] rounded-lg border border-[#E9EAF0] bg-white p-1.5 shadow-lg">
                  <button
                    type="button"
                    onClick={() => handleViewClass(classItem)}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[10px] text-[#343849] hover:bg-[#F5F6FA]"
                  >
                    <Eye size={13} />
                    View class
                  </button>

                  <button
                    type="button"
                    onClick={handleSchedule}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[10px] text-[#343849] hover:bg-[#F5F6FA]"
                  >
                    <CalendarDays size={13} />
                    View schedule
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
