import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Clock, ArrowRight, Baby, Apple, AlertCircle } from 'lucide-react';

interface Artigo {
  id: number;
  titulo: string;
  resumo: string;
  categoria: string;
  tempoLeitura: string;
  icon: React.ReactNode;
  cor: string;
}

const artigos: Artigo[] = [
  {
    id: 1,
    titulo: 'Primeira Consulta do Bebê: Quando e Como Preparar?',
    resumo: 'Descubra o momento ideal para a primeira visita ao dentista e dicas para que tudo corra bem sem trauma.',
    categoria: 'Primeira Consulta',
    tempoLeitura: '4 min',
    icon: <Baby className="w-5 h-5 md:w-6 md:h-6" />,
    cor: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    titulo: 'Alimentação e Saúde Bucal: O Que Evitar?',
    resumo: 'Conheça os alimentos que podem prejudicar os dentes das crianças e opções saudáveis para substituir.',
    categoria: 'Saúde',
    tempoLeitura: '5 min',
    icon: <Apple className="w-5 h-5 md:w-6 md:h-6" />,
    cor: 'from-green-500 to-emerald-500',
  },
  {
    id: 3,
    titulo: 'Mitos da Dentição: O Que é Verdade?',
    resumo: 'Desvendamos as crenças populares sobre a dentição infantil com base científica e experiência clínica.',
    categoria: 'Mitos',
    tempoLeitura: '6 min',
    icon: <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />,
    cor: 'from-blue-500 to-cyan-500',
  },
];

export const BlogPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="blog" className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-magic-gold" />
              <span className="text-sm font-medium text-white/80">Blog</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-white">Dicas de</span>{' '}
              <span className="gradient-text">Saúde Bucal</span>
            </h2>
          </div>
          
          <a
            href="https://www.instagram.com/dramichelleamorim/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-magic-gold transition-colors text-sm md:text-base"
          >
            <span>Ver mais no Instagram</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {artigos.map((artigo, index) => (
            <motion.article
              key={artigo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-xl md:rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className={`h-40 md:h-48 bg-gradient-to-br ${artigo.cor} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    {artigo.icon}
                  </div>
                </div>
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] md:text-xs">
                    {artigo.categoria}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 text-white/40 text-xs mb-2">
                  <Clock className="w-3 h-3" />
                  <span>{artigo.tempoLeitura} de leitura</span>
                </div>

                <h3 className="font-bold text-white text-base md:text-lg mb-2 group-hover:text-magic-gold transition-colors line-clamp-2">
                  {artigo.titulo}
                </h3>

                <p className="text-white/60 text-sm line-clamp-2 mb-4">
                  {artigo.resumo}
                </p>

                <a
                  href="https://www.instagram.com/dramichelleamorim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-magic-gold text-sm font-medium group/link"
                >
                  <span>Ler mais</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
