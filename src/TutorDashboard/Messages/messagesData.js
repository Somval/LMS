// Helpers for the tutor's Messages page.
// Conversations come from GET /messages/conversations; people the tutor may message
// (students, their parents, support) come from GET /messages/contacts.
import { clock, listTime, mergeMessages } from "../../ParentPortal/Messages/messagesData";

export { clock, mergeMessages };

// "2:30 PM" for today, otherwise "Yesterday, 2:30 PM" or "12 Nov, 2:30 PM".
export const stamp = (value) => {
  const day = listTime(value);
  const time = clock(value);
  return day === time ? time : `${day}, ${time}`;
};

// The two small lines under a name: who they are, and what ties them to this tutor.
const describe = (role, contact) => {
  const course = (contact?.subjects ?? []).join(", ");
  if (role === "ADMIN") return { student: "Support team", course: "" };
  if (role === "PARENT") {
    const kids = contact?.children ?? [];
    return { student: kids.length ? `Parent of ${kids.join(", ")}` : "Parent", course };
  }
  return { student: "Student", course };
};

// One list entry per person: people already talked to first (latest message first),
// then everyone else the tutor may message, A to Z.
export const buildItems = (conversations = [], contacts = []) => {
  const byId = new Map(contacts.map((c) => [c.id, c]));
  const talked = new Set(conversations.map((c) => c.user.id));

  const existing = [...conversations]
    .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt))
    .map((c) => ({
      id: c.user.id,
      name: c.user.fullName,
      avatarUrl: c.user.avatarUrl,
      ...describe(c.user.role, byId.get(c.user.id)),
      preview: `${c.lastMessage.fromMe ? "You: " : ""}${c.lastMessage.body}`,
      time: listTime(c.lastMessage.createdAt),
      unread: c.unread,
    }));

  const fresh = contacts
    .filter((c) => !talked.has(c.id))
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((c) => ({
      id: c.id,
      name: c.fullName,
      avatarUrl: c.avatarUrl,
      ...describe(c.role, c),
      preview: "Start a conversation",
      time: "",
      unread: 0,
    }));

  return [...existing, ...fresh];
};
