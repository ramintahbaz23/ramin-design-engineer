'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

type AnimatedPageVariant = 'default' | 'dramatic';

type AnimatedPageProps = {
  children: ReactNode;
  className?: string;
  variant?: AnimatedPageVariant;
};

export default function AnimatedPage({ children, className, variant = 'default' }: AnimatedPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const configs = {
    default: {
      initial: { opacity: 0, y: 24, filter: 'blur(20px)' },
      animate: {
        opacity: [0, 1, 1],
        y: [24, 8, 0],
        filter: ['blur(20px)', 'blur(8px)', 'blur(0px)'],
      },
      transition: {
        duration: 1.0,
        delay: 0.06,
        ease: [0.22, 1, 0.36, 1],
        opacity: { times: [0, 0.5, 1] },
        y: { times: [0, 0.65, 1] },
        filter: { times: [0, 0.65, 1] },
      },
    },
    dramatic: {
      // Same slide depth as default, but with a longer, more drawn-out reveal
      initial: { opacity: 0, y: 24, filter: 'blur(24px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: {
        delay: 0.08,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.9 },
        y: { duration: 1.2 },
        filter: { duration: 1.4 },
      },
    },
  } as const;

  const config = configs[variant] ?? configs.default;

  return (
    <motion.div
      className={className}
      style={{ overflow: 'visible', overflowY: 'visible' }}
      initial={config.initial}
      animate={config.animate}
      transition={config.transition}
    >
      {children}
    </motion.div>
  );
}








