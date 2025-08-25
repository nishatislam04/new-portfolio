"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectImage } from "@/types/project";
import { cn } from "@/lib/utils";
import ChevronLeftIcon from "@/assets/icons/minified/chevron-left.svg";
import ChevronRightIcon from "@/assets/icons/minified/chevron-right.svg";

interface ImageCarouselProps {
  images: ProjectImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  className?: string;
}

export function ImageCarousel({ 
  images, 
  autoPlay = true, 
  autoPlayInterval = 4000,
  showThumbnails = true,
  className 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize auto-play when component mounts
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    console.log('Carousel auto-play state:', { isPlaying, autoPlay, imagesLength: images.length, autoPlayInterval });
    if (!isPlaying || images.length <= 1) return;

    console.log('Starting carousel auto-play interval');
    const interval = setInterval(() => {
      console.log('Auto-play tick - advancing slide');
      nextSlide();
    }, autoPlayInterval);
    
    return () => {
      console.log('Clearing carousel auto-play interval');
      clearInterval(interval);
    };
  }, [isPlaying, nextSlide, autoPlayInterval, images.length]);

  // Pause auto-play on hover (only if autoPlay is enabled)
  const handleMouseEnter = () => {
    if (autoPlay) setIsPlaying(false);
  };
  const handleMouseLeave = () => {
    if (autoPlay) setIsPlaying(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (images.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Carousel */}
      <div 
        className="relative aspect-video rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700/30 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            
            {/* Image Caption Overlay */}
            {images[currentIndex].caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <p className="text-white text-sm md:text-base font-medium">
                  {images[currentIndex].caption}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-emerald-400 w-6" 
                    : "bg-white/50 hover:bg-white/70"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        {autoPlay && images.length > 1 && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={cn(
              "px-2 py-1 text-xs rounded-full backdrop-blur-sm border",
              isPlaying 
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" 
                : "bg-gray-500/20 text-gray-300 border-gray-500/30"
            )}>
              {isPlaying ? "Auto" : "Paused"}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300",
                index === currentIndex 
                  ? "border-emerald-400 ring-2 ring-emerald-400/30" 
                  : "border-gray-600 hover:border-gray-500"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-emerald-400/20" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center">
          <span className="text-sm text-gray-400">
            {currentIndex + 1} of {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
