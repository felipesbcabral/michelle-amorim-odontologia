import { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Constellation {
  name: string;
  stars: Star[];
  connections: [number, number][];
  color: string;
}

export const DisneyConstellations = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const constellationsRef = useRef<Constellation[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const isTouch = useRef(false);

  useEffect(() => {
    // Check for touch device
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if element is visible
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Responsive star count
    const getStarCount = () => {
      const width = window.innerWidth;
      if (width < 640) return 8; // Mobile
      if (width < 1024) return 12; // Tablet
      return 15; // Desktop
    };

    // Create Mickey
    const createMickey = (centerX: number, centerY: number, scale: number): Constellation => {
      const count = getStarCount();
      const stars: Star[] = [
        { x: -35, y: -35, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0 },
        { x: -45, y: -25, size: 1.5, alpha: 0.5, twinkleSpeed: 0.015, twinklePhase: 1 },
        { x: -30, y: -45, size: 1.8, alpha: 0.55, twinkleSpeed: 0.018, twinklePhase: 2 },
        { x: 35, y: -35, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0.5 },
        { x: 45, y: -25, size: 1.5, alpha: 0.5, twinkleSpeed: 0.015, twinklePhase: 1.5 },
        { x: 30, y: -45, size: 1.8, alpha: 0.55, twinkleSpeed: 0.018, twinklePhase: 2.5 },
        { x: 0, y: -25, size: 2.5, alpha: 0.7, twinkleSpeed: 0.025, twinklePhase: 0 },
        { x: -15, y: -15, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0.3 },
        { x: 15, y: -15, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0.7 },
        { x: -20, y: 0, size: 2.2, alpha: 0.65, twinkleSpeed: 0.022, twinklePhase: 1 },
        { x: 0, y: 0, size: 3, alpha: 0.8, twinkleSpeed: 0.03, twinklePhase: 0 },
        { x: 20, y: 0, size: 2.2, alpha: 0.65, twinkleSpeed: 0.022, twinklePhase: 1.2 },
        { x: -15, y: 15, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 1.5 },
        { x: 0, y: 20, size: 2.5, alpha: 0.7, twinkleSpeed: 0.025, twinklePhase: 0.8 },
        { x: 15, y: 15, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 1.8 },
      ].slice(0, count);

      return {
        name: 'mickey',
        stars: stars.map(s => ({ ...s, x: centerX + s.x * scale, y: centerY + s.y * scale })),
        connections: [[0,1], [1,2], [0,2], [3,4], [4,5], [3,5], [6,7], [7,10], [10,11], [11,8], [8,6], [7,9], [9,12], [12,13], [13,14], [14,11], [0,7], [3,8]],
        color: '#FFD700',
      };
    };

    // Create Crown
    const createCrown = (centerX: number, centerY: number, scale: number): Constellation => {
      const count = Math.floor(getStarCount() * 0.8);
      const stars: Star[] = [
        { x: -40, y: 15, size: 1.5, alpha: 0.5, twinkleSpeed: 0.015, twinklePhase: 0 },
        { x: -20, y: 10, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0.5 },
        { x: 0, y: 12, size: 2.2, alpha: 0.65, twinkleSpeed: 0.022, twinklePhase: 1 },
        { x: 20, y: 10, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 1.5 },
        { x: 40, y: 15, size: 1.5, alpha: 0.5, twinkleSpeed: 0.015, twinklePhase: 2 },
        { x: -30, y: -10, size: 2.5, alpha: 0.7, twinkleSpeed: 0.025, twinklePhase: 0 },
        { x: -15, y: -25, size: 3, alpha: 0.8, twinkleSpeed: 0.03, twinklePhase: 0.3 },
        { x: 0, y: -35, size: 3.5, alpha: 0.9, twinkleSpeed: 0.035, twinklePhase: 0 },
        { x: 15, y: -25, size: 3, alpha: 0.8, twinkleSpeed: 0.03, twinklePhase: 0.7 },
        { x: 30, y: -10, size: 2.5, alpha: 0.7, twinkleSpeed: 0.025, twinklePhase: 1.2 },
        { x: 0, y: -5, size: 2.8, alpha: 0.85, twinkleSpeed: 0.04, twinklePhase: 0 },
      ].slice(0, count);

      return {
        name: 'crown',
        stars: stars.map(s => ({ ...s, x: centerX + s.x * scale, y: centerY + s.y * scale })),
        connections: [[0,1], [1,2], [2,3], [3,4], [0,5], [5,6], [6,7], [7,8], [8,9], [9,4], [5,10], [6,10], [7,10], [8,10], [9,10]],
        color: '#FF69B4',
      };
    };

    // Create Lightsaber
    const createLightsaber = (centerX: number, centerY: number, scale: number): Constellation => {
      const count = Math.floor(getStarCount() * 0.9);
      const stars: Star[] = [
        { x: 0, y: 40, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0 },
        { x: 0, y: 30, size: 2.2, alpha: 0.65, twinkleSpeed: 0.022, twinklePhase: 0.5 },
        { x: 0, y: 20, size: 2.5, alpha: 0.7, twinkleSpeed: 0.025, twinklePhase: 1 },
        { x: -5, y: 25, size: 1.5, alpha: 0.5, twinkleSpeed: 0.018, twinklePhase: 1.5 },
        { x: 5, y: 25, size: 1.5, alpha: 0.5, twinkleSpeed: 0.018, twinklePhase: 2 },
        { x: -8, y: 15, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0 },
        { x: 8, y: 15, size: 2, alpha: 0.6, twinkleSpeed: 0.02, twinklePhase: 0.5 },
        { x: 0, y: 5, size: 3, alpha: 0.8, twinkleSpeed: 0.03, twinklePhase: 0 },
        { x: 0, y: -10, size: 3.2, alpha: 0.85, twinkleSpeed: 0.032, twinklePhase: 0.3 },
        { x: 0, y: -25, size: 3.5, alpha: 0.9, twinkleSpeed: 0.035, twinklePhase: 0.6 },
        { x: 0, y: -40, size: 3, alpha: 0.8, twinkleSpeed: 0.03, twinklePhase: 0.9 },
        { x: 0, y: -55, size: 2.5, alpha: 0.7, twinkleSpeed: 0.028, twinklePhase: 1.2 },
      ].slice(0, count);

      return {
        name: 'lightsaber',
        stars: stars.map(s => ({ ...s, x: centerX + s.x * scale, y: centerY + s.y * scale })),
        connections: [[0,1], [1,2], [2,3], [2,4], [2,5], [2,6], [5,6], [2,7], [7,8], [8,9], [9,10], [10,11]],
        color: '#60A5FA',
      };
    };

    const initConstellations = () => {
      const w = canvas.width;
      const h = canvas.height;
      const isMobile = w < 768;
      
      // Responsive scale
      const scale = isMobile ? 0.6 : Math.min(w, h) / 1200;
      
      // Responsive positions
      const positions = isMobile ? [
        { x: w * 0.75, y: h * 0.15 }, // Mickey smaller, positioned carefully
        { x: w * 0.15, y: h * 0.3 },
        { x: w * 0.85, y: h * 0.65 },
      ] : [
        { x: w * 0.85, y: h * 0.25 },
        { x: w * 0.1, y: h * 0.35 },
        { x: w * 0.92, y: h * 0.7 },
      ];
      
      const mobileScales = isMobile ? [0.7, 0.6, 0.5] : [1.2, 1, 0.9];

      const newConstellations: Constellation[] = [
        createMickey(positions[0].x, positions[0].y, scale * mobileScales[0]),
        createCrown(positions[1].x, positions[1].y, scale * mobileScales[1]),
        createLightsaber(positions[2].x, positions[2].y, scale * mobileScales[2]),
      ];
      
      constellationsRef.current = newConstellations;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initConstellations();
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Mouse parallax (only on desktop)
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch.current) return;
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    let active = true;
    
    const animate = () => {
      if (!active || !isVisible) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      constellationsRef.current.forEach((constellation, cIndex) => {
        const offsetX = mouseRef.current.x * (cIndex + 1) * 0.3;
        const offsetY = mouseRef.current.y * (cIndex + 1) * 0.3;

        // Connections
        ctx.strokeStyle = constellation.color + (isTouch.current ? '15' : '20');
        ctx.lineWidth = 0.5;
        constellation.connections.forEach(([start, end]) => {
          const s = constellation.stars[start];
          const e = constellation.stars[end];
          ctx.beginPath();
          ctx.moveTo(s.x + offsetX, s.y + offsetY);
          ctx.lineTo(e.x + offsetX, e.y + offsetY);
          ctx.stroke();
        });

        // Stars
        constellation.stars.forEach(star => {
          const twinkle = Math.sin(time * star.twinkleSpeed * 100 + star.twinklePhase);
          const alpha = star.alpha + twinkle * 0.2;
          
          const gradient = ctx.createRadialGradient(
            star.x + offsetX, star.y + offsetY, 0,
            star.x + offsetX, star.y + offsetY, star.size * 3
          );
          gradient.addColorStop(0, constellation.color);
          gradient.addColorStop(0.5, constellation.color + '40');
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = Math.max(0, alpha);
          ctx.beginPath();
          ctx.arc(star.x + offsetX, star.y + offsetY, star.size * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.max(0, alpha * 0.8);
          ctx.beginPath();
          ctx.arc(star.x + offsetX, star.y + offsetY, star.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        opacity: 0.5,
      }}
    />
  );
};
