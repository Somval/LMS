
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, Check, Clock3 } from "lucide-react";

const daysList = [
  { id: "Mon", label: "Mon", fullName: "Monday" },
  { id: "Tue", label: "Tue", fullName: "Tuesday" },
  { id: "Wed", label: "Wed", fullName: "Wednesday" },
  { id: "Thu", label: "Thu", fullName: "Thursday" },
  { id: "Fri", label: "Fri", fullName: "Friday" },
  { id: "Sat", label: "Sat", fullName: "Saturday" },
  { id: "Sun", label: "Sun", fullName: "Sunday" },
];

const timeSlots = [
  "8:00 AM – 9:00 AM",
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "1:00 PM – 2:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "5:00 PM – 6:00 PM",
  "6:00 PM – 7:00 PM",
  "7:00 PM – 8:00 PM",
  "8:00 PM – 9:00 PM",
  "9:00 PM – 10:00 PM",
];

function formatTime(time) {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;

  return `${formattedHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function formatTimeRange(start, end) {
  if (!start || !end) return "";
  return `${formatTime(start)} – ${formatTime(end)}`;
}

function parseTimeRange(value = "") {
  const match = value.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i
  );

  if (!match) return null;

  const to24Hour = (hour, minute, period) => {
    let hours = Number(hour);
    const minutes = Number(minute);

    if (period.toUpperCase() === "AM") {
      if (hours === 12) hours = 0;
    } else if (hours !== 12) {
      hours += 12;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  return {
    start: to24Hour(match[1], match[2], match[3]),
    end: to24Hour(match[4], match[5], match[6]),
  };
}

function parseDays(value = "") {
  const values = value
    .split(",")
    .map((day) => day.trim().toLowerCase())
    .filter(Boolean);

  return daysList
    .filter(
      (day) =>
        values.includes(day.id.toLowerCase()) ||
        values.includes(day.fullName.toLowerCase())
    )
    .map((day) => day.id);
}

function getInitialSchedule(course) {
  const parsedTime = parseTimeRange(course?.scheduleTime || "");

  return {
    selectedDays: parseDays(course?.scheduleDays || ""),
    selectedTime: timeSlots.includes(course?.scheduleTime)
      ? course.scheduleTime
      : "",
    startTime: parsedTime?.start || "13:00",
    endTime: parsedTime?.end || "14:00",
    customTime: Boolean(
      course?.scheduleTime &&
        course.scheduleTime !== "Not Scheduled" &&
        !timeSlots.includes(course.scheduleTime)
    ),
  };
}

export default function SetClassModal({ course, onClose, onSave }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [startTime, setStartTime] = useState("13:00");
  const [endTime, setEndTime] = useState("14:00");
  const [customTime, setCustomTime] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!course) return;

    const initial = getInitialSchedule(course);

    setSelectedDays(initial.selectedDays);
    setSelectedTime(initial.selectedTime);
    setStartTime(initial.startTime);
    setEndTime(initial.endTime);
    setCustomTime(initial.customTime);
    setError("");
    setIsSubmitted(false);
  }, [course]);

  useEffect(() => {
    if (!course) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [course, onClose]);

  if (!course || typeof document === "undefined") return null;

  const courseName = course.title || "Course";
  const level = course.level || "Not specified";
  const tutorName = course.assignedTutor || "Not assigned";
  const studentName = course.studentName || "Student";

  const currentTime = customTime
    ? formatTimeRange(startTime, endTime)
    : selectedTime;

  const formattedDays = daysList
    .filter((day) => selectedDays.includes(day.id))
    .map((day) => day.fullName)
    .join(", ");

  const invalidCustomTime =
    customTime &&
    (!startTime || !endTime || endTime <= startTime);

  const handleDayToggle = (dayId) => {
    setSelectedDays((previous) =>
      previous.includes(dayId)
        ? previous.filter((day) => day !== dayId)
        : [...previous, dayId]
    );

    setError("");
    setIsSubmitted(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCustomTime(false);
    setError("");
    setIsSubmitted(false);
  };

  const handleCustomTimeChange = (type, value) => {
    if (type === "start") {
      setStartTime(value);
    } else {
      setEndTime(value);
    }

    setCustomTime(true);
    setError("");
    setIsSubmitted(false);
  };

  const handleSchedule = () => {
    if (selectedDays.length === 0) {
      setError("Please select at least one class day.");
      return;
    }

    if (customTime && invalidCustomTime) {
      setError("Please choose a valid end time after the start time.");
      return;
    }

    if (!currentTime) {
      setError("Please select a class time.");
      return;
    }

    const updatedCourse = {
      ...course,
      scheduleDays: formattedDays,
      scheduleTime: currentTime,
      status: "Scheduled",
    };

    setIsSubmitted(true);
    setError("");

    if (typeof onSave === "function") {
      onSave(updatedCourse);
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-3 font-['Inter',sans-serif] text-slate-800 antialiased backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="set-class-title"
        className="flex max-h-[calc(100dvh-24px)] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl sm:max-h-[calc(100dvh-48px)]"
      >
        {/* Header */}
        <header className="flex shrink-0 items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-7 sm:py-6">
          <div className="min-w-0">
            <h2
              id="set-class-title"
              className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
            >
              Set Class
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              {courseName}
              <span className="mx-1">·</span>
              {level}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#084518]"
          >
            <X size={21} />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 space-y-7 overflow-y-auto px-5 py-6 sm:px-7">
          {/* Step 1: Select days */}
          <section className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#084518] text-sm font-bold text-white">
              1
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold leading-6 text-gray-900">
                Select Day
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Choose one or more days for this class.
              </p>

              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {daysList.map((day) => {
                  const isSelected = selectedDays.includes(day.id);

                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => handleDayToggle(day.id)}
                      aria-pressed={isSelected}
                      className={`flex min-h-10 items-center justify-center rounded-lg border px-2 text-sm font-semibold transition ${
                        isSelected
                          ? "border-[#084518] bg-[#084518] text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-[#084518] hover:bg-green-50"
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                {selectedDays.length
                  ? `${selectedDays.length} day${selectedDays.length === 1 ? "" : "s"} selected`
                  : "Select at least one day."}
              </p>
            </div>
          </section>

          {/* Step 2: Select time */}
          <section className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#084518] text-sm font-bold text-white">
              2
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold leading-6 text-gray-900">
                Select Time
              </h3>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                Select a suggested time or enter a custom start and end time.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {timeSlots.map((time) => {
                  const isSelected =
                    !customTime && selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      aria-pressed={isSelected}
                      className={`flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3 py-3 text-left text-sm font-medium transition ${
                        isSelected
                          ? "border-[#084518] bg-green-50 text-[#084518] ring-1 ring-[#084518]/20"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Clock3 size={16} className="shrink-0" />
                        {time}
                      </span>

                      {isSelected && (
                        <Check size={17} className="shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom time */}
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#084518]">
                    <Clock3 size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Choose a custom time
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Set any start and end time for the class.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="class-start-time"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Start time
                    </label>

                    <input
                      id="class-start-time"
                      type="time"
                      value={startTime}
                      onChange={(event) =>
                        handleCustomTimeChange("start", event.target.value)
                      }
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-[#084518] focus:ring-2 focus:ring-[#084518]/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="class-end-time"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      End time
                    </label>

                    <input
                      id="class-end-time"
                      type="time"
                      value={endTime}
                      onChange={(event) =>
                        handleCustomTimeChange("end", event.target.value)
                      }
                      className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-[#084518] focus:ring-2 focus:ring-[#084518]/15"
                    />
                  </div>
                </div>

                {customTime && invalidCustomTime && (
                  <p className="mt-3 text-xs font-medium text-red-600">
                    End time must be later than start time.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setCustomTime(true);
                    setError("");
                    setIsSubmitted(false);
                  }}
                  className={`mt-4 inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    customTime
                      ? "bg-[#084518] text-white"
                      : "border border-gray-300 bg-white text-gray-700 hover:border-[#084518]"
                  }`}
                >
                  Use Custom Time
                </button>
              </div>
            </div>
          </section>

          {/* Schedule summary */}
          <section className="flex items-start gap-3 rounded-xl border border-[#D2EAD7] bg-[#EAF5EC] p-4 sm:gap-4 sm:p-5">
            <div className="shrink-0 rounded-lg bg-white/70 p-2 text-[#1B7E32]">
              <Calendar size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-gray-900">
                Class Details
              </h4>

              <p className="mt-2 break-words text-sm leading-5 text-gray-600">
                {courseName} · {level}
              </p>

              <p className="mt-1 text-sm leading-5 text-gray-600">
                Tutor: {tutorName}
              </p>

              <div className="mt-3 border-t border-[#CDE3D1] pt-3">
                <p className="text-xs font-medium uppercase tracking-wide text-[#46724E]">
                  Selected schedule
                </p>

                <p className="mt-1 break-words text-sm font-semibold leading-6 text-[#084518]">
                  {formattedDays || "No days selected"}
                </p>

                <p className="text-sm font-semibold leading-6 text-[#084518]">
                  {currentTime || "Choose a class time"}
                </p>
              </div>
            </div>
          </section>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {isSubmitted && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"
            >
              <Check size={20} className="mt-0.5 shrink-0" />

              <div>
                <p className="text-sm font-semibold">
                  Class schedule saved!
                </p>

                <p className="mt-1 text-xs leading-5">
                  {formattedDays} · {currentTime}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-xs leading-5 text-gray-500">
            {selectedDays.length} day
            {selectedDays.length === 1 ? "" : "s"} selected
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#084518]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSchedule}
              disabled={
                selectedDays.length === 0 ||
                !currentTime ||
                invalidCustomTime
              }
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#084518] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#063512] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#084518] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Calendar size={17} />
              Schedule Class
            </button>
          </div>
        </footer>
      </section>
    </div>
  );

  return createPortal(modal, document.body);
}
