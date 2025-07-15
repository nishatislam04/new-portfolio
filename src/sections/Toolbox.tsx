"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { otherImages } from "@/assets/images";
import JavaScriptIcon from "@/assets/icons/stacks/js.svg";
import TypeScriptIcon from "@/assets/icons/stacks/ts.svg";
import ReactIcon from "@/assets/icons/stacks/react.svg";
import NextJSIcon from "@/assets/icons/stacks/nextjs.svg";
import NestJSIcon from "@/assets/icons/stacks/nestjs.svg";
import PHPIcon from "@/assets/icons/stacks/php.svg";
import LaravelIcon from "@/assets/icons/stacks/laravel.svg";
import MySQLIcon from "@/assets/icons/stacks/mysql.svg";
import PostgreSQLIcon from "@/assets/icons/stacks/postgres.svg";
import PrismaIcon from "@/assets/icons/stacks/prisma.svg";
import TailwindCssIcon from "@/assets/icons/stacks/tailwindcss.svg";
import SASSIcon from "@/assets/icons/stacks/sass.svg";
import RedisIcon from "@/assets/icons/stacks/redis.svg";
import DockerIcon from "@/assets/icons/stacks/docker.svg";
import GitIcon from "@/assets/icons/stacks/git.svg";

// Toolbox items with tech stack
const toolboxItemsOne = [
	{ title: "JavaScript", icon: <JavaScriptIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "TypeScript", icon: <TypeScriptIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "React", icon: <ReactIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Next.js", icon: <NextJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "NestJS", icon: <NestJSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "PHP", icon: <PHPIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Laravel", icon: <LaravelIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
];

const toolboxItemsTwo = [
	{ title: "MySQL", icon: <MySQLIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "PostgreSQL", icon: <PostgreSQLIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Prisma ORM", icon: <PrismaIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Tailwind CSS", icon: <TailwindCssIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "SASS", icon: <SASSIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Redis", icon: <RedisIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Docker", icon: <DockerIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
	{ title: "Git", icon: <GitIcon className="size-10 fill-[url(#tech-icon-gradient)]" /> },
];

const ToolboxItem = ({ item, index }: { item: (typeof toolboxItemsOne)[0]; index: number }) => (
	<motion.div
		className="inline-flex items-center gap-3 px-3 py-2 bg-gray-800/50 outline outline-2 outline-white/10 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
		initial={{ opacity: 0, scale: 0.8 }}
		whileInView={{ opacity: 1, scale: 1 }}
		viewport={{ once: true }}
		transition={{ duration: 0.5, delay: index * 0.05 }}
		whileHover={{ scale: 1.05, y: -3 }}>
		{/* icon */}
		<div className="size-10">{item.icon}</div>
		<svg className="size-0 absolute">
			<linearGradient id="tech-icon-gradient">
				<stop offset="0%" stopColor="rgb(110 231 183)" />
				<stop offset="100%" stopColor="rgb(56 189 248)" />
			</linearGradient>
		</svg>

		<span className="font-semibold">{item.title}</span>
	</motion.div>
);

export default function ToolboxSection() {
	return (
		<Section className="relative overflow-hidden">
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
						<div className="flex flex-col gap-8">
							{/* First row (toolboxItemsOne) */}
							<div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
								<div className="flex w-max gap-4 mx-auto animate-move-left [animation-duration:30s]">
									{[...toolboxItemsOne, ...toolboxItemsOne].map((item, index) => (
										<ToolboxItem key={`${item.title}-${index}`} item={item} index={index} />
									))}
								</div>
							</div>

							{/* Second row (toolboxItemsTwo) */}
							<div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
								<div className="flex w-max gap-4 mx-auto animate-move-right [animation-duration:30s]">
									{[...toolboxItemsTwo, ...toolboxItemsTwo].reverse().map((item, index) => (
										<ToolboxItem key={`${item.title}-${index}`} item={item} index={index} />
									))}
								</div>
							</div>
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
}
