export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  thumbnail?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  senderId: string;
  type: 'sent' | 'received';
  attachments?: Attachment[];
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: Message;
  unreadCount: number;
  messages: Message[];
}