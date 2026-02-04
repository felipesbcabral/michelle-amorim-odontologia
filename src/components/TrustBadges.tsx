import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Award, Star, Medal, Clock, Users } from 'lucide-react';

const badges = [
  {
    icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'CRO-DF',
    subtitle: '12345',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Mestre & Doutora',
    subtitle: 'Odontologia',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: <Star className="w-6 h-6 md:w-8 md:h-8" />,
    title: '5.0 Estrelas',
    subtitle: 'Google Reviews',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <Medal className="w-6 h-6 md:w-8 md:h-8" />,
    title: 'Pós-Graduada',
    subtitle: 'Psicologia',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />,
    title: '15+ Anos',
    subtitle: 'Experiência',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    title: '10.000+',
    subtitle: 'Sorrisos',
    color: 'from-green-500 to-emerald-500',
  },
];

const planosSaude = [
  'Amil', 'Bradesco', 'SulAmérica', 'Unimed', 'Particular'
];

export const TrustBadges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Google Rating Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 md:gap-4 glass-strong px-5 py-3 md:px-8 md:py-4 rounded-2xl">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="text-center sm:text-left">
              <span className="text-2xl md:text-3xl font-bold text-white">5.0</span>
              <span className="text-white/60 text-sm md:text-base ml-2">avaliações no Google</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <a 
              href="https://g.co/kgs/xyz123" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ver 500+ avaliações →
            </a>
          </div>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-4 md:p-5 rounded-xl md:rounded-2xl glass hover:bg-white/10 transition-all duration-300 text-center">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className={`relative w-12 h-12 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white`}>
                  {badge.icon}
                </div>
                
                <h3 className="font-bold text-white text-sm md:text-base leading-tight">
                  {badge.title}
                </h3>
                <p className="text-white/50 text-xs md:text-sm mt-0.5">
                  {badge.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Planos de Saúde */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-white/40 text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wider">
            Convênios e Planos de Saúde
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {planosSaude.map((plano) => (
              <span 
                key={plano}
                className="px-3 py-1 md:px-4 md:py-1.5 rounded-full glass text-white/70 text-xs md:text-sm"
              >
                {plano}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
