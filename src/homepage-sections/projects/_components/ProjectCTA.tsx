"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui/button";

export default function ProjectCTA() {
	return (
		<FadeIn delay={0.6}>
			<div className="text-center mt-16">
				<p className="text-gray-400 mb-6">Interested in working together?</p>
				<Button
					size="lg"
					onClick={() => {
						const element = document.getElementById("contact");
						element?.scrollIntoView({ behavior: "smooth" });
					}}
					className="group rounded-xl px-12 py-6 text-lg"
				>
					Let's Talk
					<ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
				</Button>
			</div>
		</FadeIn>
	);
}
