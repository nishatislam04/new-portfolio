"use client";
import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";

const portfolioProjects = [
	{
		company: "Acme Corp",
		year: "2022",
		title: "Dark Saas Landing Page",
		results: [{ title: "Enhanced user experience by 40%" }, { title: "Improved site speed by 50%" }, { title: "Increased mobile traffic by 35%" }],
		link: "https://youtu.be/4k7IdSLxh6w",
		image: darkSaasLandingPage,
	},
	{
		company: "Innovative Co",
		year: "2021",
		title: "Light Saas Landing Page",
		results: [{ title: "Boosted sales by 20%" }, { title: "Expanded customer reach by 35%" }, { title: "Increased brand awareness by 15%" }],
		link: "https://youtu.be/7hi5zwO75yc",
		image: lightSaasLandingPage,
	},
	{
		company: "Quantum Dynamics",
		year: "2023",
		title: "AI Startup Landing Page",
		results: [{ title: "Enhanced user experience by 40%" }, { title: "Improved site speed by 50%" }, { title: "Increased mobile traffic by 35%" }],
		link: "https://youtu.be/Z7I5uSRHMHg",
		image: aiStartupLandingPage,
	},
];

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, Card, CardContent, Button } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { otherImages } from "@/assets/images";
import { PortfolioProject } from "@/types";

const ProjectCard = ({ project, index }: { project: PortfolioProject; index: number }) => {
	return (
		<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -10 }} className="group">
			<Card variant="glass" className="overflow-hidden h-full hover:border-emerald-500/30 transition-all duration-500">
				{/* Project Image */}
				<div className="relative h-48 md:h-56 overflow-hidden">
					<Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Overlay buttons */}
					<div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
						<Button size="sm" onClick={() => window.open(project.link, "_blank")} className="backdrop-blur-sm">
							<ArrowUpRightIcon className="w-4 h-4" />
							View Project
						</Button>
					</div>
				</div>

				<CardContent className="p-6">
					<div className="space-y-4">
						{/* Project title and company */}
						<div className="flex items-start justify-between gap-4">
							<h3 className="heading-3 text-white group-hover:text-emerald-400 transition-colors duration-300">{project.title}</h3>
							<span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 whitespace-nowrap">
								{project.year}
							</span>
						</div>

						{/* Company */}
						<p className="text-gray-400 font-medium">{project.company}</p>

						{/* Results */}
						<div className="space-y-2">
							{project.results.map((result, idx) => (
								<div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
									<div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
									{result.title}
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export const ProjectsSection = () => {
	// Using the portfolioProjects array defined at the top

	return (
		<Section id="projects" className="relative">
			{/* Background elements */}
			<div className="absolute inset-0 opacity-5">
				<Image src={otherImages.grain} alt="" fill className="object-cover" />
			</div>

			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-4">
								Featured <span className="gradient-text">Projects</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">A showcase of my recent work, featuring modern web applications built with cutting-edge technologies.</p>
						</div>
					</FadeIn>

					{/* Projects Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
						{portfolioProjects.map((project, index) => (
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
};
