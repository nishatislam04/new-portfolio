import { Container, Section } from "@/components/ui";
import CtaHeading from "./_components/ctaHeading";

export default function CTASection() {
	return (
		<Section className="py-2 md:py-4 pt-12 lg:py-8 lg:pt-20 z-30">
			<Container>
				<div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center relative overflow-hidden z-0 md:text-left">
					{/* Heading */}
					<CtaHeading />
				</div>
			</Container>
		</Section>
	);
}
