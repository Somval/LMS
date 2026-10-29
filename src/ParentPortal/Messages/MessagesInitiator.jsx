import React, { useState } from 'react';
import SelectChild from '../HomeworkAssignments/SelectChild';
import MessageListSidebar from './MessageListSidebar';
import ChatDetailView from './ChatDetailView';

export default function Message() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [mobileView, setMobileView] = useState('list'); // 'list' or 'chat'

  const handleSelectMessage = (chatItem) => {
    setSelectedChat(chatItem);
    setMobileView('chat');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Child Selector Component Bar */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 md:p-6">
          <SelectChild />
        </div>

        {/* Responsive Messaging Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Sidebar: Display block on mobile when view is 'list', always visible on lg */}
          <div className={`w-full lg:col-span-5 xl:col-span-4 ${mobileView === 'chat' ? 'hidden lg:block' : 'block'}`}>
            <MessageListSidebar onSelectMessage={handleSelectMessage} />
          </div>

          {/* Chat Detail View: Display block on mobile when view is 'chat', always visible on lg */}
          <div className={`w-full lg:col-span-7 xl:col-span-8 ${mobileView === 'list' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Mobile Back Button */}
            <div className="lg:hidden mb-3">
              <button
                onClick={() => setMobileView('list')}
                className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 flex items-center gap-1.5 shadow-2xs"
              >
                ← Back to Messages
              </button>
            </div>

            <ChatDetailView chat={selectedChat ? { ...ChatDetailView.defaultProps?.chat, contact: selectedChat } : undefined} />
          </div>

        </div>

      </div>
    </div>
  );
}