import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { PERSONAL_INFO } from "@/constants/personal-info";
import ProjectCard from "./subComponents/ProjectCard";
import ProjectCTA from "./subComponents/ProjectCTA";

export default function ProjectsSection() {
	return (
		<Section id="projects" className="relative">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-4">
								Featured <span className="gradient-text">Projects</span>
							</h2>
							<p className="body-large text-gray-400 max-w-3xl mx-auto">Showcasing my professional contributions at SoftBd LTD and personal projects, featuring comprehensive web applications with real-world impact, advanced functionality, and modern technology stacks.</p>
						</div>
					</FadeIn>

					{/* Projects Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
						{PERSONAL_INFO.portfolioProjects.map((project, index) => (
							<ProjectCard key={project.title} project={project} index={index} />
						))}
					</div>

					{/* CTA */}
					<ProjectCTA />
				</StaggerContainer>
			</div>
		</Section>
	);
}
