import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { classStatusLabel, openLink } from "../../StudentPortal/classFormat";

const fmtTime = (iso) => new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

const TodaysClasses = ({ classes = [], loading = false }) => {
  const navigate = useNavigate();
  const classesData = classes.map((c) => ({
    id: c.id,
    time: fmtTime(c.startsAt),
    duration: `${Math.round((new Date(c.endsAt) - new Date(c.startsAt)) / 60000)} min`,
    title: `${c.subject} – ${c.title}`,
    students: `${c.students} student${c.students === 1 ? "" : "s"}`,
    status: classStatusLabel(c),
    meetingUrl: c.meetingUrl,
  }));

  return (
    <section className="flex h-full w-full min-w-0 flex-col rounded-lg bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold leading-7 text-gray-950">
          Today's Classes
        </h2>

        <button
          type="button"
          onClick={() => navigate("/tutor/class")}
          className="group flex items-center gap-1.5 rounded-lg px-1 py-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 focus:outline-none"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Class List */}
      <div className="flex-1 space-y-3">
        {!loading && classesData.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">No classes scheduled for today.</p>
        )}
        {classesData.map((item) => (
          <div
            key={item.id}
            className="
              relative
              flex
              min-w-0
              flex-col
              gap-4
              rounded-xl
              border
              border-slate-100
              bg-white
              p-4
              pl-5
              transition-all
              hover:shadow-sm
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Left Accent */}
            <div className="absolute bottom-4 left-0 top-4 w-1 rounded-r-full bg-purple-600" />

            {/* Class Information */}
            <div className="flex min-w-0 items-center gap-5">
              {/* Time */}
              <div className="w-[90px] shrink-0">
                <div className="text-[16px] font-bold leading-5 text-slate-900">
                  {item.time}
                </div>

                <div className="mt-1 text-xs font-medium text-slate-400">
                  {item.duration}
                </div>
              </div>

              {/* Title */}
              <div className="min-w-0">
                <div className="truncate text-[15px] font-semibold leading-5 text-slate-900">
                  {item.title}
                </div>

                <div className="mt-1 text-xs font-medium text-slate-400">
                  {item.students}
                </div>
              </div>
            </div>

            {/* Right Side — same width, stacked */}
            <div className="flex shrink-0 flex-col items-end gap-2">
              {/* Status stays above Start Class */}
              <span className="whitespace-nowrap rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600">
                {item.status}
              </span>

              {/* Start Class keeps its original width */}
              <button
                type="button"
                onClick={() => (item.meetingUrl ? openLink(item.meetingUrl) : navigate(`/tutor/open-class/${item.id}`))}
                className="
                  block
                  whitespace-nowrap
                  rounded-lg
                  bg-blue-600
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  hover:bg-blue-700
                  active:bg-blue-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-600/30
                "
              >
                Start Class
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysClasses;