import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Crown, Sparkles, X, MessageCircle, Star, Shield } from 'lucide-react';
import { useEffect } from 'react';

interface MagicTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MagicTicketModal = ({ isOpen, onClose }: MagicTicketModalProps) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // WhatsApp data
  const phoneNumber = '5561981922627';
  const message = `🚀 *PASSAPORTE DA MISSÃO* 🚀\n\nOlá! Gostaria de agendar uma consulta para meu filho(a).\n\n*Nome da criança:* \n*Idade:* \n*Melhor dia/horário:* \n\nEstamos prontos para a aventura! ✨`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleConfirm = () => {
    // Add a small delay for the animation before redirecting
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={onClose}
          >
            {/* Ticket Container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.1
              }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Outer Glow Effect */}
              <motion.div
                className="absolute -inset-1 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                  filter: 'blur(20px)',
                  opacity: 0.4,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main Ticket Card */}
              <div 
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 215, 0, 0.5)',
                  boxShadow: '0 0 60px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Decorative Top Bar */}
                <div className="h-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>

                {/* Content */}
                <div className="p-6 md:p-8 text-center">
                  
                  {/* Animated Icon */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    {/* Outer rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Middle ring */}
                    <motion.div
                      className="absolute inset-2 rounded-full border border-amber-500/20"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Icon Container */}
                    <motion.div
                      className="absolute inset-4 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(255, 215, 0, 0.4)',
                          '0 0 40px rgba(255, 215, 0, 0.6)',
                          '0 0 20px rgba(255, 215, 0, 0.4)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Rocket className="w-10 h-10 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Sparkles */}
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-1 -left-1"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <Star className="w-5 h-5 text-amber-300" />
                    </motion.div>
                  </div>

                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 mb-4"
                  >
                    <Shield className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Autorizado</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-display text-2xl md:text-3xl font-bold mb-2"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300">
                      ✨ PASSAPORTE DA MISSÃO ✨
                    </span>
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/70 text-sm md:text-base mb-2"
                  >
                    O Multiverso espera por você!
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-white/50 text-xs md:text-sm mb-8"
                  >
                    Prepare o sorriso para uma aventura inesquecível
                  </motion.p>

                  {/* Ticket Details */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-black/20 rounded-xl p-4 mb-6 border border-white/5"
                  >
                    <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                      <span>DESTINO</span>
                      <span>DATA</span>
                    </div>
                    <div className="flex items-center justify-between text-white text-sm font-medium">
                      <span className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-magic-gold" />
                        Reino dos Sorrisos
                      </span>
                      <span>A Definir</span>
                    </div>
                  </motion.div>

                  {/* Confirm Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirm}
                    className="relative w-full group"
                  >
                    {/* Button Glow */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 opacity-70 blur-sm group-hover:opacity-100 transition-opacity"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: '200% 200%' }}
                    />
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white font-bold text-sm md:text-base overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      />
                      <MessageCircle className="w-5 h-5" />
                      <span>Confirmar Embarque no WhatsApp</span>
                    </div>
                  </motion.button>

                  {/* Helper Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-white/30 text-xs mt-4"
                  >
                    Clique para abrir o WhatsApp e falar diretamente com a Base
                  </motion.p>
                </div>

                {/* Bottom Decorative Pattern */}
                <div className="h-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Floating particles around ticket */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-400"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: i % 2 === 0 ? '-20px' : 'calc(100% + 20px)',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
