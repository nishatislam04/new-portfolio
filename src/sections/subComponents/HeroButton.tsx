"use client";

import { scrollToElement } from "@/utils";

interface HeroButtonProps {
	jumpTo?: string;
	href?: string;
	text: string;
	children: React.ReactNode;
	className?: string;
}

export default function HeroButton({ jumpTo, href, text, children, className }: HeroButtonProps) {
	const handleClick = () => {
		if (href) {
			window.open(href, "_blank", "noopener,noreferrer");
		} else if (jumpTo) {
			scrollToElement(jumpTo);
		}
	};

	const baseStyles = "inline-flex items-center gap-4 border border-white/15 px-6 h-12 rounded-xl transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:scale-105 active:scale-95";

	return (
		<button onClick={handleClick} className={`${baseStyles} ${className || ""}`}>
			<span className="font-semibold">{text}</span>
			{children}
		</button>
	);
}
