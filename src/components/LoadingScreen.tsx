import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Crown, Cloud, Moon, Sun, Wand2, Heart } from 'lucide-react';

// Componente de partículas suaves - sem usar window.innerHeight
const SoftParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      size: 2 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-yellow-300"
          style={{
            left: `${p.x}%`,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            boxShadow: '0 0 8px rgba(255,215,0,0.6)',
          }}
          animate={{
            y: [0, -900],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Estrelas de fundo
const BackgroundStars = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,215,0,0.6)`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Timeout de segurança
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Progresso
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 300);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[99999] bg-gradient-to-b from-[#1e1b4b] to-[#0f172a]" />
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 30%, #1e1b4b 70%, #0f172a 100%)',
          }}
        >
          {/* Estrelas de fundo */}
          <BackgroundStars />
          
          {/* Partículas suaves */}
          <SoftParticles />

          {/* Orbs gradientes */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Conteúdo principal */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            
            {/* Castelo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-6"
            >
              <motion.div
                className="relative w-24 h-24 md:w-32 md:h-32"
                animate={{
                  filter: [
                    'drop-shadow(0 0 15px rgba(255,215,0,0.3))',
                    'drop-shadow(0 0 30px rgba(255,215,0,0.5))',
                    'drop-shadow(0 0 15px rgba(255,215,0,0.3))',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="castleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                  <path d="M50 10 L55 25 L45 25 Z M45 25 L45 50 L55 50 L55 25" fill="url(#castleGrad)" />
                  <path d="M30 30 L35 40 L25 40 Z M25 40 L25 60 L35 60 L35 40" fill="url(#castleGrad)" />
                  <path d="M70 30 L75 40 L65 40 Z M65 40 L65 60 L75 60 L75 40" fill="url(#castleGrad)" />
                  <rect x="20" y="60" width="60" height="30" rx="5" fill="url(#castleGrad)" />
                  <circle cx="35" cy="50" r="3" fill="#0f172a" />
                  <circle cx="65" cy="50" r="3" fill="#0f172a" />
                  <circle cx="50" cy="40" r="4" fill="#0f172a" />
                </svg>

                {/* Sparkles ao redor */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2"
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </motion.div>

              {/* Nuvens */}
              <motion.div
                className="absolute -left-10 top-1/2 opacity-20"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Cloud className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mb-6"
            >
              <motion.div 
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400/50" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="w-4 h-4 text-yellow-400" />
                </motion.div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400/50" />
              </motion.div>

              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300">
                  Bem-vindo ao Reino
                </span>
              </h1>
              <p className="text-white/60 text-sm md:text-base">Onde a magia acontece...</p>

              <motion.p
                className="text-yellow-400/80 text-xs mt-3 h-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {progress < 30 && "✨ Acendendo as estrelas..."}
                {progress >= 30 && progress < 60 && "🏰 Construindo o castelo..."}
                {progress >= 60 && progress < 85 && "🪄 Preparando a varinha..."}
                {progress >= 85 && "⭐ Quase lá..."}
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 240 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative"
            >
              <div className="h-2 bg-white/10 rounded-full overflow-hidden w-60 max-w-[70vw]">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <motion.div
                className="absolute left-0 -top-1"
                animate={{ x: `${progress * 2.4}px` }}
                transition={{ duration: 0.1 }}
              >
                <Wand2 className="w-4 h-4 text-yellow-300 -rotate-45" />
              </motion.div>

              <p className="text-center text-white/60 text-xs mt-3">{Math.round(progress)}%</p>
            </motion.div>

            {/* Botão pular */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={() => setIsVisible(false)}
              className="mt-8 px-4 py-2 rounded-full bg-white/10 text-white/60 text-xs hover:bg-white/20 hover:text-white transition-all"
            >
              Pular intro ✨
            </motion.button>
          </div>

          {/* Decoração inferior */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Moon className="w-4 h-4 text-purple-300/50" />
            </motion.div>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Heart className="w-3 h-3 text-pink-400/50" />
            </motion.div>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
              <Sun className="w-4 h-4 text-yellow-300/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
