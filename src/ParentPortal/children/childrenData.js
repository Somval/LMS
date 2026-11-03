// Display helpers for the Linked Children page.

export { initials } from "../Dashboard/dashboardData";

const DAY = 24 * 60 * 60 * 1000;

const startOfDay = (value) => {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

// 0 = today, 1 = tomorrow, -1 = yesterday ...
const daysFromToday = (value) =>
  Math.round((startOfDay(value) - startOfDay(new Date())) / DAY);

export const formatTime = (value) =>
  new Date(value).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

// "Today, 4:00 PM" / "Tomorrow, 4:00 PM" / "Fri 14 Nov, 4:00 PM"
export const formatNextSession = (value) => {
  const days = daysFromToday(value);
  if (days === 0) return `Today, ${formatTime(value)}`;
  if (days === 1) return `Tomorrow, ${formatTime(value)}`;
  const date = new Date(value).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return `${date}, ${formatTime(value)}`;
};

// "Today — Nov 3" / "Tomorrow — Nov 4" / "Friday — Nov 7"
export const sessionDateLabel = (value) => {
  const days = daysFromToday(value);
  const date = new Date(value);
  const word =
    days === 0
      ? "Today"
      : days === 1
        ? "Tomorrow"
        : date.toLocaleDateString("en-US", { weekday: "long" });
  const shortDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return `${word} — ${shortDate}`;
};

// "Today, 10:30 AM" / "Yesterday, 6:15 PM" / "3 Nov, 6:15 PM"
export const formatActivityTime = (value) => {
  const days = daysFromToday(value);
  if (days === 0) return `Today, ${formatTime(value)}`;
  if (days === -1) return `Yesterday, ${formatTime(value)}`;
  const date = new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  return `${date}, ${formatTime(value)}`;
};

// "July 19, 2026"
export const formatLinkedDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const firstName = (name = "") => name.trim().split(/\s+/)[0] || "";

// Every tutor teaching any of the child's subjects, without repeats.
export const tutorsOf = (child) => [
  ...new Set(child.subjects.flatMap((subject) => subject.tutors)),
];
