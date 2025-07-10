'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import { NAV_ITEMS } from '@/constants';
import { scrollToElement, cn } from '@/utils';
import { useActiveSection } from '@/hooks/useActiveSection';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const elementId = href.replace('#', '');
    scrollToElement(elementId);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
    >
      <Container>
        <div className="flex items-center justify-center py-6">
          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-full px-1 py-1 border border-white/10">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.button
                    key={item.name}
                    className={cn(
                      "px-6 py-3 text-sm transition-all duration-200 rounded-full relative",
                      isActive
                        ? "text-white bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    )}
                    onClick={() => handleNavClick(item.href)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 absolute right-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className={cn(
                'w-6 h-0.5 bg-white transition-all duration-300',
                isMenuOpen && 'rotate-45 translate-y-1.5'
              )}
            />
            <motion.span
              className={cn(
                'w-6 h-0.5 bg-white transition-all duration-300',
                isMenuOpen && 'opacity-0'
              )}
            />
            <motion.span
              className={cn(
                'w-6 h-0.5 bg-white transition-all duration-300',
                isMenuOpen && '-rotate-45 -translate-y-1.5'
              )}
            />
          </motion.button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Container>
              <nav className="py-6 space-y-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.name}
                    className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-2"
                    onClick={() => handleNavClick(item.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
