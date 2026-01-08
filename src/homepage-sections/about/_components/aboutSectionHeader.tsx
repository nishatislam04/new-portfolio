import { FadeIn } from "@/components/animations/FadeIn";

export default function AboutSectionHeader() {
	return (
		<FadeIn>
			<div className="text-center mb-16">
				<h2 className="heading-2 mb-4">
					About <span className="gradient-text">Me</span>
				</h2>
				<p className="body-large text-gray-400 max-w-2xl mx-auto">
					Passionate about crafting exceptional digital experiences through
					clean code and innovative solutions.
				</p>
			</div>
		</FadeIn>
	);
}
