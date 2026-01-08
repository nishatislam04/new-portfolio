import { StaggerContainer } from "@/components/animations";
import { Section } from "@/components/ui";
import WorkExperienceBottom from "./_components/workExpBottom";
import WorkExperienceCard from "./_components/workExpCard";
import WorkExperienceHeader from "./_components/workExpHeader";

export default function WorkExperienceSection() {
	return (
		<Section id="experience" className="relative">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section Header */}
					<WorkExperienceHeader />

					{/* Experience Cards */}
					<WorkExperienceCard />

					{/* Bottom CTA */}
					<WorkExperienceBottom />
				</StaggerContainer>
			</div>
		</Section>
	);
}
