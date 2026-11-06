import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ConversationSidebar from "../../components/Tutor/ConversationSidebar";
import ChatPanel from "../../TutorDashboard/Messages/ChatPanel";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { ROLE_TABS, buildItems, mergeMessages, stamp } from "./adminMessagesData";

const PAGE = 50; // the server returns the latest 50 messages at a time
const LIST_REFRESH_MS = 20000;
const CHAT_REFRESH_MS = 10000;

export default function AdminMessages() {
  const { user } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  const [roleTab, setRoleTab] = useState("ALL");
  const [rawSearch, setRawSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [hasMore, setHasMore] = useState(false);

  // Search the whole user base on the server, after a short pause in typing.
  useEffect(() => {
    const t = setTimeout(() => setContactSearch(rawSearch), 300);
    return () => clearTimeout(t);
  }, [rawSearch]);

  // Everyone the admin has talked to, plus people matching the current search and role tab.
  const loadList = useCallback(
    async (silent) => {
      try {
        const [convos, people] = await Promise.all([
          api.get("/messages/conversations"),
          api.get("/messages/contacts", {
            search: contactSearch || undefined,
            role: roleTab === "ALL" ? undefined : roleTab,
          }),
        ]);
        setConversations(convos);
        setContacts(people);
        setListError("");
      } catch (err) {
        if (!silent) setListError(err.message || "Could not load your messages.");
      } finally {
        setListLoading(false);
      }
    },
    [contactSearch, roleTab]
  );

  useEffect(() => {
    loadList(false);
    const timer = setInterval(() => loadList(true), LIST_REFRESH_MS);
    return () => clearInterval(timer);
  }, [loadList]);

  // The chat reports back after reading or sending, so previews and unread counts stay current.
  const refreshList = useRef(loadList);
  refreshList.current = loadList;

  const loadChat = useCallback(async (contactId, silent) => {
    try {
      const fresh = await api.get(`/messages/with/${contactId}`);
      setMessages((current) => mergeMessages(silent ? current : [], fresh));
      if (!silent) setHasMore(fresh.length >= PAGE);
      setChatError("");
      refreshList.current(true);
    } catch (err) {
      if (!silent) setChatError(err.message || "Could not load this conversation.");
    } finally {
      if (!silent) setChatLoading(false);
    }
  }, []);

  // Open a conversation, then check for new messages every few seconds.
  useEffect(() => {
    setMessages([]);
    setHasMore(false);
    setChatError("");
    if (!selectedId) return undefined;

    setChatLoading(true);
    loadChat(selectedId, false);
    const timer = setInterval(() => loadChat(selectedId, true), CHAT_REFRESH_MS);
    return () => clearInterval(timer);
  }, [selectedId, loadChat]);

  const allItems = useMemo(() => buildItems(conversations, contacts), [conversations, contacts]);
  const items = useMemo(
    () => (roleTab === "ALL" ? allItems : allItems.filter((item) => item.role === roleTab)),
    [allItems, roleTab]
  );

  // Keep the open chat on screen even if a new search or tab filters that person out of the list.
  const lastSelected = useRef(null);
  const found = allItems.find((item) => item.id === selectedId) ?? null;
  if (found) lastSelected.current = found;
  const selectedConversation =
    found ?? (lastSelected.current?.id === selectedId ? lastSelected.current : null);

  // The chat panel works with { id, sender, text, time }.
  const selectedMessages = useMemo(
    () =>
      messages.map((m) => ({
        id: m.id,
        sender: m.senderId === user?.id ? "me" : "other",
        text: m.body,
        time: stamp(m.createdAt),
      })),
    [messages, user?.id]
  );

  const handleLoadEarlier = async () => {
    const oldest = messages[0];
    if (!oldest || !selectedId) return;
    try {
      const older = await api.get(`/messages/with/${selectedId}`, { before: oldest.createdAt });
      setMessages((current) => mergeMessages(current, older));
      setHasMore(older.length >= PAGE);
    } catch (err) {
      setChatError(err.message || "Could not load earlier messages.");
    }
  };

  // Throws when the message could not be sent; the chat panel shows the reason.
  const handleSendMessage = async (recipientId, text) => {
    const created = await api.post("/messages", { recipientId, body: text });
    setMessages((current) => mergeMessages(current, [created]));
    refreshList.current(true);
  };

  return (
    <div className="h-[calc(100dvh-76px)] min-h-[420px] w-full sm:h-[calc(100dvh-87px)] lg:h-[calc(100dvh-111px)]">
      <div className="grid h-full min-h-0 w-full grid-cols-1 gap-[5px] md:grid-cols-[125px_minmax(0,1fr)] lg:grid-cols-[350px_minmax(0,1fr)]">
        {/* Left side */}
        <ConversationSidebar
          conversations={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          loading={listLoading}
          error={listError}
          onRetry={() => loadList(false)}
          tabs={ROLE_TABS}
          activeTab={roleTab}
          onTabChange={setRoleTab}
          onSearchChange={setRawSearch}
          emptyTitle="No users found"
          emptyHint="Students, parents and tutors will show up here."
        />

        {/* Right side */}
        <ChatPanel
          conversation={selectedConversation}
          messages={selectedMessages}
          me={user}
          loading={chatLoading}
          error={chatError}
          hasMore={hasMore}
          onLoadEarlier={handleLoadEarlier}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
