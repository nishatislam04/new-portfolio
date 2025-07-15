"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";

// Tech stack icons with blue gradient
const TechIcon = ({ icon }: { icon: React.ReactNode }) => {
	return (
		<>
			<div className="size-10">{icon}</div>
			<svg className="size-0 absolute">
				<linearGradient id="tech-icon-gradient">
					<stop offset="0%" stopColor="rgb(110 231 183)" />
					<stop offset="100%" stopColor="rgb(56 189 248)" />
				</linearGradient>
			</svg>
		</>
	);
};

export default function TechStackCard({ tech, index }: { tech: { name: string; icon: React.ReactNode }; index: number }) {
	return (
		<motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }}>
			<Card variant="glass" className="p-4 text-center group hover:border-blue-500/30 transition-all duration-300">
				<div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
					<TechIcon icon={tech.icon} />
				</div>
				<p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">{tech.name}</p>
			</Card>
		</motion.div>
	);
}
