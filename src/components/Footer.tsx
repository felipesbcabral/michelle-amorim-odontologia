import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, ArrowUpRight, Heart, Navigation } from 'lucide-react';
import { MagicButton } from './MagicButton';

const quickLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Mundos', href: '#worlds' },
  { label: 'Sobre', href: '#about' },
  { label: 'Tecnologia', href: '#tech' },
  { label: 'Depoimentos', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
];

const contactInfo = [
  { 
    icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />, 
    label: 'Endereço', 
    value: 'Centro Clínico do Lago', 
    subvalue: 'QI 09 Bloco E2 Sala 201 - Lago Sul, Brasília/DF' 
  },
  { 
    icon: <Phone className="w-4 h-4 md:w-5 md:h-5" />, 
    label: 'WhatsApp', 
    value: '(61) 98192-2627', 
    subvalue: 'Clique para conversar' 
  },
  { 
    icon: <Mail className="w-4 h-4 md:w-5 md:h-5" />, 
    label: 'Email', 
    value: 'contato@michelleamorim.com', 
    subvalue: 'Respondemos em 24h' 
  },
  { 
    icon: <Clock className="w-4 h-4 md:w-5 md:h-5" />, 
    label: 'Horário', 
    value: 'Seg-Sex: 08h às 18h', 
    subvalue: 'Sáb: 09h às 13h' 
  },
];

interface FooterProps {
  onAgendarClick?: () => void;
}

export const Footer = ({ onAgendarClick }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-purple-500/10 blur-3xl" />

      <div className="relative pt-12 md:pt-20 pb-6 md:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-16 rounded-2xl md:rounded-3xl overflow-hidden glass-strong"
          >
            <div className="grid md:grid-cols-3">
              <div className="md:col-span-2 h-64 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.1234567890123!2d-47.87512345678901!3d-15.847123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDUwJzQ5LjYiUyA0N8KwNTInMzAuNCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-royal-900/50 to-transparent">
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className="w-5 h-5 text-magic-gold" />
                  <h3 className="font-bold text-white text-lg">Como Chegar</h3>
                </div>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Centro Clínico do Lago<br />
                  QI 09, Bloco E2, Sala 201<br />
                  Lago Sul, Brasília - DF<br />
                  CEP: 71625-176
                </p>

                <div className="space-y-2 text-sm">
                  <p className="text-white/50">
                    <span className="text-green-400">✓</span> Estacionamento gratuito
                  </p>
                  <p className="text-white/50">
                    <span className="text-green-400">✓</span> Fácil acesso
                  </p>
                  <p className="text-white/50">
                    <span className="text-green-400">✓</span> Ambiente família
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/dir//Centro+Cl%C3%ADnico+do+Lago+-+St.+de+Habita%C3%A7%C3%B5es+Individuais+Sul+QI+09+-+Lago+Sul,+Bras%C3%ADlia+-+DF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Ver rotas no Google Maps</span>
                </a>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">M</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base md:text-lg">
                    Dra. Michelle Amorim
                  </h3>
                  <p className="text-[10px] md:text-xs text-white/50">Odontopediatria Premium</p>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                Transformando a experiência odontológica infantil em uma 
                aventura mágica. Onde a ciência encontra o encanto.
              </p>

              <div className="flex gap-2 md:gap-3">
                <motion.a
                  href="https://www.instagram.com/dramichelleamorim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-pink-400 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-white mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base">
                <span className="w-6 md:w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
                Links Rápidos
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm md:text-base"
                    >
                      <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-white mb-4 md:mb-6 flex items-center gap-2 text-sm md:text-base">
                <span className="w-6 md:w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
                Contato
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-2.5 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl glass flex items-center justify-center text-purple-400 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-white text-xs md:text-sm font-medium">{item.value}</p>
                      <p className="text-white/50 text-[10px] md:text-xs">{item.subvalue}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-strong rounded-xl md:rounded-2xl p-5 md:p-6">
              <h4 className="font-bold text-white mb-3 md:mb-4 text-sm md:text-base">
                Agende sua Consulta
              </h4>
              <p className="text-white/60 text-xs md:text-sm mb-4">
                Primeira avaliação gratuita para novos pacientes.
              </p>
              <MagicButton 
                onClick={onAgendarClick}
                className="w-full text-xs md:text-sm py-2.5"
                icon={<Phone className="w-3 h-3 md:w-4 md:h-4" />}
              >
                Agendar pelo WhatsApp
              </MagicButton>
            </div>
          </div>

          <div className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 mb-12 md:mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10" />
            <div className="absolute -right-20 -top-20 w-40 md:w-64 h-40 md:h-64 bg-purple-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                  Pronto para a Aventura?
                </h3>
                <p className="text-white/60 text-sm md:text-base">
                  Agende agora e ganhe uma consulta de avaliação gratuita.
                </p>
              </div>
              <MagicButton 
                onClick={onAgendarClick}
                icon={<Phone className="w-4 h-4 md:w-5 md:h-5" />} 
                className="text-sm md:text-base whitespace-nowrap"
              >
                Agendar Consulta
              </MagicButton>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 pt-6 md:pt-8 border-t border-white/10">
            <p className="text-white/40 text-xs md:text-sm flex items-center gap-1 text-center sm:text-left">
              Feito com <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-400 fill-red-400" /> em Brasília
            </p>
            
            <p className="text-white/40 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} Dra. Michelle Amorim. Todos os direitos reservados.
            </p>

            <motion.button
              onClick={scrollToTop}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Voltar ao topo"
            >
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 -rotate-45" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
