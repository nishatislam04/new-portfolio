import { Section, Container } from "@/components/ui";
import { FadeIn, AnimatedCounter } from "@/components/animations";
import { PERSONAL_INFO } from "@/constants/personal-info";
import grainImage from "@/assets/images/grain.jpg";
import ContactButton from "./subComponents/contactButton";
import Image from "next/image";

export default function CTASection() {
	return (
		<Section className="py-16 pt-12 lg:py-24 lg:pt-20 z-30">
			<Container>
				<div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center relative overflow-hidden z-0 md:text-left">
					{/* Heading */}
					<div className="flex flex-col gap-8 items-center md:flex-row md:gap-16">
						<div className="">
							<h2 className="font-serif text-2xl md:text-3xl">Let's create something amazing together</h2>
							<p className="text-sm mt-2 md:text-base">Ready to bring your next project to life? Let's connect and discuss how i can achive your goal</p>
						</div>
						<ContactButton jumpto="contact" />
					</div>
					<div className="absolute inset-0 -z-30 opacity-5">
						<Image src={grainImage} alt="Grain texture" className="object-cover" priority width={1920} height={1080} quality={20} />
					</div>
				</div>

				{/* Stats */}
				<FadeIn delay={0.3}>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 lg:pt-20 border-t border-white/10">
						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter 
									value={PERSONAL_INFO.stats.projectsCompleted}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">Projects Completed</div>
						</div>

						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter 
									value={PERSONAL_INFO.stats.technologies}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">Technologies</div>
						</div>

						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter 
									value={PERSONAL_INFO.stats.experience}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">Years Experience</div>
						</div>

						<div className="text-center group">
							<div className="relative">
								<AnimatedCounter 
									value={PERSONAL_INFO.stats.clientSatisfaction}
									className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl"
								/>
							</div>
							<div className="text-gray-300 text-sm font-medium">Client Satisfaction</div>
						</div>
					</div>
				</FadeIn>
			</Container>
		</Section>
	);
}
