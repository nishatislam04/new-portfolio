import { StaticImageData } from "next/image";

export interface ProjectImage {
  src: StaticImageData | string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

export interface Technology {
  name: string;
  category?: 'frontend' | 'backend' | 'database' | 'tool' | 'cloud';
  icon?: string;
}

export interface ProjectLink {
  type: 'live' | 'github' | 'case-study' | 'demo' | 'documentation';
  url: string;
  label: string;
  icon?: string;
}

export interface ProjectResult {
  title: string;
  description?: string;
  impact?: string;
  metrics?: string;
}

export interface Project {
  // Basic Info
  id: string;
  title: string;
  company: string;
  year: string;
  status: 'completed' | 'in-progress' | 'coming-soon';
  
  // Content
  shortDescription: string;
  fullDescription?: string;
  keyFeatures: string[];
  results: ProjectResult[];
  
  // Media
  coverImage: ProjectImage;
  images?: ProjectImage[];
  videoUrl?: string;
  
  // Technical
  technologies: (string | Technology)[];
  architecture?: string[];
  challenges?: string[];
  solutions?: string[];
  
  // Links & Actions
  links: ProjectLink[];
  
  // Metadata
  category: string;
  tags: string[];
  featured: boolean;
  priority: number;
  
  // Legacy support (for backward compatibility)
  link?: string;
  image?: StaticImageData;
  description?: string;
  hasLiveDemo?: boolean;
  isPrivate?: boolean;
  isComingSoon?: boolean;
}

export interface ProjectGridProps {
  projects: Project[];
  featuredProject?: Project;
  showFeatured?: boolean;
  layout?: 'grid' | 'masonry' | 'bento';
  columns?: 2 | 3 | 4;
}

export interface ProjectCardProps {
  project: Project;
  variant?: 'compact' | 'detailed' | 'featured';
  showFullDescription?: boolean;
  onProjectClick?: (project: Project) => void;
}

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
