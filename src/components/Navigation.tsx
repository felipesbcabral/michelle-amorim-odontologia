import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { MagicButton } from './MagicButton';

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Mundos', href: '#worlds' },
  { label: 'Transformações', href: '#transformacoes' },
  { label: 'Sobre', href: '#about' },
  { label: 'Tecnologia', href: '#tech' },
  { label: 'FAQ', href: '#faq' },
];

interface NavigationProps {
  onAgendarClick?: () => void;
}

export const Navigation = ({ onAgendarClick }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled 
            ? 'py-2 md:py-3 glass-strong border-b border-white/10' 
            : 'py-3 md:py-6 bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a 
              href="#"
              className="flex items-center gap-2 md:gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">M</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-bold text-white text-sm md:text-base leading-tight">
                  Dra. Michelle
                </p>
                <p className="text-[10px] md:text-xs text-white/50">Amorim</p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-xs xl:text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <motion.a
                href="https://maps.google.com/?q=Centro+Clinico+do+Lago+QI+09+Bloco+E2+Sala+201"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg glass text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs"
              >
                <MapPin className="w-3 h-3" />
                <span>Lago Sul, Brasília</span>
              </motion.a>

              <motion.a
                href="https://wa.me/5561981922627?text=Olá!%20Gostaria%20de%20agendar..."
                target="_blank"
                rel="noopener noreferrer"
                className="lg:hidden w-9 h-9 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-4 h-4 text-green-400" />
              </motion.a>

              <div className="hidden lg:block">
                <MagicButton 
                  onClick={onAgendarClick}
                  variant="primary" 
                  className="!py-2 !px-4 xl:!py-2.5 xl:!px-6 text-xs xl:text-sm"
                  icon={<Phone className="w-3 h-3 xl:w-4 xl:h-4" />}
                >
                  Agendar
                </MagicButton>
              </div>

              <button
                className="lg:hidden w-9 h-9 rounded-lg glass flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[280px] sm:w-80 glass-strong p-6 pt-20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-base font-medium text-white hover:text-magic-gold transition-colors py-3 border-b border-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <MagicButton 
                    onClick={() => {
                      onAgendarClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-center text-sm"
                    icon={<Phone className="w-4 h-4" />}
                  >
                    Agendar pelo WhatsApp
                  </MagicButton>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-6 border-t border-white/10 space-y-4"
                >
                  <div>
                    <p className="text-xs text-white/50 mb-1">Endereço</p>
                    <p className="text-sm text-white/70">Centro Clínico do Lago</p>
                    <p className="text-sm text-white/70">QI 09, Bloco E2, Sala 201</p>
                    <p className="text-sm text-white/70">Lago Sul, Brasília/DF</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">WhatsApp</p>
                    <p className="text-sm text-white/70">(61) 98192-2627</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Horário</p>
                    <p className="text-sm text-white/70">Seg-Sex: 08h às 18h</p>
                    <p className="text-sm text-white/70">Sáb: 09h às 13h</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
