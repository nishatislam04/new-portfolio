import { FadeIn, StaggerContainer } from "@/components/animations";
import { ProjectGrid, Section } from "@/components/ui";
import { PERSONAL_INFO } from "@/constants/personal-info";
import type { Project } from "@/types/project";
import ProjectCTA from "./_components/ProjectCTA";
import ProjectHeader from "./_components/projectHeader";

export default function ProjectsSection() {
	// Convert legacy project data to new Project type
	// ignore this type error. as we will discard it later anyway

	const projects: Project[] = PERSONAL_INFO.portfolioProjects.map(
		(project) => ({
			...project,
			slug: project.id,
			coverImage: project.coverImage || {
				src: project.image || "",
				alt: `${project.title} Screenshot`,
				priority: project.featured,
			},
			links:
				project.links ||
				(project.link && project.link !== "#"
					? [
							{
								type: "live" as const,
								url: project.link,
								label: "View Project",
							},
						]
					: []),
			shortDescription: project.shortDescription || project.description || "",
			keyFeatures: project.keyFeatures || [],
			tags: project.tags || [],
			featured: project.featured ?? false,
			priority: project.priority || 1,
			status: project.status || ("completed" as const),
			category: project.category || "Web Application",
		}),
	);

	return (
		<Section
			id="projects"
			className="relative pb-16 lg:py-24"
			containerSize="xl"
		>
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<ProjectHeader />

					{/* New Flexible Project Grid */}
					<ProjectGrid projects={projects} showFeatured={true} layout="bento" />

					{/* Call-to-action */}
					<FadeIn delay={0.4}>
						<ProjectCTA />
					</FadeIn>
				</StaggerContainer>
			</div>
		</Section>
	);
}
