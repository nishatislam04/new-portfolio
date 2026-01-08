import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { FadeIn } from "@/components/animations/FadeIn";
import { Container, Section } from "@/components/ui";
import { PERSONAL_INFO } from "@/constants/personal-info";

export default function MyStats() {
	return (
		<Section className="py-4 md:py-8 lg:py-12 z-30">
			<Container>
				<FadeIn delay={0.3}>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 lg:pt-20 border-t border-white/10">
						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter
									value={PERSONAL_INFO.stats.projectsCompleted}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">
								Projects Completed
							</div>
						</div>

						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter
									value={PERSONAL_INFO.stats.technologies}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">
								Technologies
							</div>
						</div>

						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter
									value={PERSONAL_INFO.stats.experience}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">
								Years Experience
							</div>
						</div>

						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter
									value={PERSONAL_INFO.stats.clientSatisfaction}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">
								Client Satisfaction
							</div>
						</div>
					</div>
				</FadeIn>
			</Container>
		</Section>
	);
}
