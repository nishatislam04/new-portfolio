import { FadeIn } from "@/components/animations";

export default function ProjectHeader() {
	return (
		<FadeIn>
			<div className="text-center flex flex-col justify-center mb-16">
				<h2 className="heading-2 uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
					Featured <span className="gradient-text">Projects</span>
				</h2>
				<p className="body-large text-gray-400 max-w-3xl mx-auto pt-4 text-base">
					Showcasing my professional contributions and personal projects,
					featuring comprehensive web applications with real-world impact,
					advanced functionality, and modern technology stacks.
				</p>
			</div>
		</FadeIn>
	);
}
