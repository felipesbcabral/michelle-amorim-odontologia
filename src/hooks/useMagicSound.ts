import { useRef, useCallback, useEffect, useState } from 'react';

// Notas mágicas (escala pentatônica para som agradável)
const MAGIC_NOTES = [523.25, 659.25, 783.99, 880.00, 1046.50];
const HOVER_NOTE = 987.77;

// Singleton para compartilhar estado entre componentes
let globalAudioContext: AudioContext | null = null;
let globalMasterGain: GainNode | null = null;
let globalEnabled = true;
let listeners: ((enabled: boolean) => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(cb => cb(globalEnabled));
};

export const useMagicSound = () => {
  const [, forceUpdate] = useState({});
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
    
    // Verificar preferência salva
    const savedPref = localStorage.getItem('magic-sound-disabled');
    if (savedPref === 'true') {
      globalEnabled = false;
    }

    // Verificar reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      globalEnabled = false;
    }

    // Registrar listener
    const listener = () => forceUpdate({});
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const initAudio = useCallback(() => {
    if (isTouchDevice.current || !globalEnabled) return;
    
    if (!globalAudioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      globalAudioContext = new AudioContextClass();
      globalMasterGain = globalAudioContext.createGain();
      globalMasterGain.gain.value = 0.08;
      globalMasterGain.connect(globalAudioContext.destination);
    }

    // Resume context se estiver suspenso
    if (globalAudioContext.state === 'suspended') {
      globalAudioContext.resume();
    }
  }, []);

  const playClick = useCallback(() => {
    if (isTouchDevice.current || !globalEnabled) return;
    
    initAudio();
    
    if (!globalAudioContext || !globalMasterGain) return;

    const ctx = globalAudioContext;
    const master = globalMasterGain;
    const frequency = MAGIC_NOTES[Math.floor(Math.random() * MAGIC_NOTES.length)];
    
    // Som principal
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(master);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);

    // Brilho
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    
    shimmer.type = 'triangle';
    shimmer.frequency.setValueAtTime(frequency * 2, ctx.currentTime);
    shimmerGain.gain.setValueAtTime(0, ctx.currentTime);
    shimmerGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    shimmer.connect(shimmerGain);
    shimmerGain.connect(master);
    
    shimmer.start(ctx.currentTime);
    shimmer.stop(ctx.currentTime + 0.1);
  }, [initAudio]);

  const playHover = useCallback(() => {
    if (isTouchDevice.current || !globalEnabled) return;
    if (!globalAudioContext || !globalMasterGain) return;

    const ctx = globalAudioContext;
    const master = globalMasterGain;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(HOVER_NOTE, ctx.currentTime);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(master);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  }, []);

  const toggleSound = useCallback(() => {
    globalEnabled = !globalEnabled;
    localStorage.setItem('magic-sound-disabled', String(!globalEnabled));
    
    // Pausar/resumir audio context
    if (globalAudioContext) {
      if (!globalEnabled) {
        globalAudioContext.suspend();
      } else {
        globalAudioContext.resume();
      }
    }
    
    notifyListeners();
  }, []);

  return {
    playClick,
    playHover,
    isEnabled: globalEnabled,
    toggleSound,
    initAudio,
  };
};
