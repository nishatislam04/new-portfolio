"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { otherImages } from "@/assets/images";

// Tech stack icons as simple blue gradient rectangles with text
const TechIcon = ({ name }: { name: string }) => {
	return (
		<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
			<span className="text-white text-xs font-bold">{name.slice(0, 2).toUpperCase()}</span>
		</div>
	);
};

// Toolbox items with tech stack
const toolboxItems = [
	{ title: "JavaScript" },
	{ title: "TypeScript" },
	{ title: "React" },
	{ title: "Next.js" },
	{ title: "NestJS" },
	{ title: "PHP" },
	{ title: "Laravel" },
	{ title: "MySQL" },
	{ title: "PostgreSQL" },
	{ title: "Prisma ORM" },
	{ title: "Tailwind CSS" },
	{ title: "SASS" },
	{ title: "Shadcn UI" },
	{ title: "Zustand" },
	{ title: "NextAuth.js" },
	{ title: "Redis" },
	{ title: "Docker" },
	{ title: "Git" },
	{ title: "Bun" },
];

const ToolboxItem = ({ item, index }: { item: (typeof toolboxItems)[0]; index: number }) => (
	<motion.div
		className="inline-flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
		initial={{ opacity: 0, scale: 0.8 }}
		whileInView={{ opacity: 1, scale: 1 }}
		viewport={{ once: true }}
		transition={{ duration: 0.5, delay: index * 0.05 }}
		whileHover={{ scale: 1.05, y: -3 }}>
		<div className="text-blue-400">
			<TechIcon name={item.title} />
		</div>
		<span className="text-white font-medium text-sm bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{item.title}</span>
	</motion.div>
);

export const ToolboxSection = () => {
	return (
		<Section className="relative overflow-hidden">
			{/* Background elements */}
			<div className="absolute inset-0 opacity-5">
				<Image src={otherImages.grain} alt="" fill className="object-cover" />
			</div>

			{/* Animated background shapes */}
			<div className="absolute inset-0">
				<motion.div
					className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				<motion.div
					className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.5, 0.3, 0.5],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 4,
					}}
				/>
			</div>

			<div className="relative z-10">
				<StaggerContainer>
					{/* Section header */}
					<FadeIn>
						<div className="text-center mb-16">
							<h2 className="heading-2 mb-4">
								My <span className="gradient-text">Toolbox</span>
							</h2>
							<p className="body-large text-gray-400 max-w-2xl mx-auto">Explore the technologies and tools I use to craft exceptional digital experiences.</p>
						</div>
					</FadeIn>

					{/* Toolbox Grid */}
					<FadeIn delay={0.2}>
						<div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
							{toolboxItems.map((item, index) => (
								<ToolboxItem key={item.title} item={item} index={index} />
							))}
						</div>
					</FadeIn>

					{/* Additional info */}
					<FadeIn delay={0.4}>
						<div className="text-center mt-12">
							<p className="text-gray-400 text-sm">And many more tools and technologies that I continue to explore and master.</p>
						</div>
					</FadeIn>
				</StaggerContainer>
			</div>
		</Section>
	);
};
