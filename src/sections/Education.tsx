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
					<div className="max-w-3xl mx-auto">
						{education.map((edu, index) => (
							<FadeIn key={index} delay={0.2 * (index + 1)}>
								<div className="relative mb-8 last:mb-0">
									{/* Timeline Line */}
									{index < education.length - 1 && <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-emerald-500/50 to-transparent" />}

									{/* Education Card */}
									<div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-300 group">
										{/* Timeline Dot */}
										<div className="absolute -left-4 top-12 w-8 h-8 bg-emerald-500 rounded-full border-4 border-gray-900 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
											<GraduationCapIcon className="w-4 h-4 text-white" />
										</div>

										{/* Main Content */}
										<div className="space-y-6">
											{/* Header: Degree & Institution */}
											<div className="text-center lg:text-left">
												<h3 className="heading-3 text-white group-hover:text-emerald-400 transition-colors duration-300 mb-2">{edu.degree}</h3>
												<p className="text-emerald-400 font-medium text-lg">{edu.institution}</p>
											</div>

											{/* Details: Duration & GPA */}
											<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
												{/* GPA Display */}
												<div className="flex items-center gap-3">
													<span className="text-gray-400 font-medium">GPA:</span>
													<div className="text-2xl font-bold text-white">
														{edu.gpa}
														<span className="text-lg text-gray-400 font-normal">/{edu.maxGpa}</span>
													</div>
												</div>

												{/* Duration Badge */}
												<div className="inline-flex items-center ml-auto gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-medium">
													<StarIcon className="w-4 h-4" />
													{edu.duration}
												</div>
											</div>
										</div>

										{/* Decorative Elements */}
										<div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
											<GraduationCapIcon className="w-16 h-16 text-emerald-500" />
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
