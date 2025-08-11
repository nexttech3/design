import React from 'react';
import { SparklesIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-indigo-600 py-3 px-6 shadow-lg w-full z-30">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                {/* NAVEGAÇÃO ENTRE SOLUÇÕES */}
                <a href="#" className="text-white hover:text-gray-200 p-2"><ChevronLeftIcon className="w-5 h-5"/></a>
                 <div className="flex items-center gap-2">
                    <SparklesIcon className="w-7 h-7 text-white" />
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Arquiteto de Interiores IA</h1>
                </div>
                <a href="#" className="text-white p-2"><ChevronRightIcon className="w-5 h-5"/></a>
            </div>
            <div className="flex items-center gap-4">
                {/* Language Toggle Switch */}
                <div className="flex items-center">
                    <span className="text-xs font-medium text-white mr-2">PT</span>
                    <input type="checkbox" id="langToggle" className="hidden" />
                    <label htmlFor="langToggle" className="lang-toggle-label">
                        <div className="ball"></div>
                    </label>
                    <span className="text-xs font-medium text-white ml-2">EN</span>
                </div>
                <button id="getStartedBtn" className="px-5 py-2 text-sm text-indigo-700 bg-white hover:bg-gray-100 rounded-lg shadow-md transition-all duration-200 font-semibold flex items-center">
                  Get Started
                </button>
            </div>
        </div>
    </header>
  );
};