import { Project, Testimonial, Skill, SocialLink, NavItem } from "@/types";
import { projectImages, memojiImages } from "@/assets/images";
import { PERSONAL_INFO } from "./personal-info";

// Navigation items
export const NAV_ITEMS: NavItem[] = [
	{ name: "Home", href: "#home" },
	{ name: "About", href: "#about" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

// Skills data
export const SKILLS: Skill[] = [
	{ name: "React", icon: "react", category: "frontend" },
	{ name: "JavaScript", icon: "javascript", category: "frontend" },
	{ name: "HTML5", icon: "html5", category: "frontend" },
	{ name: "CSS3", icon: "css3", category: "frontend" },
	{ name: "Chrome DevTools", icon: "chrome", category: "tools" },
];

// Projects data
export const PROJECTS: Project[] = [
	{
		id: "1",
		title: "AI Startup Landing Page",
		description: "A modern, responsive landing page for an AI startup featuring cutting-edge design and smooth animations.",
		image: projectImages.aiStartupLandingPage,
		technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
		liveUrl: "https://example.com",
		githubUrl: "https://github.com/example",
		featured: true,
	},
	{
		id: "2",
		title: "Light SaaS Landing Page",
		description: "Clean and professional SaaS landing page with light theme, optimized for conversions.",
		image: projectImages.lightSaasLandingPage,
		technologies: ["React", "TypeScript", "Tailwind CSS"],
		liveUrl: "https://example.com",
		githubUrl: "https://github.com/example",
		featured: true,
	},
	{
		id: "3",
		title: "Dark SaaS Landing Page",
		description: "Sleek dark-themed SaaS landing page with modern UI components and smooth user experience.",
		image: projectImages.darkSaasLandingPage,
		technologies: ["React", "Next.js", "Tailwind CSS"],
		liveUrl: "https://example.com",
		githubUrl: "https://github.com/example",
		featured: true,
	},
	{
		id: "4",
		title: "Book Cover Design",
		description: "Creative book cover design project showcasing design skills and attention to detail.",
		image: projectImages.bookCover,
		technologies: ["Figma", "Photoshop", "Illustrator"],
		liveUrl: "https://example.com",
		featured: false,
	},
];

// Testimonials data
export const TESTIMONIALS: Testimonial[] = [
	{
		id: "1",
		name: "Sarah Johnson",
		role: "Product Manager",
		company: "TechCorp",
		content: "Working with this developer was an absolute pleasure. The attention to detail and quality of work exceeded our expectations.",
		avatar: memojiImages.avatar1,
		rating: 5,
	},
	{
		id: "2",
		name: "Mike Chen",
		role: "CTO",
		company: "StartupXYZ",
		content: "Exceptional technical skills and great communication. Delivered our project on time and within budget.",
		avatar: memojiImages.avatar2,
		rating: 5,
	},
	{
		id: "3",
		name: "Emily Davis",
		role: "Design Lead",
		company: "Creative Agency",
		content: "The perfect blend of technical expertise and creative vision. Highly recommend for any web development project.",
		avatar: memojiImages.avatar3,
		rating: 5,
	},
	{
		id: "4",
		name: "Alex Rodriguez",
		role: "Founder",
		company: "InnovateLab",
		content: "Outstanding work quality and professional approach. Will definitely work together on future projects.",
		avatar: memojiImages.avatar4,
		rating: 5,
	},
	{
		id: "5",
		name: "Lisa Wang",
		role: "Marketing Director",
		company: "GrowthCo",
		content: "Transformed our vision into a beautiful, functional website. Great collaboration throughout the process.",
		avatar: memojiImages.avatar5,
		rating: 5,
	},
];

// Contact information
export const CONTACT_INFO = {
	email: PERSONAL_INFO.email,
	phone: PERSONAL_INFO.phone,
	location: PERSONAL_INFO.location,
	availability: PERSONAL_INFO.availability,
};

// Social links
export const SOCIAL_LINKS: SocialLink[] = [
	{
		name: "Gmail",
		url: `mailto:${PERSONAL_INFO.email}`,
		icon: "gmail",
	},
	{
		name: "LinkedIn",
		url: PERSONAL_INFO.socialLinks.linkedin,
		icon: "linkedin",
	},
	{
		name: "WhatsApp",
		url: PERSONAL_INFO.socialLinks.whatsapp,
		icon: "whatsapp",
	},
	{
		name: "Messenger",
		url: PERSONAL_INFO.socialLinks.messenger,
		icon: "messenger",
	},
];

// Tape section scrolling text
export const TAPE_WORDS = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "JavaScript", "HTML5", "CSS3", "Responsive Design", "UI/UX", "Performance"];
