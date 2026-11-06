
import React from "react";
import { Search } from "lucide-react";
import SharedAvatar from "../Avatar";

// Profile photo (private, fetched with the login token) or the person's initials.
export function Avatar({ conversation, name, imageUrl, size = "h-8 w-8" }) {
  const person = conversation || {};
  return (
    <SharedAvatar
      name={name || person.name}
      avatarUrl={imageUrl ?? person.avatarUrl}
      className={`${size} rounded-full`}
      textClassName="text-[9px]"
    />
  );
}

export default function ConversationSidebar({
  conversations = [],
  selectedId,
  onSelect = () => {},
  loading = false,
  error = "",
  onRetry,
  // Optional (used by the admin inbox): filter tabs, a search callback, and custom empty-state text.
  tabs,
  activeTab,
  onTabChange,
  onSearchChange,
  emptyTitle = "No one to message yet",
  emptyHint = "Your students and their parents will show up here.",
}) {
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    onSearchChange?.(search.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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

        {tabs && (
          <div className="mt-[9px] flex flex-wrap gap-[5px]" role="tablist" aria-label="Filter by role">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => onTabChange?.(tab.key)}
                className={`rounded-full px-[10px] py-[4px] text-[9px] font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#326AFF] text-white"
                    : "bg-[#F2F4F8] text-[#475467] hover:bg-[#E6EBF4]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
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

                  <span className="flex shrink-0 items-center gap-[5px] text-[8px] text-[#687386]">
                    {conversation.time || ""}
                    {conversation.unread > 0 && (
                      <span
                        aria-label={`${conversation.unread} unread`}
                        className="flex h-[13px] min-w-[13px] items-center justify-center rounded-full bg-[#326AFF] px-[3px] text-[8px] font-semibold text-white"
                      >
                        {conversation.unread}
                      </span>
                    )}
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

        {loading && (
          <p className="px-4 py-10 text-center text-[11px] text-[#98A2B3]">Loading messages…</p>
        )}

        {!loading && error && (
          <div className="px-4 py-10 text-center">
            <p role="alert" className="text-[11px] font-medium text-red-600">{error}</p>
            {onRetry && (
              <button type="button" onClick={onRetry} className="mt-2 text-[10px] font-semibold text-[#326AFF] hover:underline">
                Try again
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredConversations.length === 0 && (
          <div className="px-4 py-10 text-center">
            <p className="text-[11px] font-medium text-[#475467]">
              {conversations.length === 0 ? emptyTitle : "No conversations found"}
            </p>

            <p className="mt-1 text-[9px] text-[#98A2B3]">
              {conversations.length === 0
                ? emptyHint
                : "Try another search."}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
