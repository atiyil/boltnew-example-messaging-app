import React, { useState } from 'react';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { conversations as initialConversations, currentUser } from './data/mockData';
import { Conversation, Message, Attachment } from './types';

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    
    // Mark conversation as read
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (text: string, attachments?: Attachment[]) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      timestamp: new Date(),
      senderId: currentUser.id,
      type: 'sent',
      attachments,
    };

    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage,
            }
          : conv
      )
    );
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <ConversationList
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />
      <ChatWindow
        conversation={selectedConversation || null}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;