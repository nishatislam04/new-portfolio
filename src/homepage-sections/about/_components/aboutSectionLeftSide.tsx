import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import { FadeIn } from "@/components/animations/FadeIn";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { PERSONAL_INFO } from "@/constants/personal-info";

export default function AboutSectionLeftSide() {
	return (
		<div className="space-y-8">
			<FadeIn delay={0.2}>
				<div className="space-y-6">
					<p className="body-base text-gray-300 leading-relaxed">
						{PERSONAL_INFO.profile}
					</p>

					<p className="body-base text-gray-300 leading-relaxed">
						Currently working at {PERSONAL_INFO.workExperience[0].company} as a{" "}
						{PERSONAL_INFO.workExperience[0].position}, I specialize in modern
						web technologies including React, Next.js, Laravel, and Vue.js. I
						believe in writing clean, maintainable code and following best
						practices.
					</p>
				</div>
			</FadeIn>

			{/* Achievements */}
			<FadeIn delay={0.4}>
				<div className="space-y-4">
					<h3 className="heading-3 text-white">Key Highlights</h3>
					<div className="space-y-4">
						{PERSONAL_INFO.achievements.map((achievement, index) => (
							<FadeInOnScroll
								key={achievement.info}
								delay={index * 0.1}
								direction="left"
								className="group flex items-start gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-500 hover:bg-gray-800/50 relative overflow-hidden"
							>
								{/* Always-on subtle background glow */}
								<div className="absolute inset-0 bg-linear-to-r from-emerald-500/3 to-sky-500/3 animate-pulse" />

								{/* Always-on subtle border glow */}
								<div
									className="absolute inset-0 rounded-xl border border-emerald-500/10"
									style={{
										animation: `borderGlow 4s ease-in-out infinite ${index * 0.5}s`,
									}}
								/>

								{/* Enhanced hover animations */}
								<div className="absolute inset-0 bg-linear-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
								<div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

								{/* Always-on shimmer effect */}
								<div
									className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/5 to-transparent"
									style={{
										animation: `shimmer 6s linear infinite ${index * 0.8}s`,
									}}
								/>

								<CheckCircleIcon className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0 relative z-10 transition-transform duration-300 group-hover:scale-110" />
								<span className="text-gray-300 flex-1 relative z-10">
									<span className="text-emerald-400 font-bold text-xl transition-colors duration-300 group-hover:text-emerald-300">
										{achievement.number}
									</span>{" "}
									{achievement.text}
								</span>
							</FadeInOnScroll>
						))}
					</div>
				</div>
			</FadeIn>
		</div>
	);
}
