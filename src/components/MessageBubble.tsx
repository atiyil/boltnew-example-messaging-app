import React from 'react';
import { Message } from '../types';
import { formatMessageTime } from '../utils/timeUtils';
import AttachmentPreview from './AttachmentPreview';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isSent = message.type === 'sent';
  const hasAttachments = message.attachments && message.attachments.length > 0;
  const hasText = message.text.trim().length > 0;

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="max-w-xs lg:max-w-md space-y-2">
        {/* Attachments */}
        {hasAttachments && (
          <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
            <div className="space-y-2">
              {message.attachments!.map((attachment) => (
                <AttachmentPreview
                  key={attachment.id}
                  attachment={attachment}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Text Message */}
        {hasText && (
          <div
            className={`px-4 py-2 rounded-2xl ${
              isSent
                ? 'bg-blue-500 text-white rounded-br-sm'
                : 'bg-gray-200 text-gray-900 rounded-bl-sm'
            } shadow-sm`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        )}
        
        {/* Timestamp */}
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
          <p className="text-xs text-gray-500 px-1">
            {formatMessageTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;