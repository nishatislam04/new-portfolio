import { FadeIn } from "@/components/animations/FadeIn";

export default function ToolboxHeader() {
	return (
		<FadeIn>
			<div className="text-center mb-20">
				<h2 className="heading-2 mb-4">
					My <span className="gradient-text">Toolbox</span>
				</h2>
				<p className="body-large text-gray-400 max-w-2xl mx-auto">
					Explore the technologies and tools I use to craft exceptional digital
					experiences.
				</p>
			</div>
		</FadeIn>
	);
}
