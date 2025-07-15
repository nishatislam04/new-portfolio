"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/ui";
import { FadeIn } from "@/components/animations";
import { ArrowUpRightIcon } from "@/components/icons";
import { scrollToElement } from "@/utils";
import { PERSONAL_INFO } from "@/constants/personal-info";
import grainImage from "@/assets/images/grain.jpg";

export default function CTASection() {
	const handleContactClick = () => {
		scrollToElement("contact");
	};

	return (
		<Section className="py-16 pt-12 lg:py-24 lg:pt-20">
			<Container>
				<div className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center relative overflow-hidden z-0 md:text-left">
					{/* Heading */}
					<div className="flex flex-col gap-8 items-center md:flex-row md:gap-16">
						<div className="">
							<h2 className="font-serif text-2xl md:text-3xl">Let's create something amazing together</h2>
							<p className="text-sm mt-2 md:text-base">Ready to bring your next project to life? Let's connect and discuss how i can achive your goal</p>
						</div>
						<div className="">
							<button className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900" onClick={handleContactClick}>
								<span className="font-semibold">Contact Me</span>
								<ArrowUpRightIcon className="size-4" />
							</button>
						</div>
					</div>
					<div className="absolute inset-0 opacity-5 -z-10" style={{ backgroundImage: `url(${grainImage.src})` }}></div>
				</div>

				{/* Stats */}
				<FadeIn delay={0.3}>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 lg:pt-20 border-t border-white/10">
						<motion.div className="text-center group" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
							<div className="relative">
								<div className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl">{PERSONAL_INFO.stats.projectsCompleted}</div>
								<motion.div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false} />
							</div>
							<div className="text-gray-300 text-sm font-medium">Projects Completed</div>
						</motion.div>

						<motion.div className="text-center group" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
							<div className="relative">
								<div className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl">{PERSONAL_INFO.stats.technologies}</div>
								<motion.div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false} />
							</div>
							<div className="text-gray-300 text-sm font-medium">Technologies</div>
						</motion.div>

						<motion.div className="text-center group" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
							<div className="relative">
								<div className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl">{PERSONAL_INFO.stats.experience}</div>
								<motion.div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false} />
							</div>
							<div className="text-gray-300 text-sm font-medium">Years Experience</div>
						</motion.div>

						<motion.div className="text-center group" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
							<div className="relative">
								<div className="text-4xl md:text-5xl font-black text-white mb-2 block drop-shadow-2xl">{PERSONAL_INFO.stats.clientSatisfaction}</div>
								<motion.div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false} />
							</div>
							<div className="text-gray-300 text-sm font-medium">Client Satisfaction</div>
						</motion.div>
					</div>
				</FadeIn>
			</Container>
		</Section>
	);
}
