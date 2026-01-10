import { FadeIn } from "@/components/animations/FadeIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactAdditional() {
	return (
		<FadeIn delay={0.6}>
			<Card variant="glass" className="p-6">
				<CardHeader>
					<CardTitle>Prefer Other Ways?</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm">
					<p className="text-gray-400">
						📞 Schedule a call to discuss your project
					</p>
					<p className="text-gray-400">💬 Send me a message on LinkedIn</p>
					<p className="text-gray-400">⚡ Quick response within 24 hours</p>
				</CardContent>
			</Card>
		</FadeIn>
	);
}
