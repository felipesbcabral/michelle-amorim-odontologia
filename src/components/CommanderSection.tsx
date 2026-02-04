import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Brain, Heart, Sparkles, GraduationCap, Stethoscope, Shield, Star } from 'lucide-react';

const skills = [
  { icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />, label: 'Psicologia', desc: 'Abordagem Humanizada' },
  { icon: <Stethoscope className="w-4 h-4 md:w-5 md:h-5" />, label: 'Odontopediatria', desc: 'Especialista' },
  { icon: <Heart className="w-4 h-4 md:w-5 md:h-5" />, label: 'Ortopedia', desc: 'Harmonização' },
  { icon: <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />, label: '15+ Anos', desc: 'Experiência' },
];

const credentials = [
  { icon: <Shield className="w-3 h-3 md:w-4 md:h-4" />, text: 'CRO-DF' },
  { icon: <Star className="w-3 h-3 md:w-4 md:h-4" />, text: 'Mestre' },
  { icon: <Award className="w-3 h-3 md:w-4 md:h-4" />, text: 'Pós Psicologia' },
];

const orbitItems = [
  { icon: '✨', delay: 0 },
  { icon: '🦷', delay: 1 },
  { icon: '💫', delay: 2 },
  { icon: '🌟', delay: 3 },
];

export const CommanderSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/10 blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-white/20 mb-4 md:mb-6">
            <Shield className="w-3 h-3 md:w-4 md:h-4 text-magic-gold" />
            <span className="text-xs md:text-sm font-medium text-white/80">Liderança & Excelência</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-white">Quem é a</span>{' '}
            <span className="gradient-text">Comandante?</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Hologram Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px]">
              {/* Glow base */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 md:w-64 h-10 md:h-12 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse, rgba(168,85,247,0.5) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Frame */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-purple-500/30" />
                <div className="absolute inset-[2px] rounded-xl md:rounded-2xl border border-purple-400/20" />
                
                <motion.div
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-20"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute inset-0 rounded-2xl md:rounded-3xl shadow-[inset_0_0_40px_rgba(168,85,247,0.2)]" />

                <div className="absolute inset-2 md:inset-3 rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  
                  <motion.img 
                    src="/images/dra-michelle.png" 
                    alt="Dra. Michelle Amorim"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.3))' }}
                  />
                </div>
              </div>

              {/* Orbiting elements */}
              {orbitItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl glass flex items-center justify-center text-lg md:text-2xl"
                  style={{
                    top: `${10 + index * 15}%`,
                    right: index % 2 === 0 ? '-12px' : 'auto',
                    left: index % 2 === 1 ? '-12px' : 'auto',
                  }}
                  animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  {item.icon}
                </motion.div>
              ))}

              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl glass-strong flex items-center gap-1.5 md:gap-2 max-w-[90%]"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-magic-gold flex-shrink-0" />
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-3">
                  {credentials.map((cred, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-magic-gold flex-shrink-0">{cred.icon}</span>
                      <span className="text-[9px] md:text-xs font-semibold text-white whitespace-nowrap">{cred.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-purple-400/50 rounded-tl-xl md:rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-purple-400/50 rounded-tr-xl md:rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-purple-400/50 rounded-bl-xl md:rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-purple-400/50 rounded-br-xl md:rounded-br-2xl" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
          >
            <div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                Dra. Michelle Amorim
              </h3>
              <p className="text-magic-gold font-medium mb-3 md:mb-4 text-base md:text-lg">
                Comandante da Missão Sorriso
              </p>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">
                A Dra. Michelle Amorim combina excelência técnica (Mestre, Doutora) 
                com Pós-graduação em Psicologia para liderar a missão mais importante: 
                transformar o medo em sorrisos corajosos.
              </p>
            </div>

            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Com mais de 15 anos de experiência, uni minha formação em Psicologia 
              à Odontopediatria para criar uma abordagem única: tratamentos 
              sem trauma, onde cada criança se sente especial e segura.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group p-3 md:p-4 rounded-xl md:rounded-2xl glass hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 group-hover:text-purple-400 transition-colors">
                      {skill.icon}
                    </div>
                    <span className="font-semibold text-white text-sm md:text-base">{skill.label}</span>
                  </div>
                  <p className="text-xs md:text-sm text-white/50 ml-10 md:ml-[52px]">{skill.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="relative pl-4 md:pl-6 border-l-2 border-purple-500/50"
            >
              <p className="text-white/70 italic text-sm md:text-base">
                "Cada criança merece um sorriso saudável e feliz. 
                Minha missão é construir isso com amor, ciência e magia."
              </p>
              <cite className="text-magic-gold text-xs md:text-sm mt-2 block not-italic font-semibold">
                — Dra. Michelle Amorim
              </cite>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
