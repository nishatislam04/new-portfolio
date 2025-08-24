"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project, Technology } from "@/types/project";
import { Button, ImageCarousel } from "@/components/ui";
import { cn } from "@/lib/utils";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import XIcon from "@/assets/icons/minified/x.svg";
import GithubIcon from "@/assets/icons/minified/github.svg";
import PlayIcon from "@/assets/icons/minified/play.svg";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll and maintain position
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Restore body scroll and position
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const renderTechnologies = (technologies: (string | Technology)[]) => {
    return (
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => {
          const techName = typeof tech === 'string' ? tech : tech.name;
          const techCategory = typeof tech === 'object' ? tech.category : undefined;
          
          return (
            <span
              key={index}
              className={cn(
                "px-3 py-1 text-sm rounded-full font-medium border",
                techCategory === 'frontend' && "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
                techCategory === 'backend' && "bg-blue-500/10 text-blue-300 border-blue-500/30",
                techCategory === 'database' && "bg-purple-500/10 text-purple-300 border-purple-500/30",
                techCategory === 'cloud' && "bg-orange-500/10 text-orange-300 border-orange-500/30",
                techCategory === 'tool' && "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
                !techCategory && "bg-gray-500/10 text-gray-300 border-gray-500/30"
              )}
            >
              {techName}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-[90vw] h-[90vh] bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-colors"
            >
              <XIcon className="w-5 h-5 text-gray-300" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-full">
              {/* Hero Section */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={project.coverImage.src}
                  alt={project.coverImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                
                {/* Project Title Overlay */}
                <div className="absolute bottom-6 left-6 right-16">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-sm bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 font-medium">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 text-sm bg-gray-500/20 text-gray-300 rounded-full border border-gray-500/30">
                      {project.year}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h1>
                  <p className="text-emerald-400 font-medium">{project.company}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Action Buttons */}
                {(project.links && project.links.length > 0) && (
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, index) => (
                      <Button
                        key={index}
                        onClick={() => window.open(link.url, "_blank")}
                        className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-white"
                      >
                        {link.type === 'github' ? <GithubIcon className="w-4 h-4" /> :
                         link.type === 'demo' ? <PlayIcon className="w-4 h-4" /> :
                         <ArrowUpRightIcon className="w-4 h-4" />}
                        {link.label}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {project.fullDescription || project.shortDescription}
                  </p>
                </div>

                {/* Key Features */}
                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Key Features</h2>
                    <div className="grid gap-3 md:grid-cols-2">
                      {project.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Technologies Used</h2>
                  {renderTechnologies(project.technologies)}
                </div>

                {/* Architecture & Technical Details */}
                {(project.architecture || project.challenges || project.solutions) && (
                  <div className="grid gap-6 md:grid-cols-3">
                    {project.architecture && (
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Architecture</h3>
                        <ul className="space-y-2">
                          {project.architecture.map((item, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                              <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.challenges && (
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Challenges</h3>
                        <ul className="space-y-2">
                          {project.challenges.map((item, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.solutions && (
                      <div>
                        <h3 className="text-lg font-medium text-white mb-3">Solutions</h3>
                        <ul className="space-y-2">
                          {project.solutions.map((item, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Results & Impact */}
                {project.results && project.results.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Results & Impact</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {project.results.map((result, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-lg border border-emerald-500/20">
                          <h4 className="text-white font-medium mb-2">{result.title}</h4>
                          {result.impact && (
                            <p className="text-emerald-400 text-sm font-medium mb-1">{result.impact}</p>
                          )}
                          {result.description && (
                            <p className="text-gray-400 text-sm">{result.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Gallery Carousel */}
                {project.images && project.images.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">Project Gallery</h2>
                    <ImageCarousel 
                      images={project.images}
                      autoPlay={true}
                      autoPlayInterval={5000}
                      showThumbnails={true}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Video Demo */}
                {project.videoUrl && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Demo Video</h2>
                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-700/30">
                      <iframe
                        src={project.videoUrl}
                        title={`${project.title} Demo`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
