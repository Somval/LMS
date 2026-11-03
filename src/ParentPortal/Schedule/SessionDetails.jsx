import React from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, Calendar, Clock, User, MessageSquare, Video, PlayCircle } from "lucide-react";
import {
  durationMinutes,
  formatDay,
  formatLongDate,
  formatTimeRange,
  statusInfo,
} from "./scheduleData";

const BADGE_STYLES = {
  completed: "text-emerald-600 bg-emerald-50",
  ongoing: "text-purple-600 bg-purple-50",
  upcoming: "text-blue-600 bg-blue-50",
  ended: "text-slate-600 bg-slate-100",
  cancelled: "text-red-600 bg-red-50",
};

// cls: the class chosen in the weekly grid (or the first class of the selected day); null when there is none.
export default function SessionDetails({ currentChild, cls, selectedDay }) {
  const navigate = useNavigate();

  if (!cls) {
    return (
      <div className="w-full bg-slate-50 flex items-center justify-center font-sans">
        <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-5">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Session Details — <span className="text-blue-600">{currentChild?.fullName}</span>
          </h3>
          <p className="mt-3 text-sm text-slate-500">
            No class on {formatDay(selectedDay)}. Pick another day, or click a class in the
            schedule to see its details.
          </p>
        </div>
      </div>
    );
  }

  const info = statusInfo(cls);
  const tutorName = cls.tutor?.user?.fullName;
  const canJoin = cls.meetingUrl && (cls.status === "SCHEDULED" || cls.status === "LIVE");

  return (
    <div className="w-full bg-slate-50 flex items-center justify-center font-sans">
      {/* Main Container Card */}
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-5 flex flex-col md:flex-row items-stretch gap-6">
        {/* Left Column: Session Info */}
        <div className="flex-1 flex flex-col justify-between pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0">
          <div>
            {/* Top row: Section Title & Status Badge */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Session Details — <span className="text-blue-600">{currentChild?.fullName}</span>
              </h3>
              <span
                className={`px-3 py-0.5 text-xs font-semibold rounded-full ${BADGE_STYLES[info.key]}`}
              >
                {info.label}
              </span>
            </div>

            {/* Subject Title & Icon */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-900 flex items-center justify-center text-white shadow-sm shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{cls.subject.name}</h2>
            </div>
          </div>

          {/* Details list (Date, Time, Tutor) */}
          <div className="flex flex-col gap-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatLongDate(new Date(cls.startsAt))}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {formatTimeRange(cls, "–")} ({durationMinutes(cls)} min)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{tutorName}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Class Description & Actions */}
        <div className="flex-1 flex flex-col justify-between pl-0 md:pl-2">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Class Description
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">{cls.title}</p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col gap-2">
            {canJoin && (
              <a
                href={cls.meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-white bg-indigo-900 rounded-md hover:bg-indigo-800 transition-colors shadow-sm"
              >
                <Video className="w-3.5 h-3.5" />
                Join Class
              </a>
            )}

            {cls.recordingUrl && (
              <a
                href={cls.recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-sm"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                Watch Recording
              </a>
            )}

            {/* Message Tutor Button */}
            <button
              type="button"
              onClick={() => navigate("/parent/messages")}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              Message Tutor ({tutorName})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
