import { FadeIn, StaggerContainer } from "@/components/animations";
import { Section } from "@/components/ui";
import { PERSONAL_INFO } from "@/constants/personal-info";
import ToolboxRow from "@/homepage-sections/toolboxes/_components/ToolboxRow";
import ToolboxAdditional from "./_components/toolboxAdditional";
import ToolboxHeader from "./_components/toolboxHeader";

export default function ToolboxSection() {
	return (
		<Section className="relative overflow-hidden">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<ToolboxHeader />

					{/* Horizontal Toolbox Rows */}
					<div className="space-y-8">
						{PERSONAL_INFO.toolboxCategories.map((category, index) => (
							<FadeIn key={category.id} delay={0.1 + index * 0.1}>
								<ToolboxRow category={category} index={index} />
							</FadeIn>
						))}
					</div>

					{/* Additional info */}
					<ToolboxAdditional />
				</StaggerContainer>
			</div>
		</Section>
	);
}
