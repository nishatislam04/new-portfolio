import { FadeIn } from "@/components/animations/FadeIn";

export default function ContactHeader() {
	return (
		<FadeIn>
			<div className="text-center mb-16">
				<h2 className="heading-2 mb-4">
					Let's <span className="gradient-text">Connect</span>
				</h2>
				<p className="body-large text-gray-400 max-w-2xl mx-auto">
					Ready to bring your ideas to life? Let's discuss your project and
					create something amazing together.
				</p>
			</div>
		</FadeIn>
	);
}
