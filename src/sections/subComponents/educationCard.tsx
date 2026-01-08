import { GraduationCapIcon, StarIcon } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { education } from "@/constants/personal-info";

export default function EducationCard() {
	return (
		<div className="max-w-3xl mx-auto">
			{education.map((edu, index) => (
				<FadeIn key={edu.degree} delay={0.2 * (index + 1)}>
					<div className="relative mb-8 last:mb-0">
						{/* Timeline Line */}
						{index < education.length - 1 && (
							<div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-emerald-500/50 to-transparent" />
						)}

						{/* Education Card */}
						<div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 lg:p-8 hover:border-emerald-500/30 transition-all duration-300 group">
							{/* Timeline Dot */}
							<div className="absolute -left-4 top-16 lg:top-9 w-8 h-8 bg-emerald-500 rounded-full border-4 border-gray-900 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
								<GraduationCapIcon className="w-4 h-4 text-white" />
							</div>

							{/* Main Content */}
							<div className="space-y-12">
								{/* Header: Degree & Institution */}
								<div className="text-center lg:text-left mt-10 lg:mt-0">
									<h3 className="heading-3 text-white group-hover:text-emerald-400 transition-colors duration-300 mb-2">
										{edu.degree}
									</h3>
									<p className="text-emerald-400 font-medium text-lg">
										{edu.institution}
									</p>
								</div>

								{/* Details: Duration & GPA */}
								<div className="flex flex-col sm:flex-row items-center justify-between lg:justify-start gap-4 lg:gap-6">
									{/* GPA Display */}
									<div className="flex items-center gap-3">
										<span className="text-gray-400 font-medium text-xl">
											GPA:
										</span>
										<div className="text-2xl font-bold text-white">
											{edu.gpa}
											<span className="text-lg text-gray-400 font-normal">
												/{edu.maxGpa}
											</span>
										</div>
									</div>

									{/* Duration Badge */}
									<div className="inline-flex items-center lg:ml-auto gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-medium">
										<StarIcon className="w-4 h-4" />
										{edu.duration}
									</div>
								</div>
							</div>

							{/* Decorative Elements */}
							<div className="absolute top-1 lg:top-4 right-2 lg:right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
								<GraduationCapIcon className="w-16 h-16 text-emerald-500" />
							</div>
						</div>
					</div>
				</FadeIn>
			))}
		</div>
	);
}
