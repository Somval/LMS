// Helpers for the parent's Attendance page.
// Data comes from GET /attendance?studentId=: { summary, records }, one record per class the child was marked for.

export const PERIODS = [
  { id: "month", label: "This Month" },
  { id: "week", label: "This Week" },
  { id: "year", label: "This Year" },
];

const DAY = 24 * 60 * 60 * 1000;

// First moment of the chosen period (a week starts on Monday).
export const periodStart = (periodId, now = new Date()) => {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  if (periodId === "week") {
    return new Date(today.getTime() - ((today.getDay() + 6) % 7) * DAY);
  }
  if (periodId === "month") return new Date(now.getFullYear(), now.getMonth(), 1);
  return new Date(now.getFullYear(), 0, 1);
};

// Records for classes that took place in the period, newest class first.
export const recordsInPeriod = (records = [], periodId, now = new Date()) => {
  const start = periodStart(periodId, now).getTime();
  return records
    .filter((record) => new Date(record.class.startsAt).getTime() >= start)
    .sort((a, b) => new Date(b.class.startsAt) - new Date(a.class.startsAt));
};

// Totals for the cards. Late still counts as attending, the same as the rest of the app.
export const summarise = (records) => {
  const present = records.filter((r) => r.status === "PRESENT").length;
  const late = records.filter((r) => r.status === "LATE").length;
  const missed = records.filter((r) => r.status === "ABSENT").length;
  const held = records.length;
  const attended = present + late;
  const rate = held ? Math.round((attended / held) * 100) : null;
  return { held, attended, late, missed, rate };
};

export const rateLabel = (rate) => {
  if (rate == null) return { text: "No sessions yet", color: "text-slate-400" };
  if (rate >= 90) return { text: "Excellent", color: "text-emerald-600" };
  if (rate >= 75) return { text: "Good", color: "text-emerald-600" };
  if (rate >= 50) return { text: "Fair", color: "text-amber-600" };
  return { text: "Needs attention", color: "text-rose-600" };
};

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const clock = (value) =>
  new Date(value).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export const timeRange = (cls) => `${clock(cls.startsAt)} – ${clock(cls.endsAt)}`;
