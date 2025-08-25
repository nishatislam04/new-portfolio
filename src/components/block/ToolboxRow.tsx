"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Import all SVG icons
import JavaScriptIcon from "@/assets/icons/stacks/javascript.png";
import TypeScriptIcon from "@/assets/icons/stacks/typescript.png";
import ReactIcon from "@/assets/icons/stacks/reactjs.png";
import NextJSIcon from "@/assets/icons/stacks/nextjs.png";
import NestJSIcon from "@/assets/icons/stacks/nestjs.png";
import PHPIcon from "@/assets/icons/stacks/php.png";
import LaravelIcon from "@/assets/icons/stacks/laravel.png";
import MySQLIcon from "@/assets/icons/stacks/mysql.png";
import PostgreSQLIcon from "@/assets/icons/stacks/postgresql.png";
import PrismaIcon from "@/assets/icons/stacks/prisma.png";
import TailwindCssIcon from "@/assets/icons/stacks/tailwindcss.png";
import SASSIcon from "@/assets/icons/stacks/sass.png";
import RedisIcon from "@/assets/icons/stacks/redis.png";
import DockerIcon from "@/assets/icons/stacks/docker.png";
import GitIcon from "@/assets/icons/stacks/git.png";
import ZodIcon from "@/assets/icons/stacks/zod.png";
import ZustandIcon from "@/assets/icons/stacks/zustand.svg";
import InertiaIcon from "@/assets/icons/stacks/inertia.png";
import ShadcnIcon from "@/assets/icons/stacks/shadcnUI.png";
import MantineIcon from "@/assets/icons/stacks/mantineUI.png";
import ReactHookFormIcon from "@/assets/icons/stacks/reactHookForm.png";
import TiptapIcon from "@/assets/icons/stacks/tiptap.jpeg";
import LaravelReverbIcon from "@/assets/icons/stacks/laravelReverb.png";

interface ToolboxItem {
	readonly title: string;
	readonly icon: string;
}

interface ToolboxRowProps {
	category: {
		readonly id: string;
		readonly title: string;
		readonly color: "emerald" | "sky" | "violet" | "amber" | "slate" | "rose";
		readonly items: readonly ToolboxItem[];
	};
	index: number;
}

const colorSchemes = {
	emerald: {
		titleText: "text-emerald-400",
		iconFill: "fill-emerald-400",
		hoverBg: "hover:bg-emerald-500/10",
		activeBg: "active:bg-emerald-500/20",
		gradientFrom: "from-emerald-400",
		gradientTo: "to-emerald-500",
	},
	sky: {
		titleText: "text-sky-400",
		iconFill: "fill-sky-400",
		hoverBg: "hover:bg-sky-500/10",
		activeBg: "active:bg-sky-500/20",
		gradientFrom: "from-sky-400",
		gradientTo: "to-sky-500",
	},
	violet: {
		titleText: "text-violet-400",
		iconFill: "fill-violet-400",
		hoverBg: "hover:bg-violet-500/10",
		activeBg: "active:bg-violet-500/20",
		gradientFrom: "from-violet-400",
		gradientTo: "to-violet-500",
	},
	amber: {
		titleText: "text-amber-400",
		iconFill: "fill-amber-400",
		hoverBg: "hover:bg-amber-500/10",
		activeBg: "active:bg-amber-500/20",
		gradientFrom: "from-amber-400",
		gradientTo: "to-orange-500",
	},
	slate: {
		titleText: "text-slate-400",
		iconFill: "fill-slate-400",
		hoverBg: "hover:bg-slate-500/10",
		activeBg: "active:bg-slate-500/20",
		gradientFrom: "from-slate-400",
		gradientTo: "to-slate-500",
	},
	rose: {
		titleText: "text-rose-400",
		iconFill: "fill-rose-400",
		hoverBg: "hover:bg-rose-500/10",
		activeBg: "active:bg-rose-500/20",
		gradientFrom: "from-rose-400",
		gradientTo: "to-rose-500",
	},
} as const;

// Icon mapping
const iconComponents = {
	js: JavaScriptIcon,
	ts: TypeScriptIcon,
	react: ReactIcon,
	nextjs: NextJSIcon,
	nestjs: NestJSIcon,
	php: PHPIcon,
	laravel: LaravelIcon,
	mysql: MySQLIcon,
	postgres: PostgreSQLIcon,
	prisma: PrismaIcon,
	tailwindcss: TailwindCssIcon,
	sass: SASSIcon,
	redis: RedisIcon,
	docker: DockerIcon,
	git: GitIcon,
	zod: ZodIcon,
	zustand: ZustandIcon,
	inertia: InertiaIcon,
	shadcnUI: ShadcnIcon,
	mantineUI: MantineIcon,
	reactHookForm: ReactHookFormIcon,
	tiptap: TiptapIcon,
	laravelReverb: LaravelReverbIcon,
} as const;

// Custom icon generator for tools without SVGs
const getCustomIcon = (title: string, colors: any) => {
	const getInitials = (str: string) => {
		const words = str.split(" ");
		if (words.length === 1) return str.charAt(0).toUpperCase();
		if (words.length === 2) return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
		return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
	};

	const initials = getInitials(title);

	return <div className={cn("size-10 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg bg-gradient-to-br", colors.gradientFrom, colors.gradientTo)}>{initials}</div>;
};

export default function ToolboxRow({ category, index }: ToolboxRowProps) {
	const colors = colorSchemes[category.color];

	return (
		<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="w-full mb-20 group/category">
			{/* Category Title */}
			<div className="text-center mb-6">
				<h3 className={cn("text-2xl font-bold transition-colors duration-300 mb-3", colors.titleText)}>{category.title}</h3>
				{/* Colorful Border Bottom */}
				<div className="flex justify-center">
					<div className={cn("h-1 w-12 rounded-full bg-gradient-to-r transition-all duration-500 ease-out", "group-hover/category:w-24", colors.gradientFrom, colors.gradientTo)} />
				</div>
			</div>

			{/* Horizontal Tools Row */}
			<div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
				{category.items.map((item, itemIndex) => {
					const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];
					const isRaster = typeof IconComponent === "string" || (typeof IconComponent === "object" && IconComponent !== null && "src" in IconComponent);

					return (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.4,
								delay: index * 0.1 + itemIndex * 0.05,
							}}
							whileHover={{ scale: 1.1, y: -4 }}
							whileTap={{ scale: 0.95 }}
							className={cn("flex flex-col items-center gap-3 py-2 px-4 rounded-xl cursor-pointer", "transition-all duration-300 group", colors.hoverBg, colors.activeBg)}>
							{/* Icon */}
							<div className="transition-all duration-300 group-hover:scale-110">
								{IconComponent ? (
									isRaster ? (
										<Image src={IconComponent as any} alt={item.title} width={40} height={40} className={cn("size-10 object-contain select-none")} priority={false} />
									) : (
										(() => {
											const SvgComp = IconComponent as React.ComponentType<React.SVGProps<SVGSVGElement>>;
											return <SvgComp className={cn("size-10 transition-transform duration-300 select-none")} />;
										})()
									)
								) : (
									getCustomIcon(item.title, colors)
								)}
							</div>

							{/* Tool name */}
							<span className={cn("text-sm font-medium text-center leading-tight transition-colors duration-300", colors.titleText, "group-hover:text-white")}>{item.title}</span>
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
}
