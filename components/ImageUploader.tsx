
import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon, ImageIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImageUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`relative w-full aspect-video border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
        ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
        ${originalImageUrl ? 'border-solid' : ''}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {originalImageUrl ? (
        <img src={originalImageUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <UploadIcon className="w-10 h-10 mb-2" />
          <p className="font-semibold">Clique para carregar ou arraste uma imagem</p>
          <p className="text-xs">PNG, JPG, WEBP</p>
        </div>
      )}
       <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl transition-opacity duration-300 ${originalImageUrl ? 'opacity-0 hover:opacity-100' : 'opacity-0'}`}>
         <div className="text-white text-center">
            <ImageIcon className="w-8 h-8 mx-auto mb-1" />
            <p className="font-bold">Trocar Imagem</p>
         </div>
       </div>
    </div>
  );
};