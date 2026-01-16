import { BriefcaseIcon } from "lucide-react";
import CalendarIcon from "@/assets/icons/calendar.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import MapPinIcon from "@/assets/icons/map-pin.svg";
import { FadeIn } from "@/components/animations/FadeIn";
import { workExperience } from "@/constants/personal-info";

export default function WorkExperienceCard() {
	return (
		<div className="max-w-4xl mx-auto">
			{workExperience.map((exp, index) => (
				<FadeIn key={exp.company} delay={0.2 * (index + 1)}>
					<div className="relative mb-8 last:mb-0">
						{/* Timeline Line */}
						{index < workExperience.length - 1 && (
							<div className="absolute left-8 top-24 w-0.5 h-32 bg-linear-to-b from-emerald-500/50 to-transparent" />
						)}

						{/* Experience Card */}
						<div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl lg:p-8 p-6 hover:border-emerald-500/30 transition-all duration-300 group">
							{/* Timeline Dot */}
							<div className="absolute -left-4 top-6 lg:top-9 w-8 h-8 bg-emerald-500 rounded-full border-4 border-gray-900 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
								<BriefcaseIcon className="w-4 h-4 text-white" />
							</div>

							{/* Main Content */}
							<div className="space-y-8 ">
								{/* Header: Position & Company */}
								<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
									<div className="space-y-2">
										<h3 className="heading-3 text-white group-hover:text-emerald-400 transition-colors duration-300">
											{exp.position}
										</h3>
										<p className="text-emerald-400 font-medium text-lg">
											{exp.company}
										</p>
									</div>

									{/* Duration & Type Badge */}
									<div className="-mr-2 flex self-end flex-col sm:flex-row gap-3">
										<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium">
											<CalendarIcon className="w-4 h-4" />
											{exp.duration}
										</div>
										<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-sm font-medium">
											<MapPinIcon className="w-4 h-4" />
											{exp.type}
										</div>
									</div>
								</div>

								{/* Description */}
								<div className="space-y-8 lg:space-y-6">
									<p className="body-base text-gray-300 leading-relaxed">
										{exp.description}
									</p>

									{/* Achievements */}
									<div className="space-y-3">
										<h4 className="text-white font-semibold">
											Key Achievements:
										</h4>
										<div className="grid gap-3">
											{exp.achievements.map((achievement) => (
												<div
													key={`achievement-${achievement.replace(/\s+/g, "-").slice(0, 20)}`}
													className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-colors duration-300"
												>
													<CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
													<span className="text-gray-300 text-sm leading-relaxed">
														{achievement}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Technologies */}
									<div className="space-y-4 mt-8">
										<h4 className="text-white font-semibold">
											Technologies Learned:
										</h4>
										<div className="flex flex-wrap gap-2">
											{exp.technologies.map((tech) => (
												<span
													key={`tech-${tech.replace(/\s+/g, "-").toLowerCase()}`}
													className="px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-colors duration-300"
												>
													{tech}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Decorative Elements */}
							<div className="absolute top-4 lg:top-1 right-2 lg:right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
								<BriefcaseIcon className="w-16 h-16 text-emerald-500" />
							</div>
						</div>
					</div>
				</FadeIn>
			))}
		</div>
	);
}
