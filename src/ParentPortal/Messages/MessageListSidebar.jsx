import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { initials } from './messagesData';

// items: people you can talk to (see buildItems). selectedId is the open conversation's user id.
export default function MessageListSidebar({ items = [], selectedId, onSelectMessage, loading, error, onRetry }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter messages based on search input
  const query = searchQuery.toLowerCase();
  const filteredMessages = items.filter(
    (msg) =>
      msg.name.toLowerCase().includes(query) ||
      msg.preview.toLowerCase().includes(query) ||
      msg.role.toLowerCase().includes(query)
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
        {error ? (
          <div className="p-6 text-center text-xs text-red-600">
            <p>{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-50"
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading messages…</div>
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((item) => {
            const isSelected = selectedId === item.userId;

            return (
              <button
                type="button"
                key={item.userId}
                onClick={() => onSelectMessage?.(item)}
                aria-current={isSelected}
                className={`w-full text-left p-4 flex items-start gap-3.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-blue-50/70 border-l-4 border-blue-600'
                    : 'bg-white hover:bg-slate-50/60 border-l-4 border-transparent'
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <span
                    aria-hidden="true"
                    className="flex w-11 h-11 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 border border-slate-200 shadow-2xs"
                  >
                    {initials(item.name)}
                  </span>
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

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className={`text-[11px] truncate ${item.unread ? 'font-semibold text-slate-700' : 'text-slate-400'}`}>
                      {item.preview}
                    </p>
                    {item.unread > 0 && (
                      <span
                        aria-label={`${item.unread} unread`}
                        className="shrink-0 min-w-[18px] rounded-full bg-blue-600 px-1.5 py-0.5 text-center text-[10px] font-bold text-white"
                      >
                        {item.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            {items.length === 0
              ? "There's nobody to message yet. Tutors appear here once your child has one."
              : 'No messages found.'}
          </div>
        )}
      </div>

    </div>
  );
}
