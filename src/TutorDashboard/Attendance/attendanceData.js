// Helpers for the tutor's Attendance page.
// Data comes from GET /attendance/tutor (totals + history for one course and period).

export const PERIODS = [
  { value: "today", label: "Today" },
  { value: "this-week", label: "This Week" },
  { value: "this-month", label: "This Month" },
  { value: "this-year", label: "This Year" },
];

// Start and end of the chosen period in the browser's own time zone, as ISO strings.
export const periodRange = (period, now = new Date()) => {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);

  if (period === "today") {
    end.setDate(end.getDate() + 1);
  } else if (period === "this-week") {
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // Monday
    end.setTime(start.getTime());
    end.setDate(end.getDate() + 7);
  } else if (period === "this-month") {
    start.setDate(1);
    end.setTime(start.getTime());
    end.setMonth(end.getMonth() + 1);
  } else {
    start.setMonth(0, 1);
    end.setTime(start.getTime());
    end.setFullYear(end.getFullYear() + 1);
  }
  return { from: start.toISOString(), to: end.toISOString() };
};

export const courseKey = (subjectId, yearLevel) => `${subjectId}:${yearLevel ?? ""}`;
export const courseLabel = (c) => (c.yearLevel ? `${c.name} — ${c.yearLevel}` : c.name);

const clock = (iso) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const formatRange = (startIso, endIso) => `${clock(startIso)} – ${clock(endIso)}`;
export const formatClock = clock;

export const STATUS_LABEL = { PRESENT: "Present", ABSENT: "Absent", LATE: "Late" };
