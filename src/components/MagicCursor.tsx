import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  type: 'circle' | 'star';
}

const colors = ['#FFD700', '#FFF8DC', '#FF69B4', '#FFFFFF'];

export const MagicCursor = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isReady, setIsReady] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(isTouchDevice);
      if (!isTouchDevice) {
        setTimeout(() => setIsReady(true), 100);
      }
    };
    checkTouch();
    
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const addParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 2; i++) {
      newParticles.push({
        id: Date.now() + i + Math.random(),
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.6 ? 'star' : 'circle',
      });
    }
    
    setParticles(prev => [...prev.slice(-20), ...newParticles]);
  }, []);

  useEffect(() => {
    if (!isReady || isTouch) return;

    let lastTime = 0;
    const interval = 25;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (now - lastTime > interval) {
        addParticles(e.clientX, e.clientY);
        lastTime = now;
      }
    };

    const debouncedMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener('mousemove', debouncedMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', debouncedMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isReady, isTouch, addParticles]);

  // Remove old particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const timer = setTimeout(() => {
      setParticles(prev => prev.slice(0, -1));
    }, 60);
    
    return () => clearTimeout(timer);
  }, [particles]);

  if (isTouch || !isReady) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden hidden md:block"
      style={{ zIndex: 99999 }}
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 0, y: p.y + 35, x: p.x + (Math.random() - 0.5) * 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            {p.type === 'star' ? (
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill={p.color}
                style={{ filter: `drop-shadow(0 0 4px ${p.color})` }}
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            ) : (
              <div
                className="rounded-full"
                style={{
                  width: 5 + Math.random() * 3,
                  height: 5 + Math.random() * 3,
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}60`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Cursor Star */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, transparent 70%)',
            width: 30,
            height: 30,
            transform: 'translate(-5px, -5px)',
            filter: 'blur(3px)',
          }}
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#FFD700"
          style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </motion.div>
    </div>
  );
};
