
import React from 'react';

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  "Transforme em um estilo escandinavo, com madeira clara e cores neutras.",
  "Adicione um jardim vertical na parede principal.",
  "Mude o sofá para um de couro caramelo e adicione uma luminária de piso industrial.",
  "Crie um ambiente de loft industrial com paredes de tijolo aparente e dutos expostos.",
  "Faça uma decoração minimalista, com poucos móveis e uma paleta de cores monocromática.",
  "Adicione um toque de luxo com detalhes em dourado e um grande espelho ornamentado.",
];

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Sem ideias? Tente um destes:</h3>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};