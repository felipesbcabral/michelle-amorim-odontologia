import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Star, Wand2, Crown, Heart, Cloud, Moon, Sun } from 'lucide-react';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Marca quando o componente está montado (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Timeout de segurança para garantir que o loading termine
  useEffect(() => {
    // Força o fim do loading após 6 segundos (independentemente do progresso)
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(safetyTimeout);
  }, []);

  // Controle do progresso e overflow
  useEffect(() => {
    if (!isMounted) return;

    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Animação de progresso - mais rápida no mobile
    const duration = 3500; // 3.5 segundos
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [isLoading, isMounted]);

  // Gerar estrelas aleatórias - memoizado para evitar re-render
  const stars = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    })),
  []);

  // Altura fixa para mobile (evita problemas com window.innerHeight)
  const PARTICLE_TRAVEL_DISTANCE = 800;

  // Partículas de poeira mágica - memoizado
  const dust = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
      xOffset: (Math.random() - 0.5) * 100,
    })),
  []);

  // Não renderiza nada até estar montado (evita hydration mismatch)
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[99999] bg-gradient-to-b from-[#1e1b4b] to-[#0f172a]" />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden touch-none"
          style={{
            background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 30%, #1e1b4b 70%, #0f172a 100%)',
          }}
        >
          {/* Background Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  background: 'white',
                  boxShadow: `0 0 ${star.size * 2}px rgba(255,215,0,0.8)`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1],
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

          {/* Magic Dust Particles - usando valor fixo em vez de window.innerHeight */}
          <div className="absolute inset-0 pointer-events-none">
            {dust.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 rounded-full bg-yellow-300"
                style={{
                  left: `${particle.x}%`,
                  bottom: '-10px',
                  boxShadow: '0 0 6px rgba(255,215,0,0.8)',
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [-PARTICLE_TRAVEL_DISTANCE],
                  x: [0, particle.xOffset],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            
            {/* Castle Silhouette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-6 md:mb-8"
            >
              {/* Castle Icon */}
              <motion.div
                className="relative w-24 h-24 md:w-40 md:h-40"
                animate={{
                  filter: [
                    'drop-shadow(0 0 20px rgba(255,215,0,0.3))',
                    'drop-shadow(0 0 40px rgba(255,215,0,0.6))',
                    'drop-shadow(0 0 20px rgba(255,215,0,0.3))',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Castle Shape */}
                  <defs>
                    <linearGradient id="castleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA500" />
                    </linearGradient>
                  </defs>
                  {/* Main Tower */}
                  <motion.path
                    d="M50 10 L55 25 L45 25 Z M45 25 L45 50 L55 50 L55 25"
                    fill="url(#castleGrad)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                  {/* Side Towers */}
                  <motion.path
                    d="M30 30 L35 40 L25 40 Z M25 40 L25 60 L35 60 L35 40"
                    fill="url(#castleGrad)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.path
                    d="M70 30 L75 40 L65 40 Z M65 40 L65 60 L75 60 L75 40"
                    fill="url(#castleGrad)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  {/* Base */}
                  <motion.rect
                    x="20"
                    y="60"
                    width="60"
                    height="30"
                    rx="5"
                    fill="url(#castleGrad)"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{ transformOrigin: 'bottom' }}
                  />
                  {/* Windows */}
                  <circle cx="35" cy="50" r="3" fill="#1e1b4b" />
                  <circle cx="65" cy="50" r="3" fill="#1e1b4b" />
                  <circle cx="50" cy="40" r="4" fill="#1e1b4b" />
                  {/* Door */}
                  <motion.path
                    d="M45 90 Q50 80 55 90 L55 90 L45 90"
                    fill="#1e1b4b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </svg>

                {/* Sparkles around castle */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2"
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                </motion.div>
              </motion.div>

              {/* Floating Clouds */}
              <motion.div
                className="absolute -left-12 top-1/2 opacity-30"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Cloud className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </motion.div>
              <motion.div
                className="absolute -right-12 top-1/3 opacity-20"
                animate={{ x: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Cloud className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mb-6 md:mb-8"
            >
              {/* Decorative line with stars */}
              <motion.div 
                className="flex items-center justify-center gap-3 mb-4 md:mb-6"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-yellow-400/50" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                </motion.div>
                <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-yellow-400/50" />
              </motion.div>

              <motion.h1
                className="font-display text-2xl md:text-5xl font-bold mb-2 md:mb-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300">
                  Bem-vindo ao Reino
                </span>
              </motion.h1>

              <motion.p
                className="text-white/60 text-sm md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Onde a magia acontece...
              </motion.p>

              {/* Magical phrase that changes */}
              <motion.div
                className="mt-3 md:mt-4 h-5 md:h-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <p className="text-yellow-400/80 text-xs md:text-sm">
                  {progress < 25 && "✨ Acendendo as estrelas..."}
                  {progress >= 25 && progress < 50 && "🏰 Construindo o castelo..."}
                  {progress >= 50 && progress < 75 && "🪄 Preparando a varinha mágica..."}
                  {progress >= 75 && "⭐ Quase lá..."}
                </p>
              </motion.div>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '240px' }}
              transition={{ delay: 1, duration: 0.6 }}
              className="relative max-w-[70vw]"
            >
              {/* Background track */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Progress fill with gradient */}
                <motion.div
                  className="h-full rounded-full relative overflow-hidden transition-all duration-100"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>

              {/* Progress percentage */}
              <motion.div
                className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/60 text-xs md:text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {Math.round(progress)}%
              </motion.div>

              {/* Decorative wand on bar */}
              <motion.div
                className="absolute left-0 -top-1"
                animate={{ x: `${progress * 2.15}px` }}
                transition={{ duration: 0.1 }}
              >
                <Wand2 className="w-3 h-3 md:w-4 md:h-4 text-yellow-300 -rotate-45" />
              </motion.div>
            </motion.div>

            {/* Bottom decoration */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-purple-300/50" />
              </motion.div>
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-400/50" />
              </motion.div>
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-300/50" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
