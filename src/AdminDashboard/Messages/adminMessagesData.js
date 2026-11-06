// Helpers for the admin Messages page.
// Conversations come from GET /messages/conversations; people an admin may message come from
// GET /messages/contacts (searched and limited by the server).
import { listTime } from "../../ParentPortal/Messages/messagesData";

export { clock, mergeMessages } from "../../ParentPortal/Messages/messagesData";
export { stamp } from "../../TutorDashboard/Messages/messagesData";

export const ROLE_TABS = [
  { key: "ALL", label: "All" },
  { key: "STUDENT", label: "Students" },
  { key: "PARENT", label: "Parents" },
  { key: "TUTOR", label: "Tutors" },
];

const ROLE_LABEL = { STUDENT: "Student", PARENT: "Parent", TUTOR: "Tutor", ADMIN: "Admin" };

// The two small lines under a name: their role, and their email to tell namesakes apart.
const describe = (user) => ({ student: ROLE_LABEL[user.role] ?? "User", course: user.email ?? "" });

// People already talked to first (latest message first), then everyone else, A to Z.
export const buildItems = (conversations = [], contacts = []) => {
  const talked = new Set(conversations.map((c) => c.user.id));

  const existing = [...conversations]
    .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt))
    .map((c) => ({
      id: c.user.id,
      role: c.user.role,
      name: c.user.fullName,
      avatarUrl: c.user.avatarUrl,
      ...describe(c.user),
      preview: `${c.lastMessage.fromMe ? "You: " : ""}${c.lastMessage.body}`,
      time: listTime(c.lastMessage.createdAt),
      unread: c.unread,
    }));

  const fresh = contacts
    .filter((c) => !talked.has(c.id))
    .map((c) => ({
      id: c.id,
      role: c.role,
      name: c.fullName,
      avatarUrl: c.avatarUrl,
      ...describe(c),
      preview: "Start a conversation",
      time: "",
      unread: 0,
    }));

  return [...existing, ...fresh];
};
