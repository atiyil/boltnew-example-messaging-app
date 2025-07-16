import { Conversation, User, Message } from '../types';

export const currentUser: User = {
  id: 'current-user',
  name: 'You',
  isOnline: true,
};

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: '3',
    name: 'Emma Davis',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Alex Thompson',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    isOnline: true,
  },
];

const createMessage = (id: string, text: string, senderId: string, minutesAgo: number): Message => ({
  id,
  text,
  timestamp: new Date(Date.now() - minutesAgo * 60 * 1000),
  senderId,
  type: senderId === currentUser.id ? 'sent' : 'received',
});

const createMessageWithAttachments = (
  id: string, 
  text: string, 
  senderId: string, 
  minutesAgo: number,
  attachments?: any[]
): Message => ({
  id,
  text,
  timestamp: new Date(Date.now() - minutesAgo * 60 * 1000),
  senderId,
  type: senderId === currentUser.id ? 'sent' : 'received',
  attachments,
});

export const conversations: Conversation[] = [
  {
    id: '1',
    user: users[0],
    unreadCount: 2,
    lastMessage: createMessage('msg1', 'Hey! How are you doing?', users[0].id, 5),
    messages: [
      createMessage('msg1-1', 'Hi there! 👋', users[0].id, 120),
      createMessage('msg1-2', 'Hey Sarah! I\'m doing great, thanks for asking', currentUser.id, 118),
      createMessage('msg1-3', 'That\'s wonderful to hear!', users[0].id, 115),
      createMessage('msg1-4', 'I wanted to ask you about the project we discussed', users[0].id, 110),
      createMessage('msg1-5', 'Sure, what would you like to know?', currentUser.id, 108),
      createMessage('msg1-6', 'When do you think we can start working on it?', users[0].id, 105),
      createMessage('msg1-7', 'I think we can begin next week. I\'ll have more time then', currentUser.id, 102),
      createMessage('msg1-8', 'Perfect! I\'ll prepare the initial documents', users[0].id, 100),
      createMessageWithAttachments('msg1-9', 'Here are some reference images for the project', users[0].id, 98, [
        {
          id: 'att1',
          name: 'project-mockup.jpg',
          size: 2048576,
          type: 'image/jpeg',
          url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
          thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]),
      createMessage('msg1-10', 'Hey! How are you doing?', users[0].id, 5),
    ],
  },
  {
    id: '2',
    user: users[1],
    unreadCount: 0,
    lastMessage: createMessage('msg2', 'Thanks for the help earlier!', currentUser.id, 25),
    messages: [
      createMessage('msg2-1', 'Could you help me with the presentation?', users[1].id, 60),
      createMessage('msg2-2', 'Of course! What do you need help with?', currentUser.id, 58),
      createMessage('msg2-3', 'I\'m struggling with the design slides', users[1].id, 55),
      createMessageWithAttachments('msg2-4', 'Here are some design templates you can use', currentUser.id, 53, [
        {
          id: 'att2',
          name: 'design-templates.pdf',
          size: 5242880,
          type: 'application/pdf',
          url: '#'
        },
        {
          id: 'att3',
          name: 'color-palette.png',
          size: 1024000,
          type: 'image/png',
          url: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=800',
          thumbnail: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]),
      createMessage('msg2-5', 'That would be amazing! 🙏', users[1].id, 50),
      createMessage('msg2-6', 'Thanks for the help earlier!', currentUser.id, 25),
    ],
  },
  {
    id: '3',
    user: users[2],
    unreadCount: 1,
    lastMessage: createMessage('msg3', 'Let\'s meet for coffee tomorrow?', users[2].id, 10),
    messages: [
      createMessage('msg3-1', 'Good morning! ☀️', users[2].id, 480),
      createMessage('msg3-2', 'Good morning Emma! How\'s your day going?', currentUser.id, 478),
      createMessage('msg3-3', 'It\'s been pretty good so far, thanks!', users[2].id, 475),
      createMessage('msg3-4', 'I finished the report you asked for', users[2].id, 470),
      createMessage('msg3-5', 'That\'s fantastic! You\'re so efficient', currentUser.id, 468),
      createMessage('msg3-6', 'Let\'s meet for coffee tomorrow?', users[2].id, 10),
    ],
  },
  {
    id: '4',
    user: users[3],
    unreadCount: 0,
    lastMessage: createMessage('msg4', 'See you at the meeting!', currentUser.id, 180),
    messages: [
      createMessage('msg4-1', 'Don\'t forget about the meeting at 3 PM', users[3].id, 240),
      createMessage('msg4-2', 'Thanks for the reminder! I\'ll be there', currentUser.id, 238),
      createMessage('msg4-3', 'Great! I\'ll share the agenda beforehand', users[3].id, 235),
      createMessage('msg4-4', 'Perfect, that will help me prepare', currentUser.id, 233),
      createMessage('msg4-5', 'See you at the meeting!', currentUser.id, 180),
    ],
  },
  {
    id: '5',
    user: users[4],
    unreadCount: 0,
    lastMessage: createMessage('msg5', 'Have a great weekend!', users[4].id, 1440),
    messages: [
      createMessage('msg5-1', 'Hope you have a wonderful weekend!', users[4].id, 1440),
      createMessage('msg5-2', 'Thank you! You too 😊', currentUser.id, 1438),
      createMessage('msg5-3', 'Any fun plans?', users[4].id, 1435),
      createMessage('msg5-4', 'Going hiking with some friends. You?', currentUser.id, 1433),
      createMessage('msg5-5', 'That sounds amazing! I\'ll be reading and relaxing', users[4].id, 1430),
      createMessage('msg5-6', 'Have a great weekend!', users[4].id, 1440),
    ],
  },
];