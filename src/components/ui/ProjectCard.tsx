"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";
import { Button, Card, CardContent } from "@/components/ui";
import { TechBadges } from "@/components/ui/TechBadges";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import LockIcon from "@/assets/icons/minified/lock.svg";
import ClockIcon from "@/assets/icons/minified/clock.svg";
import PlayIcon from "@/assets/icons/minified/play.svg";

interface ProjectCardProps {
	project: Project;
	variant?: "compact" | "detailed" | "featured";
	onProjectClick?: (project: Project) => void;
}

export function ProjectCard({ project, variant = "compact", onProjectClick }: ProjectCardProps) {
	const handleClick = () => {
		onProjectClick?.(project);
	};

	const getStatusBadge = () => {
		switch (project.status) {
			case "in-progress":
				return (
					<div className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
						<ClockIcon className="w-3 h-3" />
						In Progress
					</div>
				);
			case "coming-soon":
				return (
					<div className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
						<ClockIcon className="w-3 h-3" />
						Coming Soon
					</div>
				);
			default:
				return null;
		}
	};

	const getActionButton = () => {
		if (project.isPrivate) {
			return (
				<div className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-500/20 text-gray-300 rounded-lg border border-gray-500/30">
					<LockIcon className="w-4 h-4" />
					Private Project
				</div>
			);
		}

		if (project.status === "coming-soon") {
			return (
				<div className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30">
					<ClockIcon className="w-4 h-4" />
					Coming Soon
				</div>
			);
		}

		const primaryLink = project.links?.[0] || (project.link && project.link !== "#" ? { url: project.link, label: "View Project" } : null);

		if (primaryLink) {
			return (
				<Button
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						window.open(primaryLink.url, "_blank");
					}}
					className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-white">
					{project.videoUrl ? <PlayIcon className="w-4 h-4" /> : <ArrowUpRightIcon className="w-4 h-4" />}
					{primaryLink.label || (primaryLink.url.includes("github") ? "View Code" : "View Project")}
				</Button>
			);
		}

		return null;
	};

	// Tech badges are rendered via shared component

	if (variant === "featured") {
		return (
			<motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className="group cursor-pointer" onClick={handleClick}>
				<Card variant="glass" className="overflow-hidden h-full hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
					{/* Featured Project Image */}
					<div className="relative h-64 md:h-80 overflow-hidden">
						<Image
							src={project.coverImage.src}
							alt={project.coverImage.alt}
							fill
							className="object-contain object-top"
							priority={project.coverImage.priority}
							sizes="(min-width: 1024px) 50vw, 100vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

						{/* Status Badge */}
						<div className="absolute top-4 left-4">{getStatusBadge()}</div>

						{/* Action Button Overlay */}
						<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">{getActionButton()}</div>
					</div>

					<CardContent className="p-6 space-y-4">
						{/* Header */}
						<div className="flex items-start justify-between gap-4">
							<div>
								<h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 mb-1">{project.title}</h3>
								<div className="flex items-center gap-3 text-sm">
									<span className="text-emerald-400/80 font-medium">{project.company}</span>
									<span className="text-gray-500">•</span>
									<span className="text-gray-400">{project.year}</span>
								</div>
							</div>
							<span className="px-3 py-1 text-xs bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-emerald-400 rounded-full border border-emerald-500/30 whitespace-nowrap font-medium">{project.category}</span>
						</div>

						{/* Description */}
						<p className="text-gray-300 leading-relaxed line-clamp-3">{project.fullDescription || project.shortDescription}</p>

						{/* Key Features */}
						{project.keyFeatures && project.keyFeatures.length > 0 && (
							<div>
								<h4 className="text-sm font-medium text-white mb-2">Key Features</h4>
								<ul className="space-y-1">
									{project.keyFeatures.slice(0, 3).map((feature, index) => (
										<li key={index} className="text-sm text-gray-400 flex items-start gap-2">
											<span className="w-1 h-1 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
											{feature}
										</li>
									))}
									{project.keyFeatures.length > 3 && <li className="text-sm text-gray-500 italic">+{project.keyFeatures.length - 3} more features</li>}
								</ul>
							</div>
						)}

						{/* Technologies */}
						<div>
							<h4 className="text-sm font-medium text-white mb-2">Technologies</h4>
							<TechBadges items={project.technologies} limit={6} size="sm" />
						</div>
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	if (variant === "detailed") {
		return (
			<motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className="group cursor-pointer" onClick={handleClick}>
				<Card variant="glass" className="overflow-hidden h-full hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
					{/* Project Image */}
					<div className="relative h-48 md:h-56 overflow-hidden">
						<Image
							src={project.coverImage.src}
							alt={project.coverImage.alt}
							fill
							className="object-cover object-top"
							sizes="(min-width: 1024px) 66vw, (min-width: 768px) 50vw, 100vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

						{/* Status Badge */}
						<div className="absolute top-4 left-4">{getStatusBadge()}</div>

						{/* Action Button Overlay */}
						<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">{getActionButton()}</div>
					</div>

					<CardContent className="p-6 space-y-4">
						{/* Header */}
						<div className="flex items-start justify-between gap-4">
							<div>
								<h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 mb-1">{project.title}</h3>
								<div className="flex items-center gap-3 text-sm">
									<span className="text-emerald-400/80 font-medium">{project.company}</span>
									<span className="text-gray-500">•</span>
									<span className="text-gray-400">{project.year}</span>
								</div>
							</div>
						</div>

						{/* Description */}
						<p className="text-sm text-gray-300 leading-relaxed line-clamp-3">{project.shortDescription}</p>

						{/* Technologies */}
						<div>
							<TechBadges items={project.technologies} limit={4} size="sm" />
						</div>

						{/* Results/Impact */}
						{project.results && project.results.length > 0 && (
							<div>
								<h4 className="text-sm font-medium text-white mb-2">Key Results</h4>
								<ul className="space-y-1">
									{project.results.slice(0, 2).map((result, index) => (
										<li key={index} className="text-xs text-gray-400 flex items-start gap-2">
											<span className="w-1 h-1 bg-sky-400 rounded-full mt-1.5 flex-shrink-0"></span>
											{result.title}
										</li>
									))}
								</ul>
							</div>
						)}
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	// Compact variant (default)
	return (
		<motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className="group cursor-pointer" onClick={handleClick}>
			<Card variant="glass" className="overflow-hidden h-full hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
				{/* Project Image */}
				<div className="relative h-48 overflow-hidden">
					<Image
						src={project.coverImage.src}
						alt={project.coverImage.alt}
						fill
						className="object-cover object-top"
						sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

					{/* Status Badge */}
					<div className="absolute top-4 left-4">{getStatusBadge()}</div>

					{/* Action Button Overlay */}
					<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">{getActionButton()}</div>
				</div>

				<CardContent className="p-6 space-y-4">
					{/* Header */}
					<div className="flex items-start justify-between gap-4">
						<div>
							<h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 mb-1">{project.title}</h3>
							<div className="flex items-center gap-3 text-sm">
								<span className="text-emerald-400/80 font-medium">{project.company}</span>
								<span className="text-gray-500">•</span>
								<span className="text-gray-400">{project.year}</span>
							</div>
						</div>
					</div>

					{/* Description */}
					<p className="text-sm text-gray-300 leading-relaxed line-clamp-2">{project.shortDescription}</p>

					{/* Technologies */}
					<div>
						<TechBadges items={project.technologies} limit={3} size="sm" />
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
