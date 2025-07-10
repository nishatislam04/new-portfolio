'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ 
    children, 
    delay = 0, 
    duration = 0.6, 
    direction = 'up', 
    distance = 20,
    ...props 
  }, ref) => {
    const getInitialPosition = () => {
      switch (direction) {
        case 'up':
          return { y: distance, opacity: 0 };
        case 'down':
          return { y: -distance, opacity: 0 };
        case 'left':
          return { x: distance, opacity: 0 };
        case 'right':
          return { x: -distance, opacity: 0 };
        default:
          return { opacity: 0 };
      }
    };

    const getFinalPosition = () => {
      switch (direction) {
        case 'up':
        case 'down':
          return { y: 0, opacity: 1 };
        case 'left':
        case 'right':
          return { x: 0, opacity: 1 };
        default:
          return { opacity: 1 };
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={getInitialPosition()}
        whileInView={getFinalPosition()}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.25, 0, 1],
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

FadeIn.displayName = 'FadeIn';

export { FadeIn };
