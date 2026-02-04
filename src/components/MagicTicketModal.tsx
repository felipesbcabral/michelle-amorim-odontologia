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
          {/* Backdrop - simplified for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/90 md:backdrop-blur-sm"
            onClick={onClose}
          >
            {/* Ticket Container - simpler animation for mobile */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                duration: 0.25,
                ease: "easeOut"
              }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Outer Glow Effect - static on mobile */}
              <div
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 opacity-40 blur-xl"
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
                  
                  {/* Animated Icon - simplified for mobile */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    {/* Static rings - no rotation on mobile */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-400/30 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-amber-500/20 animate-[spin_15s_linear_infinite_reverse]" />

                    {/* Icon Container - simplified animation */}
                    <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.5)]">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Rocket className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>

                    {/* Static sparkles */}
                    <div className="absolute -top-2 -right-2 animate-pulse">
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 animate-pulse delay-300">
                      <Star className="w-5 h-5 text-amber-300" />
                    </div>
                  </div>

                  {/* Badge - static */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 mb-4">
                    <Shield className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400 text-xs font-semibold uppercase tracking-wider">Autorizado</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300">
                      ✨ PASSAPORTE DA MISSÃO ✨
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-white/70 text-sm md:text-base mb-2">
                    O Multiverso espera por você!
                  </p>

                  <p className="text-white/50 text-xs md:text-sm mb-6">
                    Prepare o sorriso para uma aventura inesquecível
                  </p>

                  {/* Ticket Details */}
                  <div className="bg-black/20 rounded-xl p-4 mb-6 border border-white/5">
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
                  </div>

                  {/* Confirm Button - simplified */}
                  <button
                    onClick={handleConfirm}
                    className="relative w-full group active:scale-[0.98] transition-transform"
                  >
                    {/* Static Button Glow */}
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white font-bold text-sm md:text-base overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                      <MessageCircle className="w-5 h-5" />
                      <span>Confirmar Embarque no WhatsApp</span>
                    </div>
                  </button>

                  {/* Helper Text */}
                  <p className="text-white/30 text-xs mt-4">
                    Clique para abrir o WhatsApp e falar diretamente com a Base
                  </p>
                </div>

                {/* Bottom Decorative Pattern */}
                <div className="h-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />
              </div>

              {/* Simplified floating particles - fewer and slower */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400/60 animate-pulse"
                  style={{
                    top: `${25 + i * 15}%`,
                    left: i % 2 === 0 ? '-10px' : 'calc(100% + 10px)',
                    animationDelay: `${i * 0.3}s`,
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
