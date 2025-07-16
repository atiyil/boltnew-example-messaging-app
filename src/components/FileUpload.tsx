import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Attachment } from '../types';
import { createFilePreview, formatFileSize } from '../utils/fileUtils';
import AttachmentPreview from './AttachmentPreview';

interface FileUploadProps {
  onFilesSelected: (attachments: Attachment[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.txt']
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<Attachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = async (files: FileList) => {
    const newAttachments: Attachment[] = [];

    for (let i = 0; i < files.length && newAttachments.length < maxFiles; i++) {
      const file = files[i];
      
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is ${formatFileSize(maxFileSize)}.`);
        continue;
      }

      const attachment: Attachment = {
        id: `attachment-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      };

      // Create thumbnail for images
      if (file.type.startsWith('image/')) {
        try {
          attachment.thumbnail = await createFilePreview(file);
        } catch (error) {
          console.warn('Could not create thumbnail for', file.name);
        }
      }

      newAttachments.push(attachment);
    }

    const updatedFiles = [...selectedFiles, ...newAttachments].slice(0, maxFiles);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files) {
      processFiles(files);
    }
  };

  const removeFile = (attachmentId: string) => {
    const updatedFiles = selectedFiles.filter(file => file.id !== attachmentId);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const clearAll = () => {
    setSelectedFiles([]);
    onFilesSelected([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className={`w-8 h-8 mx-auto mb-2 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        <p className="text-sm text-gray-600 mb-1">
          {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-gray-500">
          Max {maxFiles} files, up to {formatFileSize(maxFileSize)} each
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              Selected Files ({selectedFiles.length}/{maxFiles})
            </h4>
            <button
              onClick={clearAll}
              className="text-xs text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedFiles.map((attachment) => (
              <AttachmentPreview
                key={attachment.id}
                attachment={attachment}
                onRemove={() => removeFile(attachment.id)}
                showRemove={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;