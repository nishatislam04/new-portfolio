"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToolboxItem {
	readonly title: string;
	readonly icon: React.ReactNode;
}

interface ToolboxCategoryProps {
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
		gradient: "from-emerald-400 to-emerald-500",
		border: "border-emerald-500/20 hover:border-emerald-500/40",
		bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
		iconFill: "fill-emerald-400",
		titleText: "text-emerald-400",
		glowShadow: "shadow-emerald-500/20",
	},
	sky: {
		gradient: "from-sky-400 to-sky-500",
		border: "border-sky-500/20 hover:border-sky-500/40",
		bg: "bg-sky-500/5 hover:bg-sky-500/10",
		iconFill: "fill-sky-400",
		titleText: "text-sky-400",
		glowShadow: "shadow-sky-500/20",
	},
	violet: {
		gradient: "from-violet-400 to-violet-500",
		border: "border-violet-500/20 hover:border-violet-500/40",
		bg: "bg-violet-500/5 hover:bg-violet-500/10",
		iconFill: "fill-violet-400",
		titleText: "text-violet-400",
		glowShadow: "shadow-violet-500/20",
	},
	amber: {
		gradient: "from-amber-400 to-orange-500",
		border: "border-amber-500/20 hover:border-amber-500/40",
		bg: "bg-amber-500/5 hover:bg-amber-500/10",
		iconFill: "fill-amber-400",
		titleText: "text-amber-400",
		glowShadow: "shadow-amber-500/20",
	},
	slate: {
		gradient: "from-slate-400 to-slate-500",
		border: "border-slate-500/20 hover:border-slate-500/40",
		bg: "bg-slate-500/5 hover:bg-slate-500/10",
		iconFill: "fill-slate-400",
		titleText: "text-slate-400",
		glowShadow: "shadow-slate-500/20",
	},
	rose: {
		gradient: "from-rose-400 to-rose-500",
		border: "border-rose-500/20 hover:border-rose-500/40",
		bg: "bg-rose-500/5 hover:bg-rose-500/10",
		iconFill: "fill-rose-400",
		titleText: "text-rose-400",
		glowShadow: "shadow-rose-500/20",
	},
} as const;

export default function ToolboxCategory({ category, index }: ToolboxCategoryProps) {
	const colors = colorSchemes[category.color];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -5 }}
			className={cn(
				"group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300",
				"bg-gray-800/50 border-gray-700/50",
				colors.border,
				colors.bg,
				"hover:shadow-lg",
				colors.glowShadow
			)}
		>
			{/* Category Header */}
			<div className="mb-6">
				<h3 className={cn(
					"text-xl font-bold mb-2 transition-colors duration-300",
					colors.titleText
				)}>
					{category.title}
				</h3>
				<div className={cn(
					"h-1 w-12 rounded-full bg-gradient-to-r transition-all duration-300 group-hover:w-16",
					colors.gradient
				)} />
			</div>

			{/* Tools Grid */}
			<div className="grid grid-cols-2 gap-4">
				{category.items.map((item, itemIndex) => (
					<motion.div
						key={item.title}
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ 
							duration: 0.4, 
							delay: (index * 0.1) + (itemIndex * 0.05) 
						}}
						whileHover={{ scale: 1.05, y: -2 }}
						className={cn(
							"flex flex-col items-center gap-2 p-3 rounded-xl",
							"bg-gray-900/50 border border-gray-700/30",
							"hover:bg-gray-800/50 hover:border-gray-600/50",
							"transition-all duration-300 cursor-pointer"
						)}
					>
						{/* Icon with dynamic gradient */}
						<div className="transition-all duration-300">
							{React.isValidElement(item.icon) && item.icon.type !== 'div' ? 
								React.cloneElement(item.icon as React.ReactElement, {
									className: `size-10 fill-[url(#${category.id}-gradient)]`
								}) : 
								item.icon
							}
						</div>
						
						{/* Tool name */}
						<span className={cn(
							"text-sm font-medium text-center leading-tight transition-colors duration-300",
							colors.titleText
						)}>
							{item.title}
						</span>
					</motion.div>
				))}
			</div>

			{/* Gradient SVG for icons */}
			<svg className="size-0 absolute" aria-hidden="true" focusable="false">
				<defs>
					<linearGradient id={`${category.id}-gradient`}>
						<stop offset="0%" stopColor={category.color === 'emerald' ? 'rgb(52 211 153)' : 
							category.color === 'sky' ? 'rgb(56 189 248)' :
							category.color === 'violet' ? 'rgb(139 92 246)' :
							category.color === 'amber' ? 'rgb(251 191 36)' :
							category.color === 'rose' ? 'rgb(251 113 133)' :
							'rgb(148 163 184)'} />
						<stop offset="100%" stopColor={category.color === 'emerald' ? 'rgb(16 185 129)' : 
							category.color === 'sky' ? 'rgb(14 165 233)' :
							category.color === 'violet' ? 'rgb(124 58 237)' :
							category.color === 'amber' ? 'rgb(249 115 22)' :
							category.color === 'rose' ? 'rgb(244 63 94)' :
							'rgb(100 116 139)'} />
					</linearGradient>
				</defs>
			</svg>
		</motion.div>
	);
}
