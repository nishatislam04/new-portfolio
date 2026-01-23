"use client";

import ArrowUpRightIcon from "@/assets/icons/arrow-up-right-icon.tsx";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/utils";

export default function ContactButton({ jumpto }: { jumpto: string }) {
	return (
		<Button
			variant="ghost"
			className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 w-max border border-gray-900"
			onClick={() => scrollToElement(jumpto)}
		>
			<span className="font-semibold">Contact Me</span>
			<ArrowUpRightIcon className="size-4" />
		</Button>
	);
}
