import { StaggerContainer } from "@/components/animations";
import { Section } from "@/components/ui";
import ContactForm from "./_components/ContactForm";
import ContactHeader from "./_components/contactHeader";
import ContactRightSide from "./_components/contactRightSide";

export default function ContactSection() {
	return (
		<Section id="contact" className="relative">
			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<ContactHeader />

					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
						{/* Contact Form */}
						<ContactForm />

						{/* Contact Right Side */}
						<ContactRightSide />
					</div>
				</StaggerContainer>
			</div>
		</Section>
	);
}
