"use client";

import Image from "next/image";
import { Project } from "@/types/project";
import { Button, Dialog, DialogContent, DialogClose, ImageCarousel } from "@/components/ui";
import { TechBadges } from "@/components/ui/TechBadges";
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
  if (!project) return null;

  // Technologies are rendered via shared TechBadges component

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogClose onClose={onClose}>
        <XIcon className="w-5 h-5 text-gray-300" />
      </DialogClose>

      <DialogContent>
        {/* Hero Section */}
        <div className="relative h-80 md:h-96 lg:h-[28rem]">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            className={'object-contain object-center'}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* Project Title Overlay */}
          <div className="absolute bottom-8 left-8 right-20">
            <div className="flex items-center gap-4 mb-3">
              <span className="px-4 py-2 text-sm bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 font-medium">
                {project.category}
              </span>
              <span className="px-4 py-2 text-sm bg-gray-500/20 text-gray-300 rounded-full border border-gray-500/30">
                {project.year}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {project.title}
            </h1>
            <p className="text-emerald-400 font-medium text-lg">{project.company}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 lg:p-12 space-y-10">
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
            <h2 className="text-2xl font-semibold text-white mb-6">Project Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg max-w-4xl">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-colors">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">Technologies Used</h2>
            <TechBadges items={project.technologies} size="md" />
          </div>

          {/* Architecture & Technical Details */}
          {(project.architecture || project.challenges || project.solutions) && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Technical Details</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {project.architecture && (
                  <div className="bg-gray-800/20 p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Architecture
                    </h3>
                    <ul className="space-y-3">
                      {project.architecture.map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.challenges && (
                  <div className="bg-gray-800/20 p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      Challenges
                    </h3>
                    <ul className="space-y-3">
                      {project.challenges.map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.solutions && (
                  <div className="bg-gray-800/20 p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Solutions
                    </h3>
                    <ul className="space-y-3">
                      {project.solutions.map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results & Impact */}
          {project.results && project.results.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Results & Impact</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {project.results.map((result, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 rounded-xl border border-emerald-500/20 hover:border-emerald-500/30 transition-colors">
                    <h4 className="text-white font-semibold mb-3 text-lg">{result.title}</h4>
                    {result.impact && (
                      <p className="text-emerald-400 font-medium mb-2">{result.impact}</p>
                    )}
                    {result.description && (
                      <p className="text-gray-300">{result.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Gallery Carousel */}
          {project.images && project.images.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-8">Project Gallery</h2>
              <ImageCarousel 
                images={project.images}
                autoPlay={true}
                autoPlayInterval={5000}
                showThumbnails={true}
                className="w-full"
                imageFit={'contain'}
              />
            </div>
          )}

          {/* Video Demo */}
          {project.videoUrl && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-8">Demo Video</h2>
              <div className="aspect-video rounded-lg overflow-hidden border border-gray-700/30">
                <iframe
                  src={project.videoUrl}
                  title={`${project.title} Demo`}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
