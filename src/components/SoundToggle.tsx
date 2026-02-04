import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useMagicSound } from '../hooks/useMagicSound';

export const SoundToggle = () => {
  const { isEnabled, toggleSound, playClick } = useMagicSound();

  const handleToggle = () => {
    toggleSound();
    // Tocar som ao ligar
    if (!isEnabled) {
      setTimeout(() => playClick(), 100);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={isEnabled ? 'Desativar sons mágicos' : 'Ativar sons mágicos'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isEnabled ? 0 : -180 }}
        transition={{ duration: 0.3 }}
      >
        {isEnabled ? (
          <Volume2 className="w-5 h-5 text-magic-gold" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/50" />
        )}
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 px-3 py-1.5 rounded-lg glass-strong text-sm whitespace-nowrap pointer-events-none"
      >
        {isEnabled ? 'Som mágico ligado' : 'Som mágico desligado'}
      </motion.div>

      {/* Glow quando ligado */}
      {isEnabled && (
        <motion.div
          className="absolute inset-0 rounded-full bg-magic-gold/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};
