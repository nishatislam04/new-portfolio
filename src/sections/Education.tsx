import { StaggerContainer } from "@/components/animations";
import { Section } from "@/components/ui";
import EducationCard from "./subComponents/educationCard";
import EducationSectionHeader from "./subComponents/educationSectionHeader";

export default function EducationSection() {
	return (
		<Section id="education" className="relative">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section Header */}
					<EducationSectionHeader />

					{/* Education Cards */}
					<EducationCard />
				</StaggerContainer>
			</div>
		</Section>
	);
}
