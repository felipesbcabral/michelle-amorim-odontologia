import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { HelpCircle, Plus, Minus, MessageCircle } from 'lucide-react';

interface FAQ {
  pergunta: string;
  resposta: string;
  categoria: string;
}

const faqs: FAQ[] = [
  {
    pergunta: 'A partir de qual idade devo levar meu filho ao dentista?',
    resposta: 'A recomendação da Sociedade Brasileira de Odontopediatria é que a primeira consulta ocorra aos 6 meses de idade, quando nascem os primeiros dentinhos, ou até o 1º aniversário. Quanto mais cedo, melhor! Assim prevenimos problemas e criamos uma relação de confiança com o dentista desde cedo.',
    categoria: 'Primeira Consulta',
  },
  {
    pergunta: 'Vocês aceitam plano de saúde?',
    resposta: 'Sim! Trabalhamos com os principais planos de saúde do mercado: Amil, Bradesco, SulAmérica e Unimed. Também atendemos particulares com condições especiais de pagamento. Entre em contato para verificar se o seu plano é aceito e os procedimentos cobertos.',
    categoria: 'Convênios',
  },
  {
    pergunta: 'O tratamento dói? Como vocês lidam com crianças ansiosas?',
    resposta: 'Nossa abordagem é 100% livre de trauma! Utilizamos anestesia computadorizada (The Wand), que é praticamente indolor, além de técnicas de relaxamento e distração. As salas temáticas ajudam muito - as crianças se divertem tanto que esquecem do tratamento. Para casos mais complexos, tenho formação em psicologia para lidar com ansiedade.',
    categoria: 'Tratamento',
  },
  {
    pergunta: 'Quanto tempo dura uma consulta?',
    resposta: 'A primeira consulta (avaliação) dura cerca de 40-50 minutos. Consultas de acompanhamento variam de 20 a 40 minutos, dependendo do procedimento. Nunca corremos! Cada criança tem seu tempo e respeitamos isso.',
    categoria: 'Consulta',
  },
  {
    pergunta: 'Preciso ir com meu filho à consulta?',
    resposta: 'Sim, é obrigatório a presença de um responsável legal (pai, mãe ou responsável com autorização). Além de questões de segurança, a presença do responsável ajuda a criança a se sentir mais segura e é importante para discutirmos hábitos alimentares e de higiene em casa.',
    categoria: 'Consulta',
  },
  {
    pergunta: 'Vocês trabalham com ortopedia facial (aparelhos)?',
    resposta: 'Sim! Sou especialista em Ortopedia Funcional dos Maxilares. Trabalhamos com expansores, aparelhos removíveis e outros dispositivos para correção da respiração, mordida e desenvolvimento facial harmonioso. Começamos esse acompanhamento precoce, a partir dos 4-5 anos.',
    categoria: 'Tratamento',
  },
  {
    pergunta: 'Onde fica a clínica? Tem estacionamento?',
    resposta: 'Ficamos no Centro Clínico do Lago, Lago Sul - um local de fácil acesso com estacionamento próprio e gratuito para pacientes. O endereço completo é: St. de Habitações Individuais Sul QI 09, Bloco E2 Sala 201.',
    categoria: 'Localização',
  },
  {
    pergunta: 'Qual o horário de funcionamento?',
    resposta: 'Funcionamos de segunda a sexta-feira, das 08:00 às 18:00, e aos sábados das 09:00 às 13:00. Oferecemos horários flexíveis para adaptar à rotina escolar das crianças.',
    categoria: 'Horários',
  },
];

export const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 md:mb-6">
            <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-magic-gold" />
            <span className="text-sm font-medium text-white/80">Dúvidas Frequentes</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Perguntas</span>{' '}
            <span className="gradient-text">Frequentes</span>
          </h2>
          
          <p className="text-white/60 text-base md:text-lg">
            Tire suas dúvidas sobre nossos tratamentos e agendamentos
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl md:rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="hidden sm:inline-block px-2 py-1 rounded-full bg-white/5 text-white/40 text-[10px] md:text-xs">
                    {faq.categoria}
                  </span>
                  <span className="font-medium text-white text-sm md:text-base leading-snug">
                    {faq.pergunta}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-magic-gold" />
                  ) : (
                    <Plus className="w-4 h-4 text-white/60" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 md:px-6 md:pb-5 pt-0">
                      <div className="h-px bg-white/10 mb-3 md:mb-4" />
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        {faq.resposta}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="text-white/50 text-sm mb-3">Ainda tem dúvidas?</p>
          <a
            href="https://wa.me/5561981922627?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20o%20tratamento..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-colors text-white"
          >
            <MessageCircle className="w-5 h-5 text-green-400" />
            <span>Falar pelo WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
