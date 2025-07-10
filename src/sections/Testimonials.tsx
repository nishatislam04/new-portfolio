"use client";

import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";

const testimonials = [
	{
		name: "Alex Turner",
		position: "Marketing Manager @ TechStartups",
		text: "Alex was instrumental in transforming our website into a powerful marketing tool. His attention to detail and ability to understand our brand is exceptional. We're thrilled with the results!",
		avatar: memojiAvatar1,
	},
	{
		name: "Olivia Green",
		position: "Head of Design @ GreenLeaf",
		text: "Working with Alex was a pleasure. His expertise in frontend development brought our designs to life in a way we never imagined. The website has exceeded our expectations.",
		avatar: memojiAvatar2,
	},
	{
		name: "Daniel White",
		position: "CEO @ InnovateCo",
		text: "Alex's ability to create seamless user experiences is unmatched. Our website has seen a significant increase in conversions since launching the new design. We couldn't be happier.",
		avatar: memojiAvatar3,
	},
	{
		name: "Emily Carter",
		position: "Product Manager @ GlobalTech",
		text: "Alex is a true frontend wizard. He took our complex product and transformed it into an intuitive and engaging user interface. We're already seeing positive feedback from our customers.",
		avatar: memojiAvatar4,
	},
	{
		name: "Michael Brown",
		position: "Director of IT @ MegaCorp",
		text: "Alex's work on our website has been nothing short of exceptional. He's a talented developer who is also a great communicator. We highly recommend him.",
		avatar: memojiAvatar5,
	},
];

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, Card, CardContent } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { CheckCircleIcon } from "@/components/icons";
import { otherImages } from "@/assets/images";
import { PortfolioTestimonial } from "@/types";

const TestimonialCard = ({ testimonial, index }: { testimonial: PortfolioTestimonial; index: number }) => {

	return (
		<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -5 }} className="group">
			<Card variant="glass" className="h-full hover:border-emerald-500/30 transition-all duration-500">
				<CardContent className="p-6">
					<div className="space-y-4">
						{/* Quote */}
						<blockquote className="text-gray-300 leading-relaxed italic">"{testimonial.text}"</blockquote>

						{/* Author info */}
						<div className="flex items-center gap-4 pt-4 border-t border-gray-700/50">
							<div className="relative w-12 h-12 rounded-full overflow-hidden">
								<Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
							</div>

							<div className="flex-1">
								<div className="flex items-center gap-2">
									<h4 className="font-semibold text-white">{testimonial.name}</h4>
									<CheckCircleIcon className="w-4 h-4 text-emerald-400" />
								</div>
								<p className="text-sm text-gray-400">
									{testimonial.position}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export const TestimonialsSection = () => {
	return (
		<Section id="testimonials" className="relative">
			{/* Background elements */}
			<div className="absolute inset-0 opacity-5">
				<Image src={otherImages.grain} alt="" fill className="object-cover" />
			</div>

			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-4">
								What <span className="gradient-text">Clients Say</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">Don't just take my word for it. Here's what clients and colleagues have to say about working with me.</p>
						</div>
					</FadeIn>

					{/* Testimonials Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
						))}
					</div>

					{/* Stats */}
					<FadeIn delay={0.8}>
						<div className="mt-16 pt-16 border-t border-gray-700/50">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
								<motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
									<div className="text-3xl md:text-4xl font-bold gradient-text">20+</div>
									<div className="text-gray-400">Projects Completed</div>
								</motion.div>

								<motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
									<div className="text-3xl md:text-4xl font-bold gradient-text">15+</div>
									<div className="text-gray-400">Happy Clients</div>
								</motion.div>

								<motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
									<div className="text-3xl md:text-4xl font-bold gradient-text">3+</div>
									<div className="text-gray-400">Years Experience</div>
								</motion.div>

								<motion.div whileHover={{ scale: 1.05 }} className="space-y-2">
									<div className="text-3xl md:text-4xl font-bold gradient-text">100%</div>
									<div className="text-gray-400">Client Satisfaction</div>
								</motion.div>
							</div>
						</div>
					</FadeIn>
				</StaggerContainer>
			</div>
		</Section>
	);
};
