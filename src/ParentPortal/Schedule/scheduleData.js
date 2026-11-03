// Helpers for the parent Schedule page. Everything here works in the browser's local time.

export const HOUR_PX = 64; // height of one hour row in the weekly grid

const DAY = 24 * 60 * 60 * 1000;

// Monday 00:00 of the current week, moved by `offset` weeks.
export const startOfWeek = (offset = 0) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + offset * 7);
  return d;
};

// The seven days (Mon..Sun) of a week.
export const weekDays = (offset = 0) => {
  const monday = startOfWeek(offset);
  return Array.from({ length: 7 }, (_, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    return d;
  });
};

// Last millisecond of the week that starts at `monday`.
export const endOfWeek = (monday) => new Date(monday.getTime() + 7 * DAY - 1);

export const weekRangeString = (offset = 0) => {
  const days = weekDays(offset);
  const start = days[0].toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const end = days[6].toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${start} – ${end}`;
};

export const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// Day to show when a week is opened: today if it's in that week, otherwise Monday.
export const defaultDayFor = (offset) => {
  const days = weekDays(offset);
  return days.find((d) => sameDay(d, new Date())) ?? days[0];
};

// "Wednesday - May 20, 2026"
export const formatDay = (date) =>
  `${date.toLocaleDateString("en-US", { weekday: "long" })} - ${date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;

// "Wednesday, May 20, 2026"
export const formatLongDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const clock = (date) =>
  date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

// "2:00 PM - 3:00 PM"
export const formatTimeRange = (cls, dash = "-") =>
  `${clock(new Date(cls.startsAt))} ${dash} ${clock(new Date(cls.endsAt))}`;

export const durationMinutes = (cls) =>
  Math.round((new Date(cls.endsAt) - new Date(cls.startsAt)) / 60000);

// What the parent sees for a class, from its status and time.
export const statusInfo = (cls, now = new Date()) => {
  if (cls.status === "CANCELLED") return { key: "cancelled", label: "Cancelled" };
  if (cls.status === "COMPLETED") return { key: "completed", label: "Completed" };
  if (cls.status === "LIVE") return { key: "ongoing", label: "Ongoing" };
  // Still marked "scheduled" although it has finished (the tutor hasn't closed it).
  if (new Date(cls.endsAt) < now) return { key: "ended", label: "Ended" };
  return { key: "upcoming", label: "Upcoming" };
};

// Places one day's classes side by side when they overlap.
// Returns [{ cls, lane, lanes }] where lane/lanes say which column of the day-slot to use.
export const layoutDay = (classes) => {
  const sorted = [...classes].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
  const placed = [];

  let group = [];
  let groupEnd = 0;
  let laneEnds = [];

  const closeGroup = () => {
    group.forEach((item) => {
      item.lanes = laneEnds.length;
    });
    placed.push(...group);
    group = [];
    laneEnds = [];
  };

  sorted.forEach((cls) => {
    const start = new Date(cls.startsAt).getTime();
    const end = new Date(cls.endsAt).getTime();

    if (group.length && start >= groupEnd) closeGroup();

    let lane = laneEnds.findIndex((laneEnd) => laneEnd <= start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(end);
    } else {
      laneEnds[lane] = end;
    }

    group.push({ cls, lane, lanes: 1 });
    groupEnd = Math.max(groupEnd, end);
  });
  if (group.length) closeGroup();

  return placed;
};
