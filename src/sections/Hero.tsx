'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section, Button } from '@/components/ui';
import { FadeIn, StaggerContainer } from '@/components/animations';
import { ArrowDownIcon, ArrowUpRightIcon, StarIcon } from '@/components/icons';
import { memojiImages, otherImages } from '@/assets/images';
import { scrollToElement } from '@/utils';
import { PERSONAL_INFO } from '@/constants/personal-info';

// Star component for background decoration
const Star = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0.5, 1],
      scale: [0, 1, 0.8, 1],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    <StarIcon className="w-4 h-4 text-yellow-400/60" />
  </motion.div>
);

export const HeroSection = () => {
  const handleScrollToProjects = () => {
    scrollToElement('projects');
  };

  const handleScrollToContact = () => {
    scrollToElement('contact');
  };

  return (
    <Section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src={otherImages.grain}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Solar/Space themed background */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20" />

        {/* Solar glow effect */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-yellow-400/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/5 w-64 h-64 bg-gradient-radial from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0">
        <Star className="top-1/6 left-1/6" delay={0} />
        <Star className="top-1/4 right-1/5" delay={1} />
        <Star className="top-2/3 left-1/4" delay={2} />
        <Star className="top-1/2 right-1/3" delay={0.5} />
        <Star className="bottom-1/4 left-1/3" delay={1.5} />
        <Star className="bottom-1/6 right-1/6" delay={2.5} />
        <Star className="top-1/3 left-2/3" delay={3} />
        <Star className="bottom-1/3 right-2/3" delay={0.8} />
      </div>

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96 border border-white/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] border border-white/3 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 w-full">
        <StaggerContainer className="text-center">
          {/* Avatar with solar glow */}
          <FadeIn delay={0.2}>
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Solar glow behind avatar */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-orange-500/10 to-transparent rounded-full blur-xl scale-150" />

              <div className="relative w-full h-full bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full border border-yellow-400/20">
                <Image
                  src={memojiImages.computer}
                  alt="Avatar"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </FadeIn>

          {/* Main heading */}
          <FadeIn delay={0.4}>
            <h1 className="heading-1 mb-6">
              <span className="block text-white">Hi, I'm</span>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.6}>
            <p className="body-large text-gray-300 mb-8 max-w-2xl mx-auto">
              {PERSONAL_INFO.profile}
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={handleScrollToProjects}
                className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg shadow-yellow-500/25"
              >
                <StarIcon className="w-4 h-4" />
                View My Work
                <ArrowDownIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>

              <Button
                variant="secondary"
                onClick={handleScrollToContact}
                className="group border-yellow-400/30 hover:border-yellow-400/50 hover:bg-yellow-400/10"
              >
                Let's Connect
                <ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </div>
          </FadeIn>


        </StaggerContainer>
      </div>

      {/* Additional decorative planets/celestial bodies */}
      <motion.div
        className="absolute top-1/6 left-1/12 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/6 right-1/12 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-50"
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-2/3 left-1/6 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-40"
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </Section>
  );
};
