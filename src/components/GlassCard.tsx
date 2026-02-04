import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  glowColor?: 'purple' | 'blue' | 'gold';
}

export const GlassCard = ({ 
  children, 
  className = '', 
  tilt = true,
  glow = true,
  glowColor = 'purple'
}: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowColors = {
    purple: 'group-hover:shadow-[0_0_60px_rgba(168,85,247,0.4)]',
    blue: 'group-hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]',
    gold: 'group-hover:shadow-[0_0_60px_rgba(251,191,36,0.4)]',
  };

  return (
    <motion.div
      ref={ref}
      className={`
        relative group
        backdrop-blur-xl bg-white/5 
        border border-white/10 rounded-3xl
        transition-colors duration-300
        hover:bg-white/10 hover:border-white/20
        ${glow ? glowColors[glowColor] : ''}
        ${className}
      `}
      style={tilt ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Brilho interno no hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Borda brilhante animada */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
