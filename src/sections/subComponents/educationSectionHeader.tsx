import { FadeIn } from "@/components/animations/FadeIn";
import { education } from "@/constants/personal-info";

export default function EducationSectionHeader() {
	return (
		<FadeIn>
			<div className="text-center mb-16">
				<h2 className="heading-2 mb-4">
					My <span className="gradient-text">Education</span>
				</h2>
				<p className="body-large text-gray-400 max-w-2xl mx-auto">
					{education[0].description}
				</p>
			</div>
		</FadeIn>
	);
}
