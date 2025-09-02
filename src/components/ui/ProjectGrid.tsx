"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { FadeIn, StaggerContainer } from "@/components/animations";

interface ProjectGridProps {
  projects: Project[];
  showFeatured?: boolean;
  layout?: 'bento' | 'grid' | 'masonry';
}

export function ProjectGrid({ 
  projects, 
  showFeatured = true, 
  layout = 'bento' 
}: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortByPriority = (arr: Project[]) => [...arr].sort((a, b) => {
    const pa = a.priority ?? 999;
    const pb = b.priority ?? 999;
    return pa - pb;
  });

  const featuredProjects = sortByPriority(projects.filter(p => p.featured));
  const regularProjects = sortByPriority(projects.filter(p => !p.featured));

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (layout === 'bento') {
    return (
      <StaggerContainer className="space-y-12">
        {/* Featured Projects Section */}
        {showFeatured && featuredProjects.length > 0 && (
          <FadeIn>
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                Featured Projects
              </h3>
              <div className="grid gap-8 lg:grid-cols-2">
                {featuredProjects.slice(0, 2).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      variant="featured"
                      onProjectClick={handleProjectClick}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Regular Projects Bento Grid */}
        {regularProjects.length > 0 && (
          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
                All Projects
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {regularProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}
                      ${index === 3 ? 'lg:col-span-2' : ''}
                    `}
                  >
                    <ProjectCard
                      project={project}
                      variant={index === 0 || index === 3 ? "detailed" : "compact"}
                      onProjectClick={handleProjectClick}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </StaggerContainer>
    );
  }

  // Standard grid layout fallback
  return (
    <StaggerContainer>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard
              project={project}
              variant="compact"
              onProjectClick={handleProjectClick}
            />
          </motion.div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </StaggerContainer>
  );
}
