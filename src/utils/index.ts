import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(elementId?: string) {
	const element = document.getElementById(elementId || "");
	if (element) {
		element.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}
}
