"use client";

import { FadeIn } from "@/components/animations";
import { Button } from "@/components/ui";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

export default function ProjectCTA() {
	return (
		<FadeIn delay={0.6}>
			<div className="text-center mt-16">
				<p className="text-gray-400 mb-6">Interested in working together?</p>
				<Button
					onClick={() => {
						const element = document.getElementById("contact");
						element?.scrollIntoView({ behavior: "smooth" });
					}}
					className="group">
					Let's Talk
					<ArrowUpRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
				</Button>
			</div>
		</FadeIn>
	);
}
