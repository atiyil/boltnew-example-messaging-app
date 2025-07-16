import React, { useState } from 'react';
import { Send, Paperclip, Smile, X } from 'lucide-react';
import { Attachment } from '../types';
import FileUpload from './FileUpload';

interface MessageInputProps {
  onSendMessage: (text: string, attachments?: Attachment[]) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage('');
      setAttachments([]);
      setShowFileUpload(false);
    }
  };

  const handleFilesSelected = (selectedFiles: Attachment[]) => {
    setAttachments(selectedFiles);
  };

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* File Upload Panel */}
      {showFileUpload && (
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Add Attachments</h3>
            <button
              onClick={toggleFileUpload}
              className="p-1 text-gray-500 hover:text-gray-700 rounded transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <FileUpload onFilesSelected={handleFilesSelected} />
        </div>
      )}

      {/* Message Input */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <button
            type="button"
            onClick={toggleFileUpload}
            className={`p-2 rounded-full transition-all duration-200 ${
              showFileUpload || attachments.length > 0
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 space-y-2">
            {/* Attachment Count Indicator */}
            {attachments.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {attachments.length} file{attachments.length > 1 ? 's' : ''} selected
                </span>
              </div>
            )}
            
            {/* Text Input */}
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 rounded-full transition-colors duration-200"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim() && attachments.length === 0}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;