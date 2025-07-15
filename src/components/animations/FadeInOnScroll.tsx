"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInOnScrollProps {
	children: ReactNode;
	delay?: number; // in seconds
	duration?: number;
	direction?: "left" | "right" | "top" | "bottom";
	className?: string;
	hoverEffect?: boolean;
}

export function FadeInOnScroll({ children, delay = 0, duration = 0.5, direction = "left", className = "", hoverEffect = true }: FadeInOnScrollProps) {
	// Slide direction animation setup
	const offsetMap = {
		left: { x: -20, y: 0 },
		right: { x: 20, y: 0 },
		top: { x: 0, y: -20 },
		bottom: { x: 0, y: 20 },
	};

	const offset = offsetMap[direction] || { x: 0, y: 0 };

	return (
		<motion.div initial={{ opacity: 0, ...offset }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration, delay }} whileHover={hoverEffect ? { scale: 1.02 } : {}} {...{ className: `transition-all duration-300 ${className}` }}>
			{children}
		</motion.div>
	);
}
