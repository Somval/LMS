import React from "react";
import { Calendar } from "lucide-react";
import ImageChild from "../../assets/images/0f8e1d9734e359a5f167b12e36f573ba6133942a.jpg";
import ImageTwo from "../../assets/images/ff2c1ec6db577f2e345c44c9bf9e3999ff815caa.jpg";

export default function UpcomingSessions({ onViewSchedule = () => {} }) {
  const sessions = [
    {
      id: 1,
      dateLabel: "Today — May 14",
      name: "Olivia Johnson",
      subject: "Mathematics",
      time: "4:00 PM",
      avatar: ImageChild,
    },
    {
      id: 2,
      dateLabel: "Today — May 14",
      name: "Liam Johnson",
      subject: "Mathematics",
      time: "4:00 PM",
      avatar: ImageTwo,
    },
    {
      id: 3,
      dateLabel: "Friday — May 16",
      name: "Olivia Johnson",
      subject: "Mathematics",
      time: "4:00 PM",
      avatar: ImageChild,
    },
  ];

  return (
    <div
      style={{ backgroundColor: "#F6FAFF" }}
      className="w-full max-w-[587px] sm:h-[548px] p-4 sm:p-6 rounded-2xl flex flex-col justify-between shadow-xs border border-slate-100 box-border mx-auto overflow-hidden"
    >
      <div>
        {/* Header */}
        <h1 className="font-['Inter'] font-semibold text-lg sm:text-[22px] text-slate-900 mb-3 sm:mb-4">
          Upcoming Sessions
        </h1>

        {/* Sessions List */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {sessions.map((session) => (
            <div key={session.id} className="flex flex-col gap-1 sm:gap-1.5">
              <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                {session.dateLabel}
              </span>
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={session.avatar}
                    alt={session.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                      {session.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">
                      {session.subject}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-slate-500 shrink-0">
                  <span className="text-[11px] sm:text-xs font-semibold">{session.time}</span>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Button */}
      <button
        type="button"
        onClick={onViewSchedule}
        className="w-full py-2.5 sm:py-3 bg-white border border-indigo-200/70 hover:border-indigo-300 text-indigo-900 font-semibold text-xs sm:text-sm rounded-xl shadow-2xs transition-all duration-200 flex items-center justify-center cursor-pointer mt-3"
      >
        View Week’s Schedule
      </button>
    </div>
  );
}