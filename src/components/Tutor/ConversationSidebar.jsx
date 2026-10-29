
import React from "react";
import { Search } from "lucide-react";

// Profile data
export const profiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=85",
    student: "Emily Johnson",
    course: "Mathematics",
    preview: "Thank you for the update.",
    time: "10:42 AM",
  },
  {
    id: 2,
    name: "Michael Williams",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=85",
    student: "Daniel Williams",
    course: "Physics",
    preview: "I will review the assignment.",
    time: "9:30 AM",
  },
  {
    id: 3,
    name: "Jessica Brown",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=85",
    student: "Sophia Brown",
    course: "Chemistry",
    preview: "Could you share the lesson notes?",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "David Miller",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=85",
    student: "James Miller",
    course: "English",
    preview: "That works for us. Thank you!",
    time: "Yesterday",
  },
];

// Reusable profile photo
export function Avatar({
  conversation,
  name,
  imageUrl,
  size = "h-8 w-8",
}) {
  const profile = conversation || {};

  const displayName = name || profile.name || "Profile photo";

  const src =
    imageUrl ||
    profile.avatarUrl ||
    profile.imageUrl ||
    profile.image ||
    (typeof profile.avatar === "string"
      ? profile.avatar
      : "");

  const fallbackImage =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=85";

  return (
    <img
      src={src || fallbackImage}
      alt={displayName}
      className={`${size} shrink-0 rounded-full object-cover`}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = fallbackImage;
      }}
    />
  );
}

export default function ConversationSidebar({
  conversations = profiles,
  selectedId,
  onSelect = () => {},
}) {
  const [search, setSearch] = React.useState("");

  const filteredConversations = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return conversations;

    return conversations.filter((conversation) =>
      [
        conversation.name,
        conversation.student,
        conversation.course,
        conversation.preview,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [conversations, search]);

  return (
    <aside className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[5px] border border-[#EDF0F5] bg-white">
      {/* Search */}
      <div className="shrink-0 bg-white px-[15px] pb-[11px] pt-[14px]">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="pointer-events-none absolute left-[10px] top-1/2 -translate-y-1/2 text-[#9AA4B2]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search messages..."
            aria-label="Search messages"
            className="h-[34px] w-full rounded-[7px] border border-[#E2E5EB] bg-white pl-[35px] pr-[10px] text-[10px] text-[#344054] outline-none placeholder:text-[#9CA3AF] focus:border-[#A8BFFF] focus:ring-2 focus:ring-[#EAF0FF]"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const isSelected = conversation.id === selectedId;

          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelect(conversation.id)}
              aria-pressed={isSelected}
              className={`flex min-h-[68px] w-full items-start gap-[11px] border-b border-[#F0F1F4] px-[15px] py-[10px] text-left transition-colors ${
                isSelected
                  ? "bg-[#DCE7FF]"
                  : "bg-white hover:bg-[#F7F9FC]"
              }`}
            >
              <Avatar
                conversation={conversation}
                size="h-[34px] w-[34px]"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[10px] font-semibold leading-[14px] text-[#171B24]">
                    {conversation.name || "Unknown user"}
                  </span>

                  <span className="shrink-0 text-[8px] text-[#687386]">
                    {conversation.time || ""}
                  </span>
                </div>

                <p className="mt-[2px] truncate text-[8px] leading-[12px] text-[#687386]">
                  {conversation.student || ""}
                  {conversation.course
                    ? ` · ${conversation.course}`
                    : ""}
                </p>

                <p className="mt-[2px] truncate text-[8px] leading-[12px] text-[#7C8798]">
                  {conversation.preview || ""}
                </p>
              </div>
            </button>
          );
        })}

        {filteredConversations.length === 0 && (
          <div className="px-4 py-10 text-center">
            <p className="text-[11px] font-medium text-[#475467]">
              No conversations found
            </p>

            <p className="mt-1 text-[9px] text-[#98A2B3]">
              Try another search.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
