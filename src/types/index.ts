import { StaticImageData } from "next/image";

export interface Project {
	id: string;
	title: string;
	description: string;
	image: StaticImageData;
	technologies: string[];
	liveUrl?: string;
	githubUrl?: string;
	featured?: boolean;
}

export interface PortfolioProject {
	company: string;
	year: string;
	title: string;
	results: { title: string }[];
	link: string;
	image: StaticImageData;
	technologies?: string[];
	description?: string;
	hasLiveDemo?: boolean;
	isComingSoon?: boolean;
	isPrivate?: boolean;
}

export interface Testimonial {
	id: string;
	name: string;
	role: string;
	company: string;
	content: string;
	avatar: StaticImageData;
	rating: number;
}

export interface PortfolioTestimonial {
	name: string;
	position: string;
	text: string;
	avatar: StaticImageData;
}

export interface Skill {
	name: string;
	icon: string;
	category: "frontend" | "backend" | "tools" | "design";
}

export interface ContactForm {
	name: string;
	email: string;
	message: string;
}

export interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

export interface NavItem {
	name: string;
	href: string;
}
