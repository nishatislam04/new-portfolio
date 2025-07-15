import { Section, Button } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { PERSONAL_INFO } from "@/constants/personal-info";
import ProjectCard from "./subComponents/ProjectCard";

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
					<FadeIn delay={0.6}>
						<div className="text-center mt-16">
							<p className="text-gray-400 mb-6">Interested in working together?</p>
							<Button
								onClick={() => {
									const element = document.getElementById("contact");
									element?.scrollIntoView({ behavior: "smooth" });
								}}
								className="group">
								Let's Talk
								<ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</Button>
						</div>
					</FadeIn>
				</StaggerContainer>
			</div>
		</Section>
	);
}
