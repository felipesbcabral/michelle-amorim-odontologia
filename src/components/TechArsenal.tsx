import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScanFace, Zap, Syringe, Monitor, Microscope, Cpu, Scan, Wifi } from 'lucide-react';

interface TechItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  specs: string[];
}

const techItems: TechItem[] = [
  {
    id: 'raiox',
    icon: <ScanFace className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Raio-X Digital',
    description: 'Imagens de alta definição com exposição mínima de radiação.',
    specs: ['95% menos radiação', 'Imagem instantânea', 'Visualização 3D'],
  },
  {
    id: 'anestesia',
    icon: <Syringe className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Anestesia Computadorizada',
    description: 'Sistema The Wand - indolor e preciso para total conforto.',
    specs: ['Aplicação indolor', 'Dose controlada', 'Sem agulha visível'],
  },
  {
    id: 'scanner',
    icon: <Scan className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Scanner Intraoral',
    description: 'Digitalização 3D da arcada dentária em minutos.',
    specs: ['Precisão 20 microns', 'Sem moldes', 'Visualização em tempo real'],
  },
  {
    id: 'monitor',
    icon: <Monitor className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Monitores Interativos',
    description: 'Entretenimento durante o tratamento com Netflix e Disney+.',
    specs: ['Telas 4K', 'Netflix & Disney+', 'Fones sem fio'],
  },
  {
    id: 'laser',
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Laser de Baixa Potência',
    description: 'Terapia fotobiomodulação para cicatrização acelerada.',
    specs: ['Cicatrização rápida', 'Anti-inflamatório', 'Zero dor'],
  },
  {
    id: 'autoclave',
    icon: <Cpu className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Esterilização Autoclave',
    description: 'Protocolos rigorosos de biossegurança e higienização.',
    specs: ['Esterilização total', 'Selos individuais', 'Rastreabilidade'],
  },
];

const TechCard = ({ item, index }: { item: TechItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className={`
        relative p-4 md:p-6 rounded-xl md:rounded-2xl overflow-hidden h-full
        backdrop-blur-md bg-slate-950/80 
        border border-cyan-500/20
        transition-all duration-500
        ${isHovered ? 'border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : ''}
      `}>
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px md:20px md:20px',
          }}
        />

        {/* Scan line on hover */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20"
          initial={{ top: '0%', opacity: 0 }}
          animate={isHovered ? { top: ['0%', '100%'], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.2, ease: "linear" }}
        />

        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg" />

        {/* System ID */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3">
          <span className="text-[8px] md:text-[10px] font-mono text-cyan-500/50">
            SYS-{String(index + 1).padStart(3, '0')}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 md:mb-5">
            <motion.div
              className={`
                w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center
                bg-slate-900/50 border border-cyan-500/30
                transition-all duration-300
                ${isHovered ? 'border-cyan-400/80 bg-cyan-500/10' : ''}
              `}
              animate={isHovered ? { 
                boxShadow: ['0 0 0px rgba(6,182,212,0)', '0 0 20px rgba(6,182,212,0.5)', '0 0 0px rgba(6,182,212,0)']
              } : {}}
              transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
            >
              <span className={`text-cyan-400 transition-all duration-300 ${isHovered ? 'drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]' : ''}`}>
                {item.icon}
              </span>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
              <span className="text-[8px] md:text-[10px] font-mono text-green-400">ONLINE</span>
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="font-display text-base md:text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-xs md:text-sm mb-3 md:mb-5 leading-relaxed">
            {item.description}
          </p>

          {/* Specs */}
          <div className="space-y-1.5 md:space-y-2 border-t border-cyan-500/10 pt-3 md:pt-4">
            {item.specs.map((spec, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-[10px] md:text-xs"
                initial={{ opacity: 0.5, x: 0 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
                <span className="text-cyan-100/80 font-mono">{spec}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={isHovered ? { opacity: [0.3, 1, 0.3] } : { opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export const TechArsenal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="tech"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-royal-950" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6,182,212,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px]">
        <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-10 md:inset-20 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-slate-900/50 border border-cyan-500/30 mb-4 md:mb-6">
            <Wifi className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs md:text-sm font-mono text-cyan-100">SISTEMAS_ONLINE</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
            <span className="text-white">Arsenal</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Tecnológico
            </span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Nossa base operacional está equipada com tecnologia de nível espacial 
            para diagnósticos precisos e tratamentos minimamente invasivos.
          </p>
        </motion.div>

        {/* HUD Brackets - Hidden on mobile */}
        <div className="relative">
          <motion.div
            className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-6 md:w-8 h-24 md:h-32 border-l-2 border-t-2 border-b-2 border-cyan-500/30 rounded-l-lg flex items-center justify-center">
              <div className="w-0.5 h-6 md:h-8 bg-cyan-400/50 rounded-full" />
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-6 md:w-8 h-24 md:h-32 border-r-2 border-t-2 border-b-2 border-cyan-500/30 rounded-r-lg flex items-center justify-center">
              <div className="w-0.5 h-6 md:h-8 bg-cyan-400/50 rounded-full" />
            </div>
          </motion.div>

          {/* Grid: 1 col mobile | 2 cols tablet | 3 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {techItems.map((item, index) => (
              <TechCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-3 rounded-lg bg-slate-900/50 border border-cyan-500/20">
            <div className="flex items-center gap-1.5 md:gap-2">
              <motion.div
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] md:text-xs font-mono text-cyan-100/70">SISTEMAS_OPERACIONAIS</span>
            </div>
            <div className="w-px h-3 md:h-4 bg-cyan-500/30" />
            <span className="text-[10px] md:text-xs font-mono text-cyan-100/50">V.2.0.24</span>
            <div className="w-px h-3 md:h-4 bg-cyan-500/30 hidden sm:block" />
            <Microscope className="w-3 h-3 md:w-4 md:h-4 text-cyan-400/50 hidden sm:block" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
