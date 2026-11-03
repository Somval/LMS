import React, { useMemo } from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Calendar,
  Loader2,
} from "lucide-react";
import {
  HOUR_PX,
  durationMinutes,
  formatTimeRange,
  layoutDay,
  sameDay,
  statusInfo,
} from "./scheduleData";

// Look of a class card for each status.
const STATUS_STYLES = {
  completed: {
    bgTheme: "bg-emerald-50 border-emerald-200 text-emerald-900",
    statusColor: "text-emerald-600",
    icon: CheckCircle2,
  },
  ongoing: {
    bgTheme: "bg-purple-50 border-purple-200 text-purple-900",
    statusColor: "text-purple-600",
    icon: PlayCircle,
  },
  upcoming: {
    bgTheme: "bg-blue-50 border-blue-200 text-blue-900",
    statusColor: "text-blue-600",
    icon: Clock,
  },
  ended: {
    bgTheme: "bg-slate-50 border-slate-200 text-slate-700",
    statusColor: "text-slate-500",
    icon: Clock,
  },
  cancelled: {
    bgTheme: "bg-red-50 border-red-200 text-red-900",
    statusColor: "text-red-600",
    icon: AlertCircle,
  },
};

const hourLabel = (hour) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}:00 ${suffix}`;
};

// classes: the child's classes for the shown week (null while loading).
export default function WeeklySchedule({
  currentChild,
  days,
  classes,
  error,
  onRetry,
  selectedDay,
  selectedClassId,
  onSelectDay,
  onSelectClass,
}) {
  const events = classes ?? [];

  // 8 AM to 5 PM by default, stretched if a class falls outside that.
  const { startHour, endHour } = useMemo(() => {
    let first = 8;
    let last = 17;
    events.forEach((cls) => {
      const start = new Date(cls.startsAt);
      const end = new Date(cls.endsAt);
      first = Math.min(first, start.getHours());
      last = Math.max(last, end.getHours() + (end.getMinutes() > 0 ? 1 : 0));
    });
    return { startHour: Math.max(first, 0), endHour: Math.min(Math.max(last, first + 1), 24) };
  }, [events]);

  const timeSlots = Array.from({ length: endHour - startHour }, (_, i) => hourLabel(startHour + i));

  // Position of every class: which day column, how far down, how tall, which lane.
  const placed = useMemo(
    () =>
      days.flatMap((day, dayIndex) =>
        layoutDay(events.filter((cls) => sameDay(new Date(cls.startsAt), day))).map((item) => {
          const start = new Date(item.cls.startsAt);
          const minutesFromTop = (start.getHours() - startHour) * 60 + start.getMinutes();
          const height = (durationMinutes(item.cls) / 60) * HOUR_PX;
          return {
            ...item,
            dayIndex,
            top: (minutesFromTop / 60) * HOUR_PX,
            height: Math.max(height, 48),
          };
        })
      ),
    [days, events, startHour]
  );

  const now = new Date();

  return (
    <div className="mx-auto w-full max-w-6xl bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-x-auto font-sans">
      {/* Header Title with Active Child Indicator */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-600" />
          Weekly Schedule —{" "}
          <span className="text-blue-600 font-semibold">{currentChild?.fullName}</span>
        </h2>
      </div>

      {/* Schedule Grid Wrapper */}
      <div className="min-w-[768px]">
        {/* Days Header Row (click a day to see its class) */}
        <div className="grid grid-cols-8 border-b border-slate-200 pb-3 text-center">
          <div className="text-xs font-semibold text-slate-400 uppercase"></div>
          {days.map((day) => {
            const isSelected = sameDay(day, selectedDay);
            const isToday = sameDay(day, now);
            return (
              <button
                type="button"
                key={day.toISOString()}
                onClick={() => onSelectDay(day)}
                aria-pressed={isSelected}
                className={`mx-1 flex flex-col items-center rounded-lg py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isSelected ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <span
                  className={`text-xs font-bold ${isSelected ? "text-blue-600" : "text-slate-700"}`}
                >
                  {day.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
                </span>
                <span
                  className={`text-xs ${
                    isToday ? "font-bold text-blue-600" : "text-slate-500"
                  }`}
                >
                  {day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time Rows & Events */}
        <div className="relative">
          {timeSlots.map((time) => (
            <div
              key={time}
              style={{ height: HOUR_PX }}
              className="grid grid-cols-8 border-b border-slate-100 items-start"
            >
              {/* Time Label */}
              <div className="text-xs font-medium text-slate-400 pr-4 pt-1 text-right select-none">
                {time}
              </div>

              {/* 7 Columns for Days */}
              {days.map((day) => (
                <div
                  key={day.toISOString()}
                  className={`border-r border-slate-100 h-full relative ${
                    sameDay(day, selectedDay) ? "bg-blue-50/30" : ""
                  }`}
                ></div>
              ))}
            </div>
          ))}

          {/* Absolutely positioned class cards */}
          {placed.map(({ cls, dayIndex, top, height, lane, lanes }) => {
            const info = statusInfo(cls, now);
            const style = STATUS_STYLES[info.key];
            const Icon = style.icon;
            const isSelected = cls.id === selectedClassId;
            const leftPercent = ((dayIndex + 1 + lane / lanes) / 8) * 100;
            const widthPercent = (1 / lanes / 8) * 100;

            return (
              <button
                type="button"
                key={cls.id}
                onClick={() => onSelectClass(cls)}
                aria-pressed={isSelected}
                aria-label={`${cls.subject.name}, ${formatTimeRange(cls)}, ${info.label}`}
                style={{
                  top: `${top + 2}px`,
                  height: `${height - 4}px`,
                  left: `calc(${leftPercent}% + 3px)`,
                  width: `calc(${widthPercent}% - 6px)`,
                }}
                className={`absolute overflow-hidden rounded-lg px-2 py-1.5 border text-left shadow-sm transition-all hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${style.bgTheme} ${
                  isSelected ? "ring-2 ring-blue-500" : ""
                } ${info.key === "cancelled" ? "opacity-70" : ""}`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <div className="truncate text-[10px] font-semibold opacity-75">
                      {formatTimeRange(cls)}
                    </div>
                    <div
                      className={`truncate text-xs font-bold text-slate-900 ${
                        info.key === "cancelled" ? "line-through" : ""
                      }`}
                    >
                      {cls.subject.name}
                    </div>
                  </div>
                  <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.statusColor}`} />
                </div>

                <div className="truncate text-[11px] text-slate-600">
                  {cls.tutor?.user?.fullName}
                </div>

                {/* Footer only where the card is tall enough */}
                {height >= 110 && (
                  <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" /> {durationMinutes(cls)} min
                    </span>
                    <span className={`font-semibold ${style.statusColor}`}>{info.label}</span>
                  </div>
                )}
              </button>
            );
          })}

          {/* Loading / error / empty states */}
          {classes === null && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90">
              <p className="text-sm font-medium text-red-600">{error}</p>
              <button
                type="button"
                onClick={onRetry}
                className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Try again
              </button>
            </div>
          )}

          {classes !== null && !error && events.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-xs">
              <p className="text-sm font-medium text-slate-500">
                No scheduled sessions for {currentChild?.fullName} this week.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
