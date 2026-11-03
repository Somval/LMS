import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { api } from '../../lib/api';
import { clock, dayLabel, initials, mergeMessages, sameDay } from './messagesData';

const PAGE = 50; // the server returns the latest 50 messages at a time
const REFRESH_MS = 10000;

const Avatar = ({ name, className }) => (
  <span
    aria-hidden="true"
    className={`flex shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700 border border-slate-200 ${className}`}
  >
    {initials(name)}
  </span>
);

// contact: the person chosen in the list (null when none). me: the signed-in parent.
// onActivity runs after messages are read or sent, so the list can refresh its previews and unread counts.
export default function ChatDetailView({ contact, me, onActivity }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sendError, setSendError] = useState('');
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const bottomRef = useRef(null);
  const contactId = contact?.userId;

  const load = useCallback(
    async (silent) => {
      if (!contactId) return;
      try {
        const fresh = await api.get(`/messages/with/${contactId}`);
        setMessages((current) => mergeMessages(silent ? current : [], fresh));
        if (!silent) setHasMore(fresh.length >= PAGE);
        setError('');
        onActivity?.();
      } catch (err) {
        if (!silent) setError(err.message || 'Could not load this conversation.');
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [contactId, onActivity]
  );

  // Open a conversation, then check for new messages every few seconds.
  useEffect(() => {
    setMessages([]);
    setSendError('');
    setInputText('');
    if (!contactId) return undefined;

    setLoading(true);
    load(false);
    const timer = setInterval(() => load(true), REFRESH_MS);
    return () => clearInterval(timer);
  }, [contactId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the newest message in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView?.({ block: 'end' });
  }, [messages.length, contactId]);

  const loadEarlier = async () => {
    const oldest = messages[0];
    if (!oldest) return;
    try {
      const older = await api.get(`/messages/with/${contactId}`, { before: oldest.createdAt });
      setMessages((current) => mergeMessages(current, older));
      setHasMore(older.length >= PAGE);
    } catch (err) {
      setError(err.message || 'Could not load earlier messages.');
    }
  };

  const send = async (text) => {
    const body = text.trim();
    if (!body || sending || !contactId) return;

    setSending(true);
    setSendError('');
    try {
      const created = await api.post('/messages', { recipientId: contactId, body });
      setMessages((current) => mergeMessages(current, [created]));
      setInputText('');
      onActivity?.();
    } catch (err) {
      setSendError(err.message || "Your message couldn't be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    send(inputText);
  };

  if (!contact) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-xs border border-slate-200/80 font-sans h-[650px] flex flex-col items-center justify-center text-center p-8">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <MessageSquare className="h-7 w-7" />
        </div>
        <h3 className="text-sm font-bold text-slate-900">Select a conversation</h3>
        <p className="mt-1 max-w-xs text-xs text-slate-500">
          Choose someone from the list to read your messages or start a new conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-xs border border-slate-200/80 font-sans flex flex-col h-[650px] overflow-hidden">

      {/* 1. Top Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4 bg-white shrink-0">
        <Avatar name={contact.name} className="w-12 h-12 text-sm shadow-2xs" />
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate">
            {contact.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
            {contact.role}
          </p>
        </div>
      </div>

      {/* 2. Messages Stream Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">

        {hasMore && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={loadEarlier}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
            >
              Load earlier messages
            </button>
          </div>
        )}

        {loading && <p className="text-center text-xs text-slate-400">Loading messages…</p>}

        {error && <p role="alert" className="text-center text-xs text-red-600">{error}</p>}

        {!loading && !error && messages.length === 0 && (
          <p className="text-center text-xs text-slate-400">
            No messages yet. Say hello to {contact.name.split(/\s+/)[0]}.
          </p>
        )}

        {messages.map((msg, index) => {
          const isMe = msg.senderId === me.id;
          const senderName = isMe ? me.fullName : contact.name;
          const newDay = index === 0 || !sameDay(messages[index - 1].createdAt, msg.createdAt);

          return (
            <React.Fragment key={msg.id}>
              {/* Date Separator */}
              {newDay && (
                <div className="flex justify-center my-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {dayLabel(msg.createdAt)}
                  </span>
                </div>
              )}

              <div className={`flex items-end gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>

                {/* Incoming Avatar */}
                {!isMe && <Avatar name={senderName} className="w-8 h-8 text-[10px] mb-1" />}

                {/* Message Bubble Container */}
                <div className={`max-w-md space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>

                  {/* Sender Name & Time */}
                  <div className={`flex items-center gap-2 text-[11px] text-slate-400 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <span className="font-semibold text-slate-700">{senderName}</span>
                    <span>•</span>
                    <span>{clock(msg.createdAt)}</span>
                  </div>

                  {/* Bubble Box */}
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs whitespace-pre-wrap break-words ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60'
                    }`}
                  >
                    {msg.body}
                  </div>
                </div>

                {/* Outgoing Avatar */}
                {isMe && <Avatar name={senderName} className="w-8 h-8 text-[10px] mb-1" />}

              </div>
            </React.Fragment>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* 3. Bottom Message Input Box */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        {sendError && (
          <p role="alert" className="mb-2 text-xs font-medium text-red-600">{sendError}</p>
        )}
        <form onSubmit={handleSend} className="border border-slate-200 rounded-2xl p-3 bg-white shadow-2xs space-y-3">
          <textarea
            rows="2"
            placeholder="Write a message..."
            value={inputText}
            maxLength={5000}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none resize-none bg-transparent px-1"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            {/* Quick Action */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => send('👍')}
                disabled={sending}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 transition-colors disabled:opacity-60"
                title="Send Thumbs Up"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={sending || !inputText.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all disabled:opacity-60"
            >
              <span>{sending ? 'Sending…' : 'Send'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
