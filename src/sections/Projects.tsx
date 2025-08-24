import { Section, ProjectGrid } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { PERSONAL_INFO } from "@/constants/personal-info";
import { Project } from "@/types/project";
import ProjectCTA from "./subComponents/ProjectCTA";

export default function ProjectsSection() {
	// Convert legacy project data to new Project type
	const projects: Project[] = PERSONAL_INFO.portfolioProjects.map((project) => ({
		...project,
		coverImage: project.coverImage || {
			src: project.image!,
			alt: `${project.title} Screenshot`,
			priority: project.featured
		},
		links: project.links || (project.link && project.link !== '#' ? [{
			type: 'live' as const,
			url: project.link,
			label: 'View Project'
		}] : []),
		shortDescription: project.shortDescription || project.description || '',
		keyFeatures: project.keyFeatures || [],
		tags: project.tags || [],
		featured: project.featured ?? false,
		priority: project.priority || 1,
		status: project.status || 'completed' as const,
		category: project.category || 'Web Application'
	}));

	return (
		<Section id="projects" className="relative pb-16 lg:py-24" containerSize="xl">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center flex flex-col justify-center mb-16">
							<h2 className="heading-2 uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
								Featured <span className="gradient-text">Projects</span>
							</h2>
							<p className="body-large text-gray-400 max-w-3xl mx-auto pt-4 text-base">
								Showcasing my professional contributions and personal projects, featuring comprehensive web applications with real-world impact, advanced functionality, and modern technology stacks.
							</p>
						</div>
					</FadeIn>

					{/* New Flexible Project Grid */}
					<ProjectGrid 
						projects={projects}
						showFeatured={true}
						layout="bento"
					/>

					{/* Call-to-action */}
					<FadeIn delay={0.4}>
						<ProjectCTA />
					</FadeIn>
				</StaggerContainer>
			</div>
		</Section>
	);
}
