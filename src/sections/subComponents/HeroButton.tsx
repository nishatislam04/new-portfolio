"use client";

import { scrollToElement } from "@/utils";

export default function HeroButton({ jumpTo, text, children, className }: { jumpTo?: string; text: string; children: React.ReactNode; className?: string }) {
	return (
		<button onClick={() => scrollToElement(jumpTo)} className={`inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl ${className}`}>
			<span className="font-semibold">{text}</span>
			{children}
		</button>
	);
}
