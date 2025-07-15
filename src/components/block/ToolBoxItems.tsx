"use client";

import { motion } from "framer-motion";

export default function ToolBoxItems({ item, index }: { item: { title: string; icon: React.ReactNode }; index: number }) {
	return (
		<motion.div
			{...{ className: "inline-flex items-center gap-3 px-3 py-2 bg-gray-800/50 outline outline-2 outline-white/10 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300" }}
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
}
