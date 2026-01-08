import { StaggerContainer } from "@/components/animations";
import { Section } from "@/components/ui";
import WorkExperienceBottom from "./subComponents/workExpBottom";
import WorkExperienceCard from "./subComponents/workExpCard";
import WorkExperienceHeader from "./subComponents/workExpHeader";

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
