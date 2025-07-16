import React from 'react';
import { X, Download, Eye } from 'lucide-react';
import { Attachment } from '../types';
import { formatFileSize, getFileIcon, isImageFile } from '../utils/fileUtils';

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemove?: () => void;
  showRemove?: boolean;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ 
  attachment, 
  onRemove, 
  showRemove = false 
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    window.open(attachment.url, '_blank');
  };

  if (isImageFile(attachment.type)) {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <img
            src={attachment.thumbnail || attachment.url}
            alt={attachment.name}
            className="w-48 h-32 object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              <button
                onClick={handleView}
                className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200"
              >
                <Eye className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        {showRemove && onRemove && (
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
          >
            <X className="w-3 h-3" />
          </button>
        )}
        <p className="text-xs text-gray-600 mt-1 truncate">{attachment.name}</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 max-w-xs">
        <div className="text-2xl">{getFileIcon(attachment.type)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={handleDownload}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-all duration-200"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      {showRemove && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default AttachmentPreview;