import { StaggerContainer } from "@/components/animations";
import { Section } from "@/components/ui";
import EducationCard from "./_components/educationCard";
import EducationSectionHeader from "./_components/educationSectionHeader";

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
