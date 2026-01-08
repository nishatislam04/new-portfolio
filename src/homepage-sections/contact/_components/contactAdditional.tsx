import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui";

export default function ContactAdditional() {
	return (
		<FadeIn delay={0.6}>
			<Card variant="glass" className="p-6">
				<h4 className="font-semibold text-white mb-4">Prefer Other Ways?</h4>
				<div className="space-y-3 text-sm">
					<p className="text-gray-400">
						📞 Schedule a call to discuss your project
					</p>
					<p className="text-gray-400">💬 Send me a message on LinkedIn</p>
					<p className="text-gray-400">⚡ Quick response within 24 hours</p>
				</div>
			</Card>
		</FadeIn>
	);
}
