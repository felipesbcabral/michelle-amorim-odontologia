import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export const WhatsAppFAB = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dados reais
  const phoneNumber = '5561981922627';
  const message = `Olá! Gostaria de agendar uma consulta para meu filho(a).

*Nome da criança:* 
*Idade:* 
*Melhor horário:* 

Vi o site e fiquei interessado(a) nas salas temáticas! ✨`;
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          x: isVisible ? 0 : 20,
        }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-24 right-20 z-50 glass-strong px-4 py-2 rounded-xl pointer-events-none hidden md:block"
      >
        <p className="text-sm text-white font-medium">Fale conosco!</p>
        <p className="text-xs text-white/50">(61) 98192-2627</p>
      </motion.div>

      {/* Main FAB Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        {/* Pulse rings */}
        <motion.span
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        {/* Button */}
        <motion.div
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(34, 197, 94, 0.4)',
              '0 0 30px rgba(34, 197, 94, 0.6)',
              '0 0 20px rgba(34, 197, 94, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <MessageCircle className="w-7 h-7 text-white fill-white" />
          
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-royal-950" />
        </motion.div>
      </motion.a>
    </>
  );
};
