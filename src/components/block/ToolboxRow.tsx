"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Import all SVG icons
import JavaScriptIcon from "@/assets/icons/stacks/minified/js.svg";
import TypeScriptIcon from "@/assets/icons/stacks/minified/ts.svg";
import ReactIcon from "@/assets/icons/stacks/minified/react.svg";
import NextJSIcon from "@/assets/icons/stacks/minified/nextjs.svg";
import NestJSIcon from "@/assets/icons/stacks/minified/nestjs.svg";
import PHPIcon from "@/assets/icons/stacks/minified/php.svg";
import LaravelIcon from "@/assets/icons/stacks/minified/laravel.svg";
import MySQLIcon from "@/assets/icons/stacks/minified/mysql.svg";
import PostgreSQLIcon from "@/assets/icons/stacks/minified/postgres.svg";
import PrismaIcon from "@/assets/icons/stacks/minified/prisma.svg";
import TailwindCssIcon from "@/assets/icons/stacks/minified/tailwindcss.svg";
import SASSIcon from "@/assets/icons/stacks/minified/sass.svg";
import RedisIcon from "@/assets/icons/stacks/minified/redis.svg";
import DockerIcon from "@/assets/icons/stacks/minified/docker.svg";
import GitIcon from "@/assets/icons/stacks/minified/git.svg";

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
		<motion.div 
			initial={{ opacity: 0, y: 20 }} 
			whileInView={{ opacity: 1, y: 0 }} 
			viewport={{ once: true }} 
			transition={{ duration: 0.6, delay: index * 0.1 }} 
			className="w-full mb-20 group/category"
		>
			{/* Category Title */}
			<div className="text-center mb-6">
				<h3 className={cn("text-2xl font-bold transition-colors duration-300 mb-3", colors.titleText)}>
					{category.title}
				</h3>
				{/* Colorful Border Bottom */}
				<div className="flex justify-center">
					<div className={cn(
						"h-1 w-12 rounded-full bg-gradient-to-r transition-all duration-500 ease-out",
						"group-hover/category:w-24",
						colors.gradientFrom,
						colors.gradientTo
					)} />
				</div>
			</div>

			{/* Horizontal Tools Row */}
			<div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
				{category.items.map((item, itemIndex) => {
					const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];

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
							<div className="transition-all duration-300 group-hover:scale-110">{IconComponent ? <IconComponent className={cn("size-10 transition-colors duration-300", colors.iconFill)} /> : getCustomIcon(item.title, colors)}</div>

							{/* Tool name */}
							<span className={cn("text-sm font-medium text-center leading-tight transition-colors duration-300", colors.titleText, "group-hover:text-white")}>{item.title}</span>
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
}
