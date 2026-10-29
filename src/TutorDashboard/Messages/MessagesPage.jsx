
import React, { useState } from "react";
import ConversationSidebar from "../../components/Tutor/ConversationSidebar";
import ChatPanel from "./ChatPanel";

const initialConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    student: "Olivia Parent",
    course: "Mathematics Year 1",
    preview: "Hi, I'm trying to work out about Olivia's progress in Mathematics.",
    time: "2:23 PM",
    avatarColor: "bg-[#D8E4F4]",
    unread: 0,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    student: "Olivia Parent",
    course: "English Year 1",
    preview: "Could you share the latest update?",
    time: "2:15 PM",
    avatarColor: "bg-[#F3D8C8]",
    unread: 1,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    student: "Olivia Parent",
    course: "Science Year 1",
    preview: "Thank you for the explanation.",
    time: "1:45 PM",
    avatarColor: "bg-[#D8E9DF]",
    unread: 0,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    student: "Olivia Parent",
    course: "Mathematics Year 1",
    preview: "Olivia has been enjoying the recent lessons.",
    time: "Yesterday",
    avatarColor: "bg-[#E7DDF6]",
    unread: 0,
  },
];

const initialMessages = {
  1: [
    {
      id: 101,
      sender: "parent",
      text: "Hi Ms. Johnson, I wanted to ask about Olivia's progress in Mathematics.",
      time: "2:20 PM",
    },
    {
      id: 102,
      sender: "me",
      text: "Mary Johnson: Hi Sarah, Olivia has been improving. We are working on building her confidence with the recent topics.",
      time: "2:25 PM",
    },
  ],
  2: [
    {
      id: 201,
      sender: "parent",
      text: "Could you share the latest update on Olivia's English lessons?",
      time: "2:15 PM",
    },
  ],
  3: [
    {
      id: 301,
      sender: "parent",
      text: "Thank you for the explanation. That was very helpful.",
      time: "1:45 PM",
    },
  ],
  4: [
    {
      id: 401,
      sender: "parent",
      text: "Olivia has been enjoying the recent lessons. Thank you!",
      time: "Yesterday",
    },
  ],
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState(
    initialConversations
  );

  const [selectedId, setSelectedId] = useState(1);

  const [messagesByConversation, setMessagesByConversation] =
    useState(initialMessages);

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedId
  );

  const selectedMessages = messagesByConversation[selectedId] || [];

  function handleSelectConversation(id) {
    setSelectedId(id);

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id
          ? { ...conversation, unread: 0 }
          : conversation
      )
    );
  }

  function handleSendMessage(conversationId, text) {
    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      sender: "me",
      text,
      time,
    };

    setMessagesByConversation((previous) => ({
      ...previous,
      [conversationId]: [
        ...(previous[conversationId] || []),
        newMessage,
      ],
    }));

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              preview: text,
              time,
            }
          : conversation
      )
    );
  }

  return (
    <main className="h-[calc(100dvh-64px)] min-h-[420px] w-full bg-[#F4F7FD] p-[9px] sm:p-[12px]">
      <div className="mx-auto grid h-full min-h-0 w-full max-w-[1200px] grid-cols-1 gap-[5px] md:grid-cols-[125px_minmax(0,1fr)] lg:grid-cols-[350px_minmax(0,1fr)]">
        {/* Left side */}
        <ConversationSidebar
          conversations={conversations}
          selectedId={selectedId}
          onSelect={handleSelectConversation}
        />

        {/* Right side */}
        <ChatPanel
          conversation={selectedConversation}
          messages={selectedMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </main>
  );
}
