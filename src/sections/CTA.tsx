'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section, Button } from '@/components/ui';
import { FadeIn } from '@/components/animations';
import { ArrowUpRightIcon, SparkleIcon } from '@/components/icons';
import { otherImages, memojiImages } from '@/assets/images';
import { scrollToElement } from '@/utils';
import { PERSONAL_INFO } from '@/constants/personal-info';

export const CTASection = () => {
  const handleContactClick = () => {
    scrollToElement('contact');
  };

  return (
    <Section className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src={otherImages.grain}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10" />

      {/* Floating elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <SparkleIcon className="w-6 h-6 text-emerald-400/30" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/4"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <SparkleIcon className="w-4 h-4 text-sky-400/30" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/3"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <SparkleIcon className="w-5 h-5 text-emerald-300/20" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="mb-8">
              {/* Avatar */}
              <motion.div
                className="relative w-24 h-24 mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src={memojiImages.smile}
                  alt="Let's work together"
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Heading */}
              <h2 className="heading-2 mb-4">
                Let's work <span className="gradient-text">together</span>
              </h2>
              
              {/* Description */}
              <p className="body-large text-gray-400 max-w-2xl mx-auto mb-8">
                Have a project in mind? Let's discuss how we can bring your ideas to life 
                with cutting-edge technology and exceptional design.
              </p>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleContactClick}
                  size="lg"
                  className="group shadow-2xl shadow-emerald-500/25"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </motion.div>
            </div>
          </FadeIn>

          {/* Stats or additional info */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">{PERSONAL_INFO.stats.projectsCompleted}</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">{PERSONAL_INFO.stats.technologies}</div>
                <div className="text-gray-400 text-sm">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">{PERSONAL_INFO.stats.experience}</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">{PERSONAL_INFO.stats.clientSatisfaction}</div>
                <div className="text-gray-400 text-sm">Client Satisfaction</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
};
