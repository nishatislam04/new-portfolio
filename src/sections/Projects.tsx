"use client";
import { projectImages } from "@/assets/images";

const portfolioProjects = [
	{
		company: "SoftBd LTD",
		year: "2024",
		title: "Organization Management System",
		results: [
			{ title: "Role-based permission system with 3 user levels (Super, Admin, Member)" },
			{ title: "Automated installment tracking with penalty calculation for overdue payments" },
			{ title: "Google OAuth integration for seamless user authentication" },
			{ title: "Email notification system for payment reminders and alerts" },
			{ title: "Comprehensive subscription management with installment tracking" },
		],
		link: "https://github.com/nishatislam04/organizations",
		image: projectImages.organizationCover,
		technologies: ["Laravel", "TailwindCSS", "MySQL", "Gmail API", "Google OAuth"],
		description: "A comprehensive organization management system where Super users manage organizations and subscriptions, Admins handle assigned organizations, and Members join organizations with automated payment tracking and penalty management.",
		hasLiveDemo: false,
	},
	{
		company: "Personal Project",
		year: "2025",
		title: "Team-Docs - Collaborative Documentation Platform",
		results: [
			{ title: "TipTap-powered Notion-like editor with slash commands and real-time collaboration" },
			{ title: "Multi-tenant architecture with workspace isolation and role-based permissions" },
			{ title: "PostgreSQL full-text search with ranking algorithms and workspace-scoped security" },
			{ title: "Comprehensive admin dashboard with workspace approval and user management" },
			{ title: "NextAuth.js JWT authentication with middleware-based route protection" },
			{ title: "Performance optimized with Server Actions and React 18 concurrent features" },
		],
		link: "#", // Live project link coming soon
		image: projectImages.teamDocsCover, // Team-Docs cover image coming soon
		technologies: ["Next.js 15", "PostgreSQL", "Prisma ORM", "NextAuth.js", "TipTap", "Tailwind CSS v4", "Shadcn UI", "Zustand", "Docker"],
		description: "A modern, enterprise-grade collaborative documentation platform featuring Notion-like editing experience, multi-tenant architecture, and advanced workspace management designed for efficient team knowledge sharing.",
		hasLiveDemo: true,
		isComingSoon: true,
	},
	{
		company: "SoftBd LTD",
		year: "2024",
		title: "Jukto News Platform",
		results: [
			{ title: "Real-time news aggregation from multiple sources and categories" },
			{ title: "Advanced content management with automated news scraping" },
			{ title: "Interactive UI components with responsive design across all devices" },
			{ title: "Streamlined user navigation with efficient performance optimization" },
			{ title: "REST API integration for seamless data flow and updates" },
		],
		link: "#", // No public access available
		image: projectImages.juktoCover,
		technologies: ["Laravel", "React", "MySQL", "TailwindCSS", "REST APIs"],
		description: "A dynamic news aggregation platform offering up-to-date articles from various categories with real-time updates, content management, and interactive user interface for enhanced engagement.",
		hasLiveDemo: false,
		isPrivate: true,
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
		<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} className="group">
			<Card variant="glass" className="overflow-hidden h-full hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
				{/* Project Image */}
				<div className="relative h-48 md:h-56 overflow-hidden">
					<Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Overlay buttons */}
					<div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
						{project.isPrivate ? (
							<div className="backdrop-blur-sm bg-gray-500/20 border border-gray-500/30 text-gray-300 px-4 py-2 rounded-md text-sm">Private Project</div>
						) : project.isComingSoon ? (
							<div className="backdrop-blur-sm bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-md text-sm">Live Demo Coming Soon</div>
						) : (
							<Button size="sm" onClick={() => window.open(project.link, "_blank")} className="backdrop-blur-sm bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-white">
								<ArrowUpRightIcon className="w-4 h-4 mr-2" />
								{project.link.includes("github") ? "View Code" : "View Project"}
							</Button>
						)}
					</div>
				</div>

				<CardContent className="p-6">
					<div className="space-y-4">
						{/* Project title and company */}
						<div className="flex items-start justify-between gap-4 mb-3">
							<div>
								<h3 className="heading-3 text-white group-hover:text-emerald-400 transition-colors duration-300 mb-1">{project.title}</h3>
								<p className="text-emerald-400/80 font-medium text-sm">{project.company}</p>
							</div>
							<span className="px-3 py-1 text-xs bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-400 rounded-full border border-emerald-500/30 whitespace-nowrap font-medium">{project.year}</span>
						</div>

						{/* Description */}
						{project.description && <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">{project.description}</p>}

						{/* Technologies */}
						{project.technologies && (
							<div className="flex flex-wrap gap-2 mb-4">
								{project.technologies.map((tech, idx) => (
									<span key={idx} className="px-2 py-1 text-xs bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-300 rounded-md border border-gray-600/50 hover:border-emerald-500/30 hover:text-emerald-300 transition-all duration-200">
										{tech}
									</span>
								))}
							</div>
						)}

						{/* Results */}
						<div className="space-y-3">
							<h4 className="text-sm font-semibold text-gray-200 mb-2">Key Features & Achievements</h4>
							<div className="space-y-2">
								{project.results.map((result, idx) => (
									<motion.div key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-3 text-sm text-gray-300 group/item hover:text-gray-200 transition-colors duration-200">
										<div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mt-1.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200"></div>
										<span className="leading-relaxed">{result.title}</span>
									</motion.div>
								))}
							</div>
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
							<p className="body-large text-gray-400 max-w-3xl mx-auto">Showcasing my professional contributions at SoftBd LTD and personal projects, featuring comprehensive web applications with real-world impact, advanced functionality, and modern technology stacks.</p>
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
