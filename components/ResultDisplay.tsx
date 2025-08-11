
import React from 'react';
import type { GeneratedImage } from '../types';
import { DownloadIcon } from './Icons';

interface ResultDisplayProps {
  generatedImage: GeneratedImage;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage }) => {
  const imageUrl = `data:${generatedImage.mimeType};base64,${generatedImage.base64}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    const extension = generatedImage.mimeType.split('/')[1] || 'png';
    link.download = `design-ia.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4">
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
        <img src={imageUrl} alt="Generated interior design" className="w-full h-full object-cover" />
      </div>
      
      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 bg-gray-200 hover:bg-gray-300 text-gray-700"
      >
        <DownloadIcon className="w-5 h-5 mr-2" />
        Download da Imagem
      </button>
    </div>
  );
};