import { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Timeout de segurança - força fechar após 5 segundos
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(safetyTimer);
  }, []);

  // Progresso
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 200);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 50%, #1e1b4b 100%)',
      }}
    >
      {/* Castelo SVG Estático */}
      <div className="mb-8">
        <svg width="100" height="100" viewBox="0 0 100 100" className="animate-pulse">
          <defs>
            <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
          {/* Torre central */}
          <path d="M50 10 L55 25 L45 25 Z M45 25 L45 50 L55 50 L55 25" fill="url(#gold)" />
          {/* Torres laterais */}
          <path d="M30 30 L35 40 L25 40 Z M25 40 L25 60 L35 60 L35 40" fill="url(#gold)" />
          <path d="M70 30 L75 40 L65 40 Z M65 40 L65 60 L75 60 L75 40" fill="url(#gold)" />
          {/* Base */}
          <rect x="20" y="60" width="60" height="30" rx="5" fill="url(#gold)" />
          {/* Janelas */}
          <circle cx="35" cy="50" r="3" fill="#0f172a" />
          <circle cx="65" cy="50" r="3" fill="#0f172a" />
          <circle cx="50" cy="40" r="4" fill="#0f172a" />
        </svg>
      </div>

      {/* Texto */}
      <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center px-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
          Bem-vindo ao Reino
        </span>
      </h1>
      <p className="text-white/60 text-sm md:text-lg mb-6">Onde a magia acontece...</p>

      {/* Progress Bar */}
      <div className="w-64 max-w-[80vw]">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-white/60 text-sm mt-2">{progress}%</p>
      </div>

      {/* Botão pular para mobile */}
      <button 
        onClick={() => setIsVisible(false)}
        className="mt-8 px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors"
      >
        Pular intro ✨
      </button>
    </div>
  );
};
