"use client";
import { projectImages } from "@/assets/images";

const portfolioProjects = [
	{
		company: "SoftBd LTD",
		year: "2024",
		title: "Organization Management System",
		results: [{ title: "Role-based permission system with 3 user levels" }, { title: "Automated installment tracking with penalty calculation" }, { title: "Google OAuth integration for seamless authentication" }, { title: "Email notification system for payment reminders" }],
		link: "#", // Add your project link here
		image: projectImages.organizationCover,
		technologies: ["Laravel", "TailwindCSS", "MySQL", "Gmail API"],
		description: "A comprehensive organization management system featuring role-based permissions, subscription management, and automated payment tracking with penalty calculations.",
	},
	{
		company: "Personal Project",
		year: "2024",
		title: "Jukto Platform",
		results: [{ title: "Modern responsive design implementation" }, { title: "Enhanced user engagement features" }, { title: "Optimized performance and loading speed" }],
		link: "#", // Add your project link here
		image: projectImages.juktoCover,
		technologies: ["Next.js", "React", "TailwindCSS"],
		description: "A modern web platform built with Next.js featuring responsive design and optimized user experience.",
	},
	{
		company: "Portfolio Project",
		year: "2023",
		title: "AI Startup Landing Page",
		results: [{ title: "Modern design with smooth animations" }, { title: "Responsive across all device sizes" }, { title: "Optimized for conversion and engagement" }],
		link: "https://youtu.be/Z7I5uSRHMHg",
		image: projectImages.aiStartupLandingPage,
		technologies: ["React", "Next.js", "Framer Motion"],
		description: "A cutting-edge landing page for an AI startup featuring modern design principles and smooth animations.",
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
							<span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 whitespace-nowrap">{project.year}</span>
						</div>

						{/* Company */}
						<p className="text-gray-400 font-medium">{project.company}</p>

						{/* Description */}
						{project.description && <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>}

						{/* Technologies */}
						{project.technologies && (
							<div className="flex flex-wrap gap-2">
								{project.technologies.map((tech, idx) => (
									<span key={idx} className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-700/50">
										{tech}
									</span>
								))}
							</div>
						)}

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
							<p className="body-large text-gray-400 max-w-2xl mx-auto">A showcase of my professional work and personal projects, featuring full-stack web applications with real-world impact and modern technologies.</p>
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
