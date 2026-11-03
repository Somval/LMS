// Helpers for the parent's Messages page.
// Conversations come from GET /messages/conversations, people you may message from GET /messages/contacts.

export { initials } from "../Dashboard/dashboardData";

const DAY = 24 * 60 * 60 * 1000;

const startOfDay = (value) => {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

const daysAgo = (value) => Math.round((startOfDay(new Date()) - startOfDay(value)) / DAY);

export const clock = (value) =>
  new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

// Time shown in the conversation list: "2:30 PM" today, "Yesterday", otherwise "12 Nov".
export const listTime = (value) => {
  const days = daysAgo(value);
  if (days === 0) return clock(value);
  if (days === 1) return "Yesterday";
  return new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

// Separator above the first message of each day.
export const dayLabel = (value) => {
  const days = daysAgo(value);
  if (days === 0) return "TODAY";
  if (days === 1) return "YESTERDAY";
  return new Date(value)
    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    .toUpperCase();
};

export const sameDay = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();

// "Tutor • Mathematics, English", "Support team", "Parent"
export const roleLabel = (role, subjects = []) => {
  if (role === "TUTOR") return subjects.length ? `Tutor • ${subjects.join(", ")}` : "Tutor";
  if (role === "ADMIN") return "Support team";
  return role.charAt(0) + role.slice(1).toLowerCase();
};

// One list entry per person: people already talked to first (latest message first),
// then everyone else you are allowed to message, A to Z.
// tutorSubjects: Map of tutor user id -> subjects they teach the selected child.
export const buildItems = (conversations = [], contacts = [], tutorSubjects = new Map()) => {
  const talked = new Set(conversations.map((c) => c.user.id));

  const existing = [...conversations]
    .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt))
    .map((c) => ({
      userId: c.user.id,
      name: c.user.fullName,
      role: roleLabel(c.user.role, tutorSubjects.get(c.user.id)),
      preview: `${c.lastMessage.fromMe ? "You: " : ""}${c.lastMessage.body}`,
      at: c.lastMessage.createdAt,
      time: listTime(c.lastMessage.createdAt),
      unread: c.unread,
    }));

  const fresh = contacts
    .filter((c) => !talked.has(c.id))
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((c) => ({
      userId: c.id,
      name: c.fullName,
      role: roleLabel(c.role, tutorSubjects.get(c.id)),
      preview: "Start a conversation",
      at: null,
      time: "",
      unread: 0,
    }));

  return [...existing, ...fresh];
};

// Adds newly fetched messages to the ones already shown, without duplicates, oldest first.
export const mergeMessages = (current, incoming) => {
  const byId = new Map(current.map((m) => [m.id, m]));
  incoming.forEach((m) => byId.set(m.id, m));
  return [...byId.values()].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};
