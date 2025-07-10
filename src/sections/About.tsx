"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, Card, CardContent } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { CheckCircleIcon } from "@/components/icons";
import { memojiImages, otherImages } from "@/assets/images";
import { PERSONAL_INFO } from "@/constants/personal-info";
// Tech stack icons with blue gradient
const TechIcon = ({ name }: { name: string }) => {
	return (
		<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
			<span className="text-white text-sm font-bold">{name.slice(0, 2).toUpperCase()}</span>
		</div>
	);
};

// Tech stack items from personal info
const techStack = PERSONAL_INFO.techStack.map((name) => ({ name }));

export const AboutSection = () => {
	const achievements = [
		{
			number: PERSONAL_INFO.stats.experience,
			text: "years of professional development experience",
		},
		{
			number: PERSONAL_INFO.stats.projectsCompleted,
			text: "successful projects delivered",
		},
		{
			number: PERSONAL_INFO.stats.technologies,
			text: "modern web technologies mastered",
		},
		{
			number: PERSONAL_INFO.stats.clientSatisfaction,
			text: "client satisfaction rate",
		},
	];

	return (
		<Section id="about" className="relative">
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
								About <span className="gradient-text">Me</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">Passionate about crafting exceptional digital experiences through clean code and innovative solutions.</p>
						</div>
					</FadeIn>

					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Left side - Content */}
						<div className="space-y-8">
							<FadeIn delay={0.2}>
								<div className="space-y-6">
									<p className="body-base text-gray-300 leading-relaxed">{PERSONAL_INFO.profile}</p>

									<p className="body-base text-gray-300 leading-relaxed">
										Currently working at {PERSONAL_INFO.workExperience[0].company} as a {PERSONAL_INFO.workExperience[0].position}, I specialize in modern web technologies including React, Next.js, Laravel, and Vue.js. I believe in writing clean, maintainable code and following best practices.
									</p>
								</div>
							</FadeIn>

							{/* Achievements */}
							<FadeIn delay={0.4}>
								<div className="space-y-4">
									<h3 className="heading-3 text-white">Key Highlights</h3>
									<div className="space-y-4">
										{achievements.map((achievement, index) => (
											<motion.div
												key={index}
												className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300"
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5, delay: index * 0.1 }}
												whileHover={{ scale: 1.02 }}>
												<CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
												<span className="text-gray-300 flex-1">
													<span className="text-emerald-400 font-bold text-xl">{achievement.number}</span> {achievement.text}
												</span>
											</motion.div>
										))}
									</div>
								</div>
							</FadeIn>
						</div>

						{/* Right side - Avatar and Skills */}
						<div className="space-y-8">
							{/* Avatar */}
							<FadeIn delay={0.3}>
								<div className="relative">
									<motion.div className="relative w-64 h-64 mx-auto" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
										<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-full blur-xl" />
										<div className="relative w-full h-full bg-gray-800/50 rounded-full border border-white/10 overflow-hidden">
											<Image src={memojiImages.smile} alt="About me" fill className="object-contain p-4" />
										</div>
									</motion.div>
								</div>
							</FadeIn>

							{/* Tech Stack Grid */}
							<FadeIn delay={0.5}>
								<div className="space-y-6">
									<h3 className="heading-3 text-center">My Stacks</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
										{techStack.map((tech, index) => (
											<motion.div key={tech.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }}>
												<Card variant="glass" className="p-4 text-center group hover:border-blue-500/30 transition-all duration-300">
													<div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
														<TechIcon name={tech.name} />
													</div>
													<p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">{tech.name}</p>
												</Card>
											</motion.div>
										))}
									</div>
								</div>
							</FadeIn>
						</div>
					</div>
				</StaggerContainer>
			</div>
		</Section>
	);
};
