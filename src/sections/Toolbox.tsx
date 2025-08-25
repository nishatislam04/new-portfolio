import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { PERSONAL_INFO } from "@/constants/personal-info";
import ToolboxRow from "@/components/block/ToolboxRow";

export default function ToolboxSection() {
	return (
		<Section className="relative overflow-hidden">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center mb-20">
							<h2 className="heading-2 mb-4">
								My <span className="gradient-text">Toolbox</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">Explore the technologies and tools I use to craft exceptional digital experiences.</p>
						</div>
					</FadeIn>

					{/* Horizontal Toolbox Rows */}
					<div className="space-y-8">
						{PERSONAL_INFO.toolboxCategories.map((category, index) => (
							<FadeIn key={category.id} delay={0.1 + index * 0.1}>
								<ToolboxRow category={category} index={index} />
							</FadeIn>
						))}
					</div>

					{/* Additional info */}
					<FadeIn delay={0.4}>
						<div className="text-center mt-12">
							<p className="text-gray-400 text-sm">And many more tools and technologies that I continue to explore and master.</p>
						</div>
					</FadeIn>
				</StaggerContainer>
			</div>
		</Section>
	);
}
