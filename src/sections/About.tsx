import { StaggerContainer } from "@/components/animations";
import { Section } from "@/components/ui";
import AboutSectionHeader from "./subComponents/aboutSectionHeader";
import AboutSectionLeftSide from "./subComponents/aboutSectionLeftSide";
import AboutSectionRightSide from "./subComponents/aboutSectionRightSide";

export default function AboutSection() {
	return (
		<Section id="about" className="relative">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<AboutSectionHeader />

					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Left side - Content */}
						<AboutSectionLeftSide />

						{/* Right side - Avatar and Skills */}
						<AboutSectionRightSide />
					</div>
				</StaggerContainer>
			</div>
		</Section>
	);
}
