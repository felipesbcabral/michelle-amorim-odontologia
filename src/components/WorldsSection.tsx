import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sword, Castle, Gamepad2, Palmtree, ArrowUpRight } from 'lucide-react';

interface World {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  color: 'purple' | 'blue' | 'gold' | 'orange';
  features: string[];
}

const worlds: World[] = [
  {
    id: 'starwars',
    title: 'Base Galáctica',
    subtitle: 'Star Wars',
    description: 'Uma jornada espacial pelo cuidado dental. Cadeira temática, sons imersivos e uma experiência fora deste mundo.',
    icon: <Sword className="w-5 h-5 md:w-6 md:h-6" />,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    color: 'purple',
    features: ['Mesa TIE Fighter', 'Projeções 3D', 'Som Espacial'],
  },
  {
    id: 'disney',
    title: 'Reino Encantado',
    subtitle: 'Disney',
    description: 'Onde os sonhos se tornam sorrisos. Ambiente mágico com princesas, bonecos e encanto em cada detalhe.',
    icon: <Castle className="w-5 h-5 md:w-6 md:h-6" />,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    color: 'blue',
    features: ['Princesas', 'Bonecos', 'Mágica Real'],
  },
  {
    id: 'safari',
    title: 'Expedição Safari',
    subtitle: 'Safari',
    description: 'Aventura na selva odontológica. Animais, natureza e exploração com o Mickey explorador no corredor.',
    icon: <Palmtree className="w-5 h-5 md:w-6 md:h-6" />,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    color: 'gold',
    features: ['Mickey Explorador', 'Natureza', 'Aventura'],
  },
  {
    id: 'gamer',
    title: 'Arena Gamer',
    subtitle: 'Gamer',
    description: 'Nível avançado de diversão. Cadeiras de controle arcade, telas, games e tecnologia de ponta.',
    icon: <Gamepad2 className="w-5 h-5 md:w-6 md:h-6" />,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    color: 'orange',
    features: ['Controle Arcade', 'RGB Lights', 'VR Experience'],
  },
];

const WorldCard = ({ world, index }: { world: World; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const colorGradients = {
    purple: 'from-purple-600/90 via-purple-900/80 to-slate-950/95',
    blue: 'from-blue-600/90 via-blue-900/80 to-slate-950/95',
    gold: 'from-amber-600/90 via-amber-900/80 to-slate-950/95',
    orange: 'from-orange-600/90 via-orange-900/80 to-slate-950/95',
  };

  const glowColors = {
    purple: 'shadow-[0_0_40px_rgba(168,85,247,0.4)] md:shadow-[0_0_60px_rgba(168,85,247,0.4)]',
    blue: 'shadow-[0_0_40px_rgba(59,130,246,0.4)] md:shadow-[0_0_60px_rgba(59,130,246,0.4)]',
    gold: 'shadow-[0_0_40px_rgba(251,191,36,0.4)] md:shadow-[0_0_60px_rgba(251,191,36,0.4)]',
    orange: 'shadow-[0_0_40px_rgba(249,115,22,0.4)] md:shadow-[0_0_60px_rgba(249,115,22,0.4)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div 
        className={`
          relative h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer
          transition-all duration-500
          ${isHovered ? glowColors[world.color] : ''}
        `}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${world.image})` }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 -z-10" />
          
          <div 
            className={`
              absolute inset-0 bg-gradient-to-t ${colorGradients[world.color]}
              transition-opacity duration-500
              ${isHovered ? 'opacity-95' : 'opacity-90'}
            `}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Mobile: Always show pulse glow | Desktop: On hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
          animate={{ 
            opacity: isMobile ? [0.3, 0.6, 0.3] : isHovered ? 1 : 0 
          }}
          transition={{ duration: isMobile ? 2 : 0.3, repeat: isMobile ? Infinity : 0 }}
        />

        {/* Content */}
        <div className="relative z-10 h-full p-5 md:p-8 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between">
            <motion.div
              className={`
                w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center
                backdrop-blur-md bg-white/10 border border-white/20
                ${isHovered ? 'bg-white/20' : ''}
                transition-all duration-300
              `}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-white">{world.icon}</span>
            </motion.div>
            
            <motion.div
              className="w-9 h-9 md:w-10 md:h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, x: 2, y: -2 }}
            >
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
            </motion.div>
          </div>

          {/* Body */}
          <div>
            <motion.p 
              className="text-white/60 text-xs md:text-sm mb-1 md:mb-2 uppercase tracking-wider"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              {world.subtitle}
            </motion.p>
            
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
              {world.title}
            </h3>

            <motion.p 
              className="text-white/70 text-sm md:text-base mb-4 md:mb-6 line-clamp-2"
              animate={{ 
                opacity: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : 5
              }}
            >
              {world.description}
            </motion.p>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {world.features.map((feature, i) => (
                <motion.span
                  key={i}
                  className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-sm bg-white/10 text-white/80 border border-white/10"
                  initial={false}
                  animate={{ 
                    y: isHovered ? 0 : 5,
                    opacity: isHovered ? 1 : 0.7
                  }}
                  transition={{ delay: i * 0.05 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const WorldsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="worlds"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass mb-4 md:mb-6"
          >
            <span className="text-xl md:text-2xl">🌟</span>
            <span className="text-xs md:text-sm font-medium text-white/80">
              Experiências Únicas
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
          >
            <span className="text-white">Escolha Seu</span>{' '}
            <span className="gradient-text">Mundo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto"
          >
            Cada sala é um universo à parte, projetado para transformar 
            o tratamento odontológico em uma experiência mágica e sem medo.
          </motion.p>
        </div>

        {/* Grid: 1 col mobile | 2 cols tablet | 2 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {worlds.map((world, index) => (
            <WorldCard key={world.id} world={world} index={index} />
          ))}
        </div>

        {/* Center glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Floating decorations - Hidden on mobile */}
      <motion.div
        className="absolute top-20 left-6 md:left-10 w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl glass flex items-center justify-center hidden sm:flex"
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-2xl md:text-4xl">🌌</span>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-6 md:right-10 w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl glass flex items-center justify-center hidden sm:flex"
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-2xl md:text-4xl">🎪</span>
      </motion.div>
    </section>
  );
};
