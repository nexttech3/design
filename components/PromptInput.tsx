
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ex: faça as paredes serem azul marinho, adicione uma lareira de tijolos e um tapete persa..."
      className="w-full h-32 p-4 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none placeholder:text-gray-400"
    />
  );
};