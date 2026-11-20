import type { Variants, Transition } from 'motion/react';

/**
 * Centralized Motion Design Tokens — Euro Hambúrgueria Design System
 * Preserves compositor-only animations (transform, opacity) and low-latency feedback.
 */
export const MOTION = {
  duration: {
    fast: 0.16,
    normal: 0.34,
    slow: 0.56,
    cinematic: 0.8,
  },
  ease: {
    smooth: [0.16, 1, 0.3, 1] as const,
    ember: [0.22, 1, 0.36, 1] as const,
    crisp: [0.2, 0, 0, 1] as const,
  },
  stagger: {
    tight: 0.045,
    grid: 0.06,
    section: 0.09,
  },
  viewport: {
    once: true,
    amount: 0.14,
  } as const,
};

export const fastTransition: Transition = {
  duration: MOTION.duration.fast,
  ease: MOTION.ease.crisp,
};

export const normalTransition: Transition = {
  duration: MOTION.duration.normal,
  ease: MOTION.ease.smooth,
};

export const cinematicTransition: Transition = {
  duration: MOTION.duration.cinematic,
  ease: MOTION.ease.ember,
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.duration.slow,
      ease: MOTION.ease.smooth,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION.stagger.grid,
      delayChildren: 0.04,
    },
  },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: MOTION.duration.normal,
      ease: MOTION.ease.smooth,
    },
  },
};
