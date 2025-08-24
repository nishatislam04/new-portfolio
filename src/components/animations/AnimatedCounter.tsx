"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
	value: string;
	className?: string;
}

export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	
	// Extract numeric value and suffix (like +, %)
	const numericMatch = value.match(/(\d+)(.*)$/);
	const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
	const suffix = numericMatch ? numericMatch[2] : value;
	
	const motionValue = useMotionValue(0);
	const springValue = useSpring(motionValue, {
		damping: 60,
		stiffness: 100,
	});
	
	useEffect(() => {
		if (isInView) {
			motionValue.set(numericValue);
		}
	}, [isInView, numericValue, motionValue]);
	
	useEffect(() => {
		const unsubscribe = springValue.on("change", (latest) => {
			if (ref.current) {
				ref.current.textContent = Math.floor(latest) + suffix;
			}
		});
		
		return () => unsubscribe();
	}, [springValue, suffix]);
	
	return (
		<motion.div
			ref={ref}
			className={className}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			{numericValue > 0 ? "0" + suffix : value}
		</motion.div>
	);
}
