import { projectImages } from "@/assets/images";

export const PERSONAL_INFO = {
	// Basic Information
	name: "Nishat Mazumder",
	title: "Full Stack Web Developer",

	// Profile/Bio
	profile: `Full Stack Web Developer specializing in Next.js, Laravel, and React. I build enterprise-grade applications with modern technologies and clean, scalable code.`,

	// Contact Information
	email: "nishatislam3108@gmail.com",
	phone: "+880 1641102404",
	location: "Rampura, Dhaka, Bangladesh",
	locationLink: "https://maps.app.goo.gl/eCvVBcRV2HD5nWxE9",
	availability: "Available for freelance projects",

	// Social Links
	socialLinks: {
		linkedin: "https://www.linkedin.com/in/nishat-mazumder/",
		github: "https://github.com/nishatislam04",
		whatsapp: "https://wa.me/8801641102404",
		messenger: "https://m.me/nishat.mazumder.004",
	},

	CONTACT_INFO: {
		email: "nishatislam3108@gmail.com",
		github: "https://github.com/nishatislam04",
		phone: "+880 1641102404",
		location: "Rampura, Dhaka, Bangladesh",
		locationLink: "https://maps.app.goo.gl/eCvVBcRV2HD5nWxE9",
		availability: "Available for freelance projects",
	},

	SOCIAL_LINKS: [
		{
			name: "Gmail",
			url: `mailto:nishatislam3108@gmail.com`,
			icon: "gmail",
		},
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com/in/nishat-mazumder/",
			icon: "linkedin",
		},
		{
			name: "WhatsApp",
			url: "https://wa.me/8801641102404",
			icon: "whatsapp",
		},
		{
			name: "Messenger",
			url: "https://m.me/nishat.mazumder.004",
			icon: "messenger",
		},
	],

	// Work Experience
	workExperience: [
		{
			company: "SOFTBD LTD",
			position: "Junior Software Engineer",
			duration: "July 2024 - Current",
			startDate: "July 2024",
			endDate: "Current",
			location: "Dhaka, Bangladesh",
			type: "Full-time",
			description: "Actively contributed to real-world projects, collaborating closely with team members, gaining valuable hands-on experience in full-stack web development.",
			achievements: [
				"Actively contributed to real-world projects, collaborating closely with team members, gaining valuable hands-on experience in full-stack web development.",
				"Acquired and applied new technologies, including modern PHP techniques and Laravel best practices, significantly enhancing my problem-solving and project execution skills.",
			],
			technologies: ["PHP", "Laravel", "React", "MySQL"],
		},
	],

	// Technical Skills
	skills: ["JavaScript", "TypeScript", "React", "Next.js", "PHP", "Laravel", "Vue.js", "MySQL", "PostgreSQL", "Prisma ORM", "NextAuth.js", "Zustand", "Docker", "Tailwind CSS", "Shadcn UI", "TipTap", "Framer Motion", "Git", "Bun"],

	techStack: ["Next.js", "Laravel", "React", "PostgreSQL", "Prisma ORM", "Docker"],

	// Stats
	stats: {
		experience: "1+",
		projectsCompleted: "10+",
		technologies: "20+",
		clientSatisfaction: "100%",
	},

	// Achievements
	achievements: [
		{
			info: "how many years development",
			number: "1+",
			text: "years of professional development experience",
		},
		{
			info: "how many projects",
			number: "10+",
			text: "successful projects delivered",
		},
		{
			info: "how many technologies mastered",
			number: "20+",
			text: "modern web technologies mastered",
		},
		{
			info: "client satisfaction",
			number: "100%",
			text: "client satisfaction rate",
		},
	],

	// Education
	education: [
		{
			degree: "Diploma in Computer Science",
			institution: "Feni Computer Institute, Feni",
			duration: "2021 - 2024",
			gpa: "3.72",
			maxGpa: "4.0",
			description: "My Academice Background",
			highlights: ["Strong foundation in programming languages and software development", "Database design and management principles", "Web development technologies and frameworks", "Software engineering best practices", "Problem-solving and analytical thinking"],
		},
	],

	portfolioProjects: [
		{
			company: "SoftBd LTD",
			year: "2024",
			title: "Organization Management System",
			results: [
				{ title: "Role-based permission system with 3 user levels (Super, Admin, Member)" },
				{ title: "Automated installment tracking with penalty calculation for overdue payments" },
				{ title: "Google OAuth integration for seamless user authentication" },
				{ title: "Email notification system for payment reminders and alerts" },
				{ title: "Comprehensive subscription management with installment tracking" },
			],
			link: "#", // Private project - no public access
			image: projectImages.organizationCover,
			technologies: ["Laravel", "TailwindCSS", "MySQL", "Gmail API", "Google OAuth"],
			description: "A comprehensive organization management system where Super users manage organizations and subscriptions, Admins handle assigned organizations, and Members join organizations with automated payment tracking and penalty management.",
			hasLiveDemo: false,
			isPrivate: true,
		},
		{
			company: "Personal Project",
			year: "2025",
			title: "Team-Docs - Collaborative Documentation Platform",
			results: [
				{ title: "TipTap-powered Notion-like editor with slash commands and real-time collaboration" },
				{ title: "Multi-tenant architecture with workspace isolation and role-based permissions" },
				{ title: "PostgreSQL full-text search with ranking algorithms and workspace-scoped security" },
				{ title: "Comprehensive admin dashboard with workspace approval and user management" },
				{ title: "NextAuth.js JWT authentication with middleware-based route protection" },
				{ title: "Performance optimized with Server Actions and React 18 concurrent features" },
			],
			link: "https://team-docs-new.vercel.app/",
			image: projectImages.teamDocsCover,
			technologies: ["Next.js 15", "PostgreSQL", "Prisma ORM", "NextAuth.js", "TipTap", "Tailwind CSS v4", "Shadcn UI", "Zustand", "Docker"],
			description: "A modern, enterprise-grade collaborative documentation platform featuring Notion-like editing experience, multi-tenant architecture, and advanced workspace management designed for efficient team knowledge sharing.",
			hasLiveDemo: true,
			isComingSoon: false,
		},
		{
			company: "SoftBd LTD",
			year: "2024",
			title: "Jukto News Platform",
			results: [
				{ title: "Real-time news aggregation from multiple sources and categories" },
				{ title: "Advanced content management with automated news scraping" },
				{ title: "Interactive UI components with responsive design across all devices" },
				{ title: "Streamlined user navigation with efficient performance optimization" },
				{ title: "REST API integration for seamless data flow and updates" },
			],
			link: "#", // No public access available
			image: projectImages.juktoCover,
			technologies: ["Laravel", "React", "MySQL", "TailwindCSS", "REST APIs"],
			description: "A dynamic news aggregation platform offering up-to-date articles from various categories with real-time updates, content management, and interactive user interface for enhanced engagement.",
			hasLiveDemo: false,
			isPrivate: true,
		},
	],
};

// Export individual items for easier access
export const { name, title, profile, email, location, availability, socialLinks, workExperience, skills, techStack, stats, achievements, education, portfolioProjects } = PERSONAL_INFO;
