
import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CalendarDays, ChevronRight } from "lucide-react";
import { formatSession } from "./dashboardData";

export default function UpcomingSessions({ data }) {
  const navigate = useNavigate();

  const sessionsData = (data?.upcomingClasses ?? []).map((session) => ({
    id: session.id,
    subject: session.subject,
    status: session.status === "LIVE" ? "Live Now" : "Scheduled",
    ...formatSession(session.startsAt, session.endsAt),
  }));

  const handleViewSchedule = () => navigate("/parent/schedule");

  return (
    <section className="box-border w-full min-w-0 max-w-none rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6">
      {/* HEADER */}
      <div className="mb-3 flex min-w-0 items-center justify-between gap-3 sm:mb-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <CalendarDays className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>

          <div className="min-w-0">
            <h2 className="text-sm font-bold leading-5 text-gray-900 sm:text-base">
              Upcoming Sessions
            </h2>
            <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
              Your child's scheduled classes
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleViewSchedule}
          className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-semibold text-indigo-700 transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:text-xs"
        >
          <span>View Schedule</span>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>

      {sessionsData.length === 0 && (
        <p className="py-4 text-sm text-gray-400">
          No classes are scheduled right now.
        </p>
      )}

      {/* SESSIONS LIST */}
      <div className="flex w-full min-w-0 flex-col">
        {sessionsData.map((session, index) => (
          <article
            key={session.id}
            className={`flex w-full min-w-0 items-center gap-2.5 py-3 sm:gap-4 sm:py-3.5 ${
              index !== sessionsData.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            {/* DATE BADGE */}
            <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-purple-100 bg-white">
              <span className="flex w-full items-center justify-center bg-purple-600 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                {session.month}
              </span>

              <span className="flex flex-1 items-center justify-center text-sm font-bold text-gray-900">
                {session.date}
              </span>
            </div>

            {/* SESSION DETAILS */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
                {session.subject}
              </h3>

              <div className="mt-1 flex min-w-0 items-center gap-1.5 text-gray-400">
                <Clock
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0"
                  strokeWidth={1.8}
                />

                <span className="truncate text-[10px] font-medium sm:text-xs">
                  {session.time}
                </span>
              </div>
            </div>

            {/* SESSION STATUS */}
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700 sm:px-2.5 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {session.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
