
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { MagicWandIcon } from './components/Icons';
import { createImagePrompt, generateImage } from './services/geminiService';
import type { GeneratedImage } from './types';
import { ExamplePrompts } from './components/ExamplePrompts';


export default function App() {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setGeneratedImage(null);
    setError(null);
  };
  
  const handleGenerateClick = useCallback(async () => {
    if (!originalImageFile || !userPrompt) {
      setError("Por favor, carregue uma imagem e descreva a sua ideia.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const newPrompt = await createImagePrompt(originalImageFile, userPrompt);
      const image = await generateImage(originalImageFile, newPrompt);
      setGeneratedImage(image);
      
    } catch (e) {
      console.error(e);
      setError("Ocorreu um erro ao gerar a imagem. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImageFile, userPrompt]);

  const isButtonDisabled = !originalImageFile || !userPrompt.trim() || isLoading;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Column */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-1">1. Carregue uma foto do seu cômodo</h2>
              <p className="text-gray-600 mb-4 text-sm">Escolha uma imagem nítida e bem iluminada.</p>
              <ImageUploader onImageUpload={handleImageUpload} originalImageUrl={originalImageUrl} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-1">2. Descreva sua ideia</h2>
              <p className="text-gray-600 mb-4 text-sm">Seja específico! Ex: "Adicione um sofá de veludo azul, troque o piso por madeira clara e adicione plantas."</p>
              <PromptInput value={userPrompt} onChange={setUserPrompt} />
              <ExamplePrompts onSelectPrompt={setUserPrompt} />
            </div>

            <button
              onClick={handleGenerateClick}
              disabled={isButtonDisabled}
              className={`w-full flex items-center justify-center text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out
                ${isButtonDisabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'}`}
            >
              <MagicWandIcon className="w-6 h-6 mr-3" />
              {isLoading ? 'Gerando sua nova decoração...' : 'Transformar Meu Espaço'}
            </button>
          </div>

          {/* Output Column */}
          <div className="flex flex-col">
             <div className="bg-white p-6 rounded-2xl shadow-lg h-full border border-gray-200 flex flex-col justify-start items-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4 self-start">Resultado da Transformação</h2>
                {isLoading ? (
                    <div className="flex-grow flex items-center justify-center">
                      <Loader />
                    </div>
                ) : error ? (
                    <div className="flex-grow flex items-center justify-center text-center text-red-600 p-4 bg-red-50 rounded-lg">
                        <div>
                            <h3 className="font-bold">Oops! Algo deu errado.</h3>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                ) : generatedImage ? (
                    <ResultDisplay generatedImage={generatedImage} />
                ) : (
                    <div className="flex-grow flex items-center justify-center text-center text-gray-500">
                        <div>
                          <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <MagicWandIcon className="w-10 h-10 text-gray-400" />
                          </div>
                          <p className="font-medium">Seu novo design aparecerá aqui.</p>
                          <p className="text-sm">Siga os passos ao lado para começar.</p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}