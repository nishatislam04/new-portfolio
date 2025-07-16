import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { PERSONAL_INFO } from "@/constants/personal-info";
import ProjectCard from "./subComponents/ProjectCard";
import ProjectCTA from "./subComponents/ProjectCTA";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import ArrownUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";

export default function ProjectsSection() {
	return (
		<Section id="projects" className="relative pb-16 lg:py-24" containerSize="xl">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center flex flex-col justify-center">
							<h2 className="heading-2 uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
								Featured <span className="gradient-text">Projects</span>
							</h2>
							<p className="body-large text-gray-400 max-w-3xl mx-auto pt-4 text-base">Showcasing my professional contributions at SoftBd LTD and personal projects, featuring comprehensive web applications with real-world impact, advanced functionality, and modern technology stacks.</p>
						</div>
					</FadeIn>

					{/* Projects Grid */}
					{/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
						{PERSONAL_INFO.portfolioProjects.map((project, index) => (
							<ProjectCard key={project.title} project={project} index={index} />
						))}
					</div> */}

					<div className="flex flex-col gap-14 mt-10 md:mt-20">
						{PERSONAL_INFO.portfolioProjects.map((project, index) => (
							<div
								className="bg-gray-800 rounded-3xl z-0 overflow-hidden after:z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 px-8 pt-8 after:pointer-events-none md:pt-12 md:px-10 lg:px-20 lg:pt-16 sticky"
								style={{
									top: `calc(64px + ${index * 45}px)`,
								}}
								key={index}>
								<div className="absolute inset-0 -z-30 opacity-5">
									<Image src={grainImage} alt="Grain texture" className="object-cover" priority width={1920} height={1080} quality={20} />
								</div>
								<div className="lg:grid lg:grid-cols-2 lg:gap-8">
									<div className="lg:pb-16">
										<div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
											<span className="">{project.company}</span>
											<span className="">&bull;</span>
											<span className="">{project.year}</span>
										</div>
										<h3 className="text-2xl font-serif mt-2 md:text-4xl md:mt-5">{project.title}</h3>
										<hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
										<ul className="flex flex-col gap-4 mt-4 md:mt-5">
											{project.results.map((result, index) => (
												<li key={index} className="flex gap-2 text-sm text-white/50 md:text-base ">
													<CheckCircleIcon className="size-5 md:size-6" />
													<span className="">{result.title}</span>
												</li>
											))}
										</ul>
										<a href={project.link} target="_blank" rel="noopener noreferrer" className="">
											<button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
												<span className="">View Project</span>
												<ArrownUpRightIcon className="size-4 md:size-5" />
											</button>
										</a>
									</div>
									<div className="relative">
										<Image src={project.image} alt={project.title} className="mt-8 -mb-4 rounded-lg md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none" />
									</div>
								</div>
							</div>
						))}
					</div>

					{/* CTA */}
					<ProjectCTA />
				</StaggerContainer>
			</div>
		</Section>
	);
}
