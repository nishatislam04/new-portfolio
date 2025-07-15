import Image from "next/image";
import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import profilePicture from "@/assets/images/profile_picture.png";
import { PERSONAL_INFO } from "@/constants/personal-info";
import NextJSIcon from "@/assets/icons/stacks/nextjs.svg";
import NestJSIcon from "@/assets/icons/stacks/nestjs.svg";
import LaravelIcon from "@/assets/icons/stacks/laravel.svg";
import PostgreSQLIcon from "@/assets/icons/stacks/postgres.svg";
import PrismaIcon from "@/assets/icons/stacks/prisma.svg";
import DockerIcon from "@/assets/icons/stacks/docker.svg";
import { FadeInOnScroll } from "@/components/animations";
import { TechStackCard } from "@/components/animations";

const techStacks = [
	{ name: "Next.js", icon: <NextJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ name: "Laravel", icon: <LaravelIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ name: "NestJS", icon: <NestJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ name: "PostgreSQL", icon: <PostgreSQLIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ name: "Prisma ORM", icon: <PrismaIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ name: "Docker", icon: <DockerIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
];

export default function AboutSection() {
	return (
		<Section id="about" className="relative">
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
										{PERSONAL_INFO.achievements.map((achievement, index) => (
											<FadeInOnScroll key={index} delay={index * 0.1} direction="left" className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30">
												<CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
												<span className="text-gray-300 flex-1">
													<span className="text-emerald-400 font-bold text-xl">{achievement.number}</span> {achievement.text}
												</span>
											</FadeInOnScroll>
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
									<div className="relative w-64 h-64 mx-auto transform transition-transform duration-500 hover:scale-105">
										<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-full blur-xl" />
										<div className="relative w-full h-full bg-gray-800/50 rounded-full border border-white/10 overflow-hidden">
											<Image
												src={profilePicture}
												alt="About me"
												className="object-contain p-4"
												width={1920}
												height={1080}
												priority // force preload
												quality={20}
											/>
										</div>
									</div>
								</div>
							</FadeIn>

							{/* Tech Stack Grid */}
							<FadeIn delay={0.5}>
								<div className="space-y-6">
									<h3 className="heading-3 text-center">My Stacks</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
										{techStacks.map((tech, index) => (
											<TechStackCard key={tech.name} tech={tech} index={index} />
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
}
