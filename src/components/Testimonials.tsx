import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Carolina',
    role: 'Mãe do Pedro, 5 anos',
    content: 'Meu filho tinha pavor de dentista. Depois que conhecemos a Dra. Michelle e a sala Star Wars, ele não para de pedir pra voltar!',
    rating: 5,
    avatar: '👩',
  },
  {
    id: 2,
    name: 'Ricardo Mendes',
    role: 'Pai da Luísa, 7 anos',
    content: 'A atenção com a criança é surreal. Minha filha se sente num parque de diversões. A sala Disney é mágica!',
    rating: 5,
    avatar: '👨',
  },
  {
    id: 3,
    name: 'Fernanda Costa',
    role: 'Mãe dos gêmeos, 4 anos',
    content: 'Conseguir tratar dois gêmeos ao mesmo tempo sem choro foi um milagre! A abordagem faz toda diferença.',
    rating: 5,
    avatar: '👩',
  },
  {
    id: 4,
    name: 'Marcelo Duarte',
    role: 'Pai do João, 8 anos',
    content: 'A sala Gamer é perfeita pro meu filho. Ele fica tão concentrado no jogo que nem sente o procedimento.',
    rating: 5,
    avatar: '👨',
  },
  {
    id: 5,
    name: 'Patrícia Lima',
    role: 'Mãe da Sofia, 6 anos',
    content: 'Finalmente encontrei uma dentista que entende crianças autistas. A paciência fez toda diferença!',
    rating: 5,
    avatar: '👩',
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 md:gap-1">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        <Star
          className={`w-3 h-3 md:w-4 md:h-4 ${
            i < rating ? 'text-magic-gold fill-magic-gold' : 'text-white/20'
          }`}
        />
      </motion.div>
    ))}
  </div>
);

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 200 : -200, opacity: 0, scale: 0.9 }),
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-white/20 mb-4 md:mb-6">
            <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-magic-gold" />
            <span className="text-xs md:text-sm font-medium text-white/80">Relatórios da Frota</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
            <span className="text-white">O Que os Pais</span>{' '}
            <span className="gradient-text">Dizem</span>
          </h2>
          
          <p className="text-white/50 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Histórias reais de famílias que transformaram a experiência odontológica dos pequenos.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="relative h-[320px] sm:h-[300px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
                className="absolute w-full max-w-3xl px-2 md:px-0"
              >
                <div className="glass-strong rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 relative overflow-hidden">
                  <Quote className="absolute top-3 right-3 md:top-6 md:right-6 w-12 h-12 md:w-24 md:h-24 text-white/5 rotate-180" />
                  
                  <div className="mb-4 md:mb-6">
                    <StarRating rating={testimonials[activeIndex].rating} />
                  </div>

                  <blockquote className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 md:mb-8 relative z-10">
                    "{testimonials[activeIndex].content}"
                  </blockquote>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass flex items-center justify-center text-xl md:text-3xl">
                      {testimonials[activeIndex].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm md:text-base">
                        {testimonials[activeIndex].name}
                      </p>
                      <p className="text-xs md:text-sm text-white/50">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>

                  <div className="absolute -bottom-10 -right-10 w-24 md:w-40 h-24 md:h-40 bg-magic-gold/10 rounded-full blur-3xl" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            <motion.button
              onClick={handlePrev}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>

            <div className="flex gap-1.5 md:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-6 md:w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'w-1.5 md:w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {[
            { value: '4.9', label: 'Avaliação', icon: '⭐' },
            { value: '10K+', label: 'Pacientes', icon: '👶' },
            { value: '98%', label: 'Satisfação', icon: '💚' },
            { value: '15+', label: 'Anos', icon: '🎓' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="glass rounded-xl md:rounded-2xl p-4 md:p-6 text-center group hover:bg-white/10 transition-all"
            >
              <div className="text-2xl md:text-3xl mb-1">{stat.icon}</div>
              <div className="font-display text-xl md:text-2xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
