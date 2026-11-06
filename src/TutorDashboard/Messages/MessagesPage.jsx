import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ConversationSidebar from "../../components/Tutor/ConversationSidebar";
import ChatPanel from "./ChatPanel";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { buildItems, clock, mergeMessages, stamp } from "./messagesData";

const PAGE = 50; // the server returns the latest 50 messages at a time
const LIST_REFRESH_MS = 20000;
const CHAT_REFRESH_MS = 10000;

export default function MessagesPage() {
  const { user } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [hasMore, setHasMore] = useState(false);

  // Everyone the tutor has talked to, plus everyone they may message.
  const loadList = useCallback(async (silent) => {
    try {
      const [convos, people] = await Promise.all([
        api.get("/messages/conversations"),
        api.get("/messages/contacts"),
      ]);
      setConversations(convos);
      setContacts(people);
      setListError("");
    } catch (err) {
      if (!silent) setListError(err.message || "Could not load your messages.");
    } finally {
      setListLoading(false);
    }
  }, []);

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

  const items = useMemo(() => buildItems(conversations, contacts), [conversations, contacts]);
  const selectedConversation = items.find((item) => item.id === selectedId) ?? null;

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
    <main className="h-[calc(100dvh-64px)] min-h-[420px] w-full bg-[#F4F7FD] p-[9px] sm:p-[12px]">
      <div className="mx-auto grid h-full min-h-0 w-full max-w-[1200px] grid-cols-1 gap-[5px] md:grid-cols-[125px_minmax(0,1fr)] lg:grid-cols-[350px_minmax(0,1fr)]">
        {/* Left side */}
        <ConversationSidebar
          conversations={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          loading={listLoading}
          error={listError}
          onRetry={() => loadList(false)}
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
    </main>
  );
}
