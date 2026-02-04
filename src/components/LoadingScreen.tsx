import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Star, Wand2, Crown, Heart, Cloud, Moon, Sun } from 'lucide-react';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Animação de progresso
    const duration = 4000; // 4 segundos de loading
    const interval = 40;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Gerar estrelas aleatórias
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  // Partículas de poeira mágica
  const dust = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 30%, #1e1b4b 70%, #0f172a 100%)',
          }}
        >
          {/* Background Stars */}
          <div className="absolute inset-0">
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

          {/* Magic Dust Particles */}
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
                animate={{
                  y: [0, -window.innerHeight - 100],
                  x: [0, (Math.random() - 0.5) * 100],
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
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
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
          <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* Castle Silhouette */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mb-8"
            >
              {/* Castle Icon */}
              <motion.div
                className="relative w-32 h-32 md:w-40 md:h-40"
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
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  {/* Side Towers */}
                  <motion.path
                    d="M30 30 L35 40 L25 40 Z M25 40 L25 60 L35 60 L35 40"
                    fill="url(#castleGrad)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
                  <motion.path
                    d="M70 30 L75 40 L65 40 Z M65 40 L65 60 L75 60 L75 40"
                    fill="url(#castleGrad)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
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
                    transition={{ duration: 1, delay: 1.2 }}
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
                    transition={{ delay: 1.5 }}
                  />
                </svg>

                {/* Sparkles around castle */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2"
                  animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </motion.div>

              {/* Floating Clouds */}
              <motion.div
                className="absolute -left-16 top-1/2 opacity-30"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Cloud className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div
                className="absolute -right-16 top-1/3 opacity-20"
                animate={{ x: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <Cloud className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center mb-8"
            >
              {/* Decorative line with stars */}
              <motion.div 
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/50" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Crown className="w-5 h-5 text-yellow-400" />
                </motion.div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/50" />
              </motion.div>

              <motion.h1
                className="font-display text-3xl md:text-5xl font-bold mb-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300">
                  Bem-vindo ao Reino
                </span>
              </motion.h1>

              <motion.p
                className="text-white/60 text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Onde a magia acontece...
              </motion.p>

              {/* Magical phrase that changes */}
              <motion.div
                className="mt-4 h-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <motion.p
                  key={Math.floor(progress / 25)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-yellow-400/80 text-sm"
                >
                  {progress < 25 && "✨ Acendendo as estrelas..."}
                  {progress >= 25 && progress < 50 && "🏰 Construindo o castelo..."}
                  {progress >= 50 && progress < 75 && "🪄 Preparando a varinha mágica..."}
                  {progress >= 75 && "⭐ Quase lá..."}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '280px' }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative"
            >
              {/* Background track */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Progress fill with gradient */}
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Progress percentage */}
              <motion.div
                className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/60 text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {Math.round(progress)}%
              </motion.div>

              {/* Decorative elements on bar */}
              <motion.div
                className="absolute left-0 -top-1"
                animate={{ x: `${progress * 2.5}px` }}
                transition={{ duration: 0.3 }}
              >
                <Wand2 className="w-4 h-4 text-yellow-300 -rotate-45" />
              </motion.div>
            </motion.div>

            {/* Bottom decoration */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Moon className="w-5 h-5 text-purple-300/50" />
              </motion.div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-pink-400/50" />
              </motion.div>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Sun className="w-5 h-5 text-yellow-300/50" />
              </motion.div>
            </motion.div>
          </div>

          {/* Exit sparkle burst */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#FFD700' : '#FF69B4',
                  left: '50%',
                  top: '50%',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? '#FFD700' : '#FF69B4'}`,
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 800],
                  y: [0, (Math.random() - 0.5) * 800],
                  scale: [1, 0],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
