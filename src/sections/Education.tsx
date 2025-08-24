import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { education } from "@/constants/personal-info";
import GraduationCapIcon from "@/assets/icons/graduation-cap.svg";
import StarIcon from "@/assets/icons/star.svg";

export default function EducationSection() {
	return (
		<Section id="education" className="relative">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section Header */}
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-4">
								My <span className="gradient-text">Education</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">{education[0].description}</p>
						</div>
					</FadeIn>

					{/* Education Cards */}
					<div className="max-w-4xl mx-auto">
						{education.map((edu, index) => (
							<FadeIn key={index} delay={0.2 * (index + 1)}>
								<div className="relative mb-8 last:mb-0">
									{/* Timeline Line */}
									{index < education.length - 1 && <div className="absolute left-6 top-20 w-0.5 h-32 bg-gradient-to-b from-emerald-500/50 to-transparent" />}

									{/* Education Card */}
									<div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-300 group">
										{/* Timeline Dot */}
										<div className="absolute -left-3 top-8 w-6 h-6 bg-emerald-500 rounded-full border-4 border-gray-900 group-hover:scale-110 transition-transform duration-300">
											<div className="absolute inset-1 bg-emerald-400 rounded-full animate-pulse" />
										</div>

										<div className="grid md:grid-cols-3 gap-6 items-start">
											{/* Left: Duration & GPA */}
											<div className="space-y-4">
												<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
													<GraduationCapIcon className="w-4 h-4" />
													{edu.duration}
												</div>

												{/* GPA Badge */}
												<div className="space-y-2">
													<div className="flex items-center gap-2">
														<StarIcon className="w-5 h-5 text-yellow-400" />
														<span className="text-gray-300 font-medium">GPA</span>
													</div>
													<div className="text-2xl font-bold text-white">
														{edu.gpa}
														<span className="text-lg text-gray-400 font-normal">/{edu.maxGpa}</span>
													</div>
												</div>
											</div>

											{/* Center: Degree & Institution */}
											<div className="md:col-span-2 space-y-4">
												<div>
													<h3 className="heading-3 text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">{edu.degree}</h3>
													<p className="text-emerald-400 font-medium mb-3">{edu.institution}</p>
												</div>
											</div>
										</div>

										{/* Decorative Elements */}
										<div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
											<GraduationCapIcon className="w-12 h-12 text-emerald-500" />
										</div>
									</div>
								</div>
							</FadeIn>
						))}
					</div>
				</StaggerContainer>
			</div>
		</Section>
	);
}
