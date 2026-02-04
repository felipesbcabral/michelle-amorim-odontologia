import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, Clock, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

interface Transformacao {
  id: number;
  nome: string;
  idade: string;
  tratamento: string;
  duracao: string;
  depoimento: string;
  resultado: string;
}

const transformacoes: Transformacao[] = [
  {
    id: 1,
    nome: 'Pedro',
    idade: '6 anos',
    tratamento: 'Adestramento Bucal + Ortopedia',
    duracao: '8 meses',
    depoimento: 'Pedro tinha medo de dentista. Agora não para de pedir para voltar!',
    resultado: 'Sorriso alinhado, sem trauma',
  },
  {
    id: 2,
    nome: 'Luísa',
    idade: '8 anos',
    tratamento: 'Expansão Palatina + Contenção',
    duracao: '12 meses',
    depoimento: 'A sala Disney fez toda diferença. Ela amou cada consulta!',
    resultado: 'Arcada corrigida, respiração melhorada',
  },
  {
    id: 3,
    nome: 'Gêmeos João & Maria',
    idade: '5 anos',
    tratamento: 'Restaurações + Prevenção',
    duracao: '3 meses',
    depoimento: 'Conseguir tratar os dois ao mesmo tempo foi incrível!',
    resultado: 'Dentes saudáveis, sem cáries',
  },
  {
    id: 4,
    nome: 'Sofia',
    idade: '7 anos',
    tratamento: 'Ortopedia Funcional',
    duracao: '10 meses',
    depoimento: 'A paciência da Dra. com crianças autistas é extraordinária.',
    resultado: 'Harmonização facial, mordida corrigida',
  },
];

export const TransformacoesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % transformacoes.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + transformacoes.length) % transformacoes.length);

  return (
    <section ref={sectionRef} id="transformacoes" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-magic-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-magic-gold" />
            <span className="text-sm font-medium text-white/80">Transformações Reais</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="text-white">Antes &</span>{' '}
            <span className="gradient-text">Depois</span>
          </h2>
          
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Cada sorriso conta uma história. Conheça algumas das transformações que realizamos com amor e dedicação.
          </p>
          
          <p className="text-white/40 text-sm mt-4">
            * Imagens ilustrativas - Fotos reais disponíveis na clínica com autorização dos responsáveis
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {transformacoes.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-2 md:px-4">
                  <div className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-10">
                    <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                      {/* Placeholder para fotos */}
                      <div className="space-y-3 md:space-y-4">
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                          <div className="aspect-square rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-3xl md:text-4xl">📷</span>
                              <p className="text-white/30 text-xs mt-2">Antes</p>
                            </div>
                          </div>
                          <div className="aspect-square rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-magic-gold/30 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-magic-gold/10" />
                            <div className="text-center relative z-10">
                              <span className="text-3xl md:text-4xl">✨</span>
                              <p className="text-magic-gold text-xs mt-2">Depois</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Info badges */}
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full glass text-white/70 text-xs md:text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duracao}
                          </span>
                          <span className="px-3 py-1 rounded-full glass text-white/70 text-xs md:text-sm flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Sem trauma
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl md:text-2xl">
                            {item.nome[0]}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg md:text-xl">{item.nome}</h3>
                            <p className="text-white/50 text-sm">{item.idade}</p>
                          </div>
                        </div>

                        <h4 className="font-semibold text-magic-gold mb-2 text-sm md:text-base">
                          {item.tratamento}
                        </h4>

                        <blockquote className="text-white/70 italic mb-4 text-sm md:text-base leading-relaxed">
                          "{item.depoimento}"
                        </blockquote>

                        <div className="p-3 md:p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                          <p className="text-green-400 text-xs md:text-sm font-medium">
                            ✅ Resultado: {item.resultado}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <div className="flex gap-2">
              {transformacoes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                    index === activeIndex ? 'w-6 md:w-8 bg-magic-gold' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
