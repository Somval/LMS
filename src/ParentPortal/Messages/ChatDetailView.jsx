import React, { useState } from 'react';
import { Send, ThumbsUp, Paperclip } from 'lucide-react';

// Default mock JSON data structured for API integration
const defaultChatData = {
  contact: {
    name: 'Sarah Johnson',
    role: 'Tutor • Mathematics',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  messages: [
    {
      id: 1,
      sender: 'Sarah Johnson',
      role: 'tutor',
      text: 'Hello Mrs. Mary, I want to share a quick update about Olivia\'s Mathematics progress.',
      time: '2:30 PM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      dateSeparator: '09:52 YESTERDAY'
    },
    {
      id: 2,
      sender: 'Mary Johnson',
      role: 'parent',
      text: 'Thank you! Is there anything you recommend she focuses on this week?',
      time: '2:35 PM',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    }
  ]
};

export default function ChatDetailView({ chat = defaultChatData, onSendMessage }) {
  const [messages, setMessages] = useState(chat.messages);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'Mary Johnson',
      role: 'parent',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    if (onSendMessage) onSendMessage(newMessage);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xs border border-slate-200/80 font-sans flex flex-col h-[650px] overflow-hidden">
      
      {/* 1. Top Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4 bg-white shrink-0">
        <img
          src={chat.contact.avatar}
          alt={chat.contact.name}
          className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-2xs"
        />
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            {chat.contact.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {chat.contact.role}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium text-emerald-600">
              {chat.contact.status}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Messages Stream Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        
        {messages.map((msg, index) => {
          const isMe = msg.role === 'parent';

          return (
            <React.Fragment key={msg.id}>
              {/* Optional Date Separator */}
              {msg.dateSeparator && (
                <div className="flex justify-center my-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {msg.dateSeparator}
                  </span>
                </div>
              )}

              <div className={`flex items-end gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                
                {/* Incoming Avatar */}
                {!isMe && (
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 mb-1"
                  />
                )}

                {/* Message Bubble Container */}
                <div className={`max-w-md space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                  
                  {/* Sender Name & Time */}
                  <div className={`flex items-center gap-2 text-[11px] text-slate-400 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <span className="font-semibold text-slate-700">{msg.sender}</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>

                  {/* Bubble Box */}
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Outgoing Avatar */}
                {isMe && (
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 mb-1"
                  />
                )}

              </div>
            </React.Fragment>
          );
        })}

      </div>

      {/* 3. Bottom Message Input Box */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <form onSubmit={handleSend} className="border border-slate-200 rounded-2xl p-3 bg-white shadow-2xs space-y-3">
          <textarea
            rows="2"
            placeholder="Write a message..."
            value={inputText}
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
            {/* Quick Actions / Attachments */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 transition-colors"
                title="Send Thumbs Up"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 transition-colors"
                title="Attach File"
              >
                <Paperclip className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}