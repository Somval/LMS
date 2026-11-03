// Turns the raw data from GET /dashboard/parent/:studentId into what the dashboard cards draw.

const DAY = 24 * 60 * 60 * 1000;

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Weeks start on Monday.
const startOfWeek = (date) => {
  const d = startOfDay(date);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
};

// { start, end } for a named period. allTime needs the date of the first activity.
export const periodRange = (period, now = new Date(), earliest = null) => {
  const endOfToday = new Date(startOfDay(now).getTime() + DAY - 1);

  switch (period) {
    case "thisWeek":
      return { start: startOfWeek(now), end: endOfToday };
    case "lastWeek": {
      const start = new Date(startOfWeek(now).getTime() - 7 * DAY);
      return { start, end: new Date(start.getTime() + 7 * DAY - 1) };
    }
    case "thisMonth":
      return { start: new Date(now.getFullYear(), now.getMonth(), 1), end: endOfToday };
    case "lastMonth":
      return {
        start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        end: new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999),
      };
    default:
      return { start: earliest ?? new Date(startOfDay(now).getTime() - 27 * DAY), end: endOfToday };
  }
};

const shortDate = (date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

// ── Learning progress chart ──
// Progress at a moment = share of the child's lessons completed by then.
export const buildLearningProgress = (lessons, now = new Date()) => {
  const total = lessons?.total ?? 0;
  const times = (lessons?.completedAt ?? [])
    .map((value) => new Date(value).getTime())
    .sort((a, b) => a - b);

  const progressAt = (time) =>
    total ? Math.min(100, Math.round((times.filter((t) => t <= time).length / total) * 100)) : 0;

  const earliest = times.length ? startOfDay(times[0]) : null;
  const POINTS = 12;

  const periods = [
    ["This Week", "thisWeek"],
    ["Last Week", "lastWeek"],
    ["This Month", "thisMonth"],
    ["All Time", "allTime"],
  ].map(([label, value]) => {
    const { start, end } = periodRange(value, now, earliest);
    const last = Math.min(end.getTime(), now.getTime()); // never plot the future
    const span = Math.max(last - start.getTime(), 0);

    const weeks = Array.from({ length: POINTS }, (_, index) => ({
      week: "",
      progress: progressAt(start.getTime() + (span * index) / (POINTS - 1)),
    }));

    const before = progressAt(start.getTime() - 1);
    const after = progressAt(last);

    // Four evenly spaced dates for the bottom of the chart.
    const labels = Array.from({ length: 4 }, (_, index) =>
      shortDate(new Date(start.getTime() + (span * index) / 3))
    );

    return {
      label,
      value,
      overallProgress: after,
      onTrack: total > 0 && (after > before || after === 100),
      weeks,
      labels,
    };
  });

  return { periods };
};

// ── Attendance donut ──
export const ATTENDANCE_PERIODS = ["This Week", "Last Week", "This Month", "Last Month"];

const PERIOD_KEYS = {
  "This Week": "thisWeek",
  "Last Week": "lastWeek",
  "This Month": "thisMonth",
  "Last Month": "lastMonth",
};

export const buildAttendance = (records = [], now = new Date()) => {
  const byPeriod = {};
  const totals = {};

  ATTENDANCE_PERIODS.forEach((label) => {
    const { start, end } = periodRange(PERIOD_KEYS[label], now);
    const inRange = records.filter((record) => {
      const time = new Date(record.date).getTime();
      return time >= start.getTime() && time <= end.getTime();
    });

    const total = inRange.length;
    const percent = (status) =>
      total ? Math.round((inRange.filter((r) => r.status === status).length / total) * 100) : 0;

    totals[label] = total;
    byPeriod[label] = [
      { name: "Present", value: percent("PRESENT"), color: "#4ADE63" },
      { name: "Late", value: percent("LATE"), color: "#2864E8" },
      { name: "Absent", value: percent("ABSENT"), color: "#FF1010" },
    ];
  });

  return { byPeriod, totals };
};

// ── Small display helpers ──
export const formatDue = (dueAt, status) => {
  if (status === "SUBMITTED") return "Submitted";
  if (status === "GRADED") return "Graded";
  if (status === "OVERDUE") return "Overdue";
  if (!dueAt) return "No due date";

  const days = Math.round((startOfDay(dueAt) - startOfDay(new Date())) / DAY);
  if (days <= 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days <= 6) return `Due in ${days} days`;
  return `Due ${shortDate(new Date(dueAt))}`;
};

const timeOf = (value) =>
  new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

export const formatSession = (startsAt, endsAt) => {
  const start = new Date(startsAt);
  return {
    month: start.toLocaleDateString("en-GB", { month: "short" }),
    date: String(start.getDate()),
    time: `${timeOf(start)} – ${timeOf(endsAt)}`,
  };
};

export const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
