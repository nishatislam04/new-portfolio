"use client";

import { Button, Card, CardContent } from "@/components/ui";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

export default function ProjectCard({
	project,
	index,
}: {
	project: { title: string; company: string; year: string; description: string; technologies: string[]; results: { title: string }[]; link: string; image: StaticImageData; isPrivate?: boolean; isComingSoon?: boolean; hasLiveDemo?: boolean };
	index: number;
}) {
	return (
		<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} {...{ className: "group" }}>
			<Card variant="glass" className="overflow-hidden h-full hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
				{/* Project Image */}
				<div className="relative h-48 md:h-56 overflow-hidden">
					<Image src={project.image} alt={project.title} width={450} height={206} loading="lazy" quality={20} className="object-cover transition-transform duration-500 group-hover:scale-110" />
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
									<motion.div key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} {...{ className: "flex items-start gap-3 text-sm text-gray-300 group/item hover:text-gray-200 transition-colors duration-200" }}>
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
}
