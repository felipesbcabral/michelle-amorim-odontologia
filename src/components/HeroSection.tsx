import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Star, ArrowRight, Castle, Crown, Wand2, Heart } from 'lucide-react';
import { MagicButton } from './MagicButton';
import { MagicSparkles } from './MagicSparkles';

interface HeroSectionProps {
  onAgendarClick?: () => void;
}

// Ícones Disney flutuantes para o background
const disneyIcons = [
  { Icon: Castle, x: '10%', y: '20%', delay: 0, size: 40 },
  { Icon: Crown, x: '85%', y: '15%', delay: 1, size: 30 },
  { Icon: Sparkles, x: '75%', y: '60%', delay: 2, size: 25 },
  { Icon: Wand2, x: '15%', y: '70%', delay: 1.5, size: 35 },
  { Icon: Heart, x: '90%', y: '80%', delay: 0.5, size: 20 },
  { Icon: Star, x: '5%', y: '45%', delay: 2.5, size: 20 },
];

export const HeroSection = ({ onAgendarClick }: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 md:py-0"
    >
      {/* Magic Sparkles Rain - Subtle magical effect */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <MagicSparkles density="low" colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#DDA0DD']} />
      </div>

      {/* Background Icons - Hidden on small mobile */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {disneyIcons.map(({ Icon, x, y, delay, size }, index) => (
          <motion.div
            key={index}
            className="absolute text-white/[0.08]"
            style={{ left: x, top: y }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 6 + index * 2,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <motion.div 
        className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)',
          y,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{ opacity, scale }}
      >
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Text Column */}
          <div className="text-center md:text-left space-y-4 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-magic-gold/30 bg-magic-gold/5"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-magic-gold" />
              <span className="text-xs md:text-sm font-medium text-white/90">
                Odontopediatria Premium
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white">Um</span>{' '}
              <span className="gradient-text">Reino Mágico</span>
              <br />
              <span className="text-white">de Sorrisos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-white/70 max-w-xl mx-auto md:mx-0"
            >
              Onde a magia Disney encontra a ciência dental. 
              Salas temáticas imersivas que transformam 
              a visita ao dentista em uma aventura encantada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start"
            >
              <MagicButton 
                onClick={onAgendarClick}
                icon={<ArrowRight className="w-4 h-4 md:w-5 md:h-5" />} 
                className="text-sm md:text-base"
              >
                Iniciar Missão
              </MagicButton>
              <MagicButton 
                variant="secondary" 
                className="text-sm md:text-base"
              >
                Conheça os Mundos
              </MagicButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-6 md:gap-8 justify-center md:justify-start pt-4 md:pt-8"
            >
              {[
                { number: '10K+', label: 'Sorrisos', icon: '✨' },
                { number: '4', label: 'Reinos', icon: '🏰' },
                { number: '15+', label: 'Anos', icon: '⭐' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl md:text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl md:text-2xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-xs md:text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-[280px] h-[350px] sm:w-[350px] sm:h-[440px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[550px]">
              
              <motion.div
                className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 w-48 md:w-72 h-12 md:h-16 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(255,215,0,0.6) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.div
                className="absolute inset-0 rounded-full border-2 border-magic-gold/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-magic-gold fill-magic-gold/50" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <Crown className="w-4 h-4 md:w-5 md:h-5 text-magic-gold/60" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute inset-4 md:inset-6 rounded-full border border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-8 md:inset-12 rounded-full bg-gradient-to-br from-purple-500/10 via-magic-gold/10 to-blue-500/10 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                className="absolute inset-0 z-20 flex items-end justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="/images/dra-michelle.png" 
                  alt="Dra. Michelle Amorim"
                  className="relative z-20 w-[85%] md:w-[90%] h-auto object-contain 
                           drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]
                           filter brightness-110 contrast-110
                           -mt-4 md:-mt-8"
                />
              </motion.div>

              <motion.div className="absolute inset-0 z-30 rounded-3xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-magic-gold/50 to-transparent"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <motion.div
                className="absolute top-6 md:top-10 -right-2 md:-right-4 z-30 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl glass flex items-center justify-center glow-purple"
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xl md:text-3xl">✨</span>
              </motion.div>

              <motion.div
                className="absolute top-1/4 -left-3 md:-left-6 z-30 w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl glass flex items-center justify-center"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-lg md:text-2xl">🦷</span>
              </motion.div>

              <motion.div
                className="absolute bottom-16 md:bottom-20 -right-1 md:-right-2 z-30 px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl glass-strong flex items-center gap-1.5 md:gap-2 glow-gold"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Star className="w-3 h-3 md:w-4 md:h-4 text-magic-gold fill-magic-gold" />
                <span className="text-white font-bold text-xs md:text-sm">5.0</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 md:-bottom-4 -left-4 md:-left-8 z-30 w-20 h-20 md:w-28 md:h-28"
                animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-xl md:rounded-2xl glass flex items-center justify-center glow-blue">
                  <span className="text-3xl md:text-5xl">🚀</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-magic-gold/50 flex justify-center pt-1.5 md:pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-magic-gold"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
