import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface MagicSparklesProps {
  density?: 'low' | 'medium' | 'high';
  colors?: string[];
}

export const MagicSparkles = ({ 
  density = 'low',
  colors = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB']
}: MagicSparklesProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const count = density === 'low' ? 15 : density === 'medium' ? 25 : 40;
    
    const generateSparkle = (id: number): Sparkle => ({
      id,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    setSparkles(Array.from({ length: count }, (_, i) => generateSparkle(i)));

    // Regenera sparkles periodicamente
    const interval = setInterval(() => {
      setSparkles(prev => prev.map(s => ({
        ...s,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      })));
    }, 8000);

    return () => clearInterval(interval);
  }, [density, colors, dimensions.width]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            width: sparkle.size,
            height: sparkle.size,
            background: `radial-gradient(circle, ${sparkle.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}40`,
          }}
          initial={{ 
            y: -20, 
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            y: dimensions.height + 50,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Cross sparkle effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(90deg, transparent 40%, ${sparkle.color}80 50%, transparent 60%),
                linear-gradient(0deg, transparent 40%, ${sparkle.color}80 50%, transparent 60%)
              `,
              transform: 'scale(2)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ))}

      {/* Occasional "magic burst" */}
      <MagicBurst colors={colors} />
    </div>
  );
};

// Componente para explosões ocasionais de magia
const MagicBurst = ({ colors }: { colors: string[] }) => {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const createBurst = () => {
      const id = Date.now();
      const x = 20 + Math.random() * 60; // 20-80% para não ficar nas bordas
      const y = 20 + Math.random() * 60;
      
      setBursts(prev => [...prev.slice(-2), { id, x, y }]);
      
      setTimeout(() => {
        setBursts(prev => prev.filter(b => b.id !== id));
      }, 2000);
    };

    const interval = setInterval(createBurst, 4000 + Math.random() * 3000);
    createBurst(); // Primeiro burst imediato

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: `${burst.x}%`, top: `${burst.y}%` }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: colors[i % colors.length],
                boxShadow: `0 0 4px ${colors[i % colors.length]}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 40,
                y: Math.sin((i / 8) * Math.PI * 2) * 40,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default MagicSparkles;
