import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useMagicSound } from '../hooks/useMagicSound';

interface MagicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'princess';
  className?: string;
  icon?: ReactNode;
}

export const MagicButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon 
}: MagicButtonProps) => {
  const { playClick, playHover, initAudio } = useMagicSound();

  const handleClick = (e: React.MouseEvent) => {
    initAudio(); // Inicializa áudio na primeira interação
    playClick();
    onClick?.();
  };

  const handleHover = () => {
    playHover();
  };

  const baseStyles = "relative overflow-hidden px-8 py-4 rounded-full font-semibold text-white flex items-center gap-3 group";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 via-purple-600 to-magic-gold
      bg-[length:200%_100%]
      hover:animate-[shimmer_2s_linear_infinite]
      shadow-[0_4px_15px_rgba(139,92,246,0.4),0_0_30px_rgba(255,215,0,0.2)]
    `,
    secondary: `
      bg-white/10 backdrop-blur-sm 
      border border-magic-gold/30 
      hover:bg-white/20 hover:border-magic-gold/50
      shadow-[0_0_20px_rgba(255,215,0,0.1)]
    `,
    gold: `
      bg-gradient-to-r from-magic-gold via-yellow-500 to-orange-400
      text-slate-900
      shadow-[0_4px_15px_rgba(255,215,0,0.5),0_0_30px_rgba(255,215,0,0.3)]
    `,
    princess: `
      bg-gradient-to-r from-princess-pink via-purple-500 to-blue-500
      shadow-[0_4px_15px_rgba(255,105,180,0.4),0_0_30px_rgba(139,92,246,0.2)]
    `,
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleHover}
      whileHover={{ 
        scale: 1.05,
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
      />
      
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-inherit" />
      
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-magic-gold"
            style={{
              left: `${20 + i * 30}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -20],
              opacity: [1, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.span>
      
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="relative z-10">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};
