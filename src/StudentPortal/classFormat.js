// Shared formatting for class lists on the student side.
const sameDay = (a, b) => a.toDateString() === b.toDateString();

export const dayLabel = (iso) => {
  const d = new Date(iso);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const label = sameDay(d, now)
    ? "Today"
    : sameDay(d, tomorrow)
      ? "Tomorrow"
      : sameDay(d, yesterday)
        ? "Yesterday"
        : d.toLocaleDateString("en-GB", { weekday: "short" });
  return {
    date: label,
    day: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
  };
};

const time = (iso) => new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export const timeRange = (start, end) => `${time(start)} – ${time(end)}`;

export const fullDate = (iso) => {
  const d = new Date(iso);
  const label = d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return sameDay(d, new Date()) ? `Today, ${label}` : `${d.toLocaleDateString("en-GB", { weekday: "short" })}, ${label}`;
};

// "Starts in 45 minutes", "Starts in 2 hours", or a live indicator.
export const countdown = (cls, now = Date.now()) => {
  if (!cls) return { label: "Starts in", value: "—", unit: "" };
  const start = new Date(cls.startsAt).getTime();
  const end = new Date(cls.endsAt).getTime();
  if (cls.status === "LIVE" || (now >= start && now < end)) return { label: "Class is", value: "live", unit: "now" };
  const mins = Math.max(0, Math.ceil((start - now) / 60000));
  if (mins < 60) return { label: "Starts in", value: String(mins), unit: mins === 1 ? "minute" : "minutes" };
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return { label: "Starts in", value: String(hrs), unit: hrs === 1 ? "hour" : "hours" };
  const days = Math.floor(hrs / 24);
  return { label: "Starts in", value: String(days), unit: days === 1 ? "day" : "days" };
};

export const openLink = (url) => {
  if (url) window.open(url, "_blank", "noopener,noreferrer");
};

export const durationLabel = (start, end) => {
  const mins = Math.max(1, Math.round((new Date(end) - new Date(start)) / 60000));
  return mins >= 60 && mins % 60 === 0 ? `${mins / 60}hr` : `${mins}min`;
};

export const timeAgo = (iso) => {
  const mins = Math.round((Date.now() - new Date(iso)) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  return days < 30 ? `${days} day${days === 1 ? "" : "s"} ago` : new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

// "Starting in 45 min", "Live now", "Finished"...
export const classStatusLabel = (c, now = Date.now()) => {
  const start = new Date(c.startsAt).getTime();
  const end = new Date(c.endsAt).getTime();
  if (c.status === "CANCELLED") return "Cancelled";
  if (c.status === "COMPLETED" || now >= end) return "Finished";
  if (c.status === "LIVE" || now >= start) return "Live now";
  const mins = Math.ceil((start - now) / 60000);
  if (mins < 60) return `Starting in ${mins} min`;
  const hrs = Math.floor(mins / 60);
  return hrs < 24 ? `Starting in ${hrs} hr` : "Scheduled";
};
