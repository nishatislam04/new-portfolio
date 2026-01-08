import { FadeIn } from "@/components/animations/FadeIn";

export default function ToolboxAdditional() {
	return (
		<FadeIn delay={0.4}>
			<div className="text-center mt-12">
				<p className="text-gray-400 text-sm">
					And many more tools and technologies that I continue to explore and
					master.
				</p>
			</div>
		</FadeIn>
	);
}
