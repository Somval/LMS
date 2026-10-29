import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Default mock JSON data structured for API integration
const defaultMessages = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Tutor • Mathematics',
    preview: 'Olivia has been doing really well with...',
    time: '2:30 PM',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Tutor • Mathematics',
    preview: 'Olivia has been doing really well with...',
    time: '2:35 PM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Tutor • Mathematics',
    preview: 'Olivia has been doing really well with...',
    time: '2:35 PM',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    role: 'Tutor • Mathematics',
    preview: 'Olivia has been doing really well with...',
    time: '2:35 PM',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

export default function MessageListSidebar({ messages = defaultMessages, onSelectMessage }) {
  const [selectedId, setSelectedId] = useState(messages[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter messages based on search input
  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden font-sans flex flex-col h-[600px]">
      
      {/* Top Search Bar Container */}
      <div className="p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Message Items List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((item) => {
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  if (onSelectMessage) onSelectMessage(item);
                }}
                className={`p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                  isSelected 
                    ? 'bg-blue-50/70 border-l-4 border-blue-600' 
                    : 'bg-white hover:bg-slate-50/60 border-l-4 border-transparent'
                }`}
              >
                {/* Avatar Image */}
                <div className="relative shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-2xs"
                  />
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-medium text-slate-400 shrink-0">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                    {item.role}
                  </p>

                  <p className="text-[11px] text-slate-400 truncate mt-1">
                    {item.preview}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            No messages found.
          </div>
        )}
      </div>

    </div>
  );
}