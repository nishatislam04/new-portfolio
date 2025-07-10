'use client';

import { motion } from 'framer-motion';
import { SparkleIcon } from '@/components/icons';

// Words for the tape - matching typical design samples
const tapeWords = [
  'PERFORMANT',
  'ACCESSIBLE',
  'SECURE',
  'INTERACTIVE',
  'SCALABLE',
  'RESPONSIVE',
  'USABLE',
  'RELIABLE',
];

const TapeItem = ({ word }: { word: string }) => (
  <div className="flex items-center gap-4 whitespace-nowrap">
    <SparkleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
    <span className="text-base md:text-lg font-semibold text-gray-300 uppercase tracking-[0.15em]">
      {word}
    </span>
  </div>
);

export const TapeSection = () => {
  // Create multiple copies for seamless infinite scroll
  const extendedWords = Array(4).fill(tapeWords).flat();

  return (
    <section className="py-16 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-900" />

      {/* Tape container */}
      <div className="relative">
        {/* Top border line */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-6" />

        {/* Main scrolling tape */}
        <div className="relative py-6">
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -100 * tapeWords.length],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {extendedWords.map((word, index) => (
              <TapeItem key={`${word}-${index}`} word={word} />
            ))}
          </motion.div>

          {/* Gradient fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10" />
        </div>

        {/* Bottom border line */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-6" />
      </div>
    </section>
  );
};
