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

export function TechStackCard({ tech, index }: { tech: { name: string; icon: React.ReactNode }; index: number }) {
	return (
		<motion.div 
			initial={{ opacity: 0, scale: 0.8 }} 
			whileInView={{ opacity: 1, scale: 1 }} 
			viewport={{ once: true }} 
			transition={{ duration: 0.5, delay: index * 0.1 }} 
			whileHover={{ scale: 1.05, y: -5 }}
		>
			<Card 
				variant="glass" 
				className="p-4 text-center group hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
			>
				{/* Subtle infinite background animations */}
				<div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
				
				{/* Enhanced infinite border animations */}
				<motion.div 
					className="absolute inset-0 rounded-xl border border-emerald-500/20"
					animate={{
						boxShadow: [
							"0 0 0 0 rgba(16, 185, 129, 0.1)",
							"0 0 15px 3px rgba(16, 185, 129, 0.3)",
							"0 0 0 0 rgba(16, 185, 129, 0.1)"
						]
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
						delay: index * 0.5
					}}
				/>
				
				{/* Animated border gradient */}
				<motion.div 
					className="absolute inset-0 rounded-xl"
					style={{
						background: "linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent)",
						backgroundSize: "200% 200%"
					}}
					animate={{
						backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
						delay: index * 0.3
					}}
				/>
				
				{/* Pulsing border highlight */}
				<motion.div 
					className="absolute inset-0 rounded-xl border-2 border-emerald-500/0"
					animate={{
						borderColor: [
							"rgba(16, 185, 129, 0)",
							"rgba(16, 185, 129, 0.2)",
							"rgba(56, 189, 248, 0.2)",
							"rgba(16, 185, 129, 0)"
						]
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: index * 0.7
					}}
				/>
				
				{/* Infinite subtle background shimmer */}
				<motion.div 
					className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent"
					animate={{
						x: ["-100%", "100%"]
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
						delay: index * 0.3
					}}
				/>
				
				<div className="relative z-10">
					<div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
						<TechIcon icon={tech.icon} />
					</div>
					<p className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-sky-300 transition-all duration-300">
						{tech.name}
					</p>
				</div>
			</Card>
		</motion.div>
	);
}
