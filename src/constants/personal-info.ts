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
		phone: "01641102404",
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
			description:
				"Actively contributed to real-world projects, collaborating closely with team members, gaining valuable hands-on experience in full-stack web development.",
			achievements: [
				"Actively contributed to real-world projects, collaborating closely with team members, gaining valuable hands-on experience in full-stack web development.",
				"Acquired and applied new technologies, including modern PHP techniques and Laravel best practices, significantly enhancing my problem-solving and project execution skills.",
			],
			technologies: ["PHP", "Laravel", "React", "MySQL"],
		},
	],

	// Technical Skills
	skills: [
		"JavaScript",
		"TypeScript",
		"React",
		"Next.js",
		"PHP",
		"Laravel",
		"Vue.js",
		"MySQL",
		"PostgreSQL",
		"Prisma ORM",
		"NextAuth.js",
		"Zustand",
		"Docker",
		"Tailwind CSS",
		"Shadcn UI",
		"TipTap",
		"Framer Motion",
		"Git",
		"Bun",
	],

	techStack: [
		"Next.js",
		"Laravel",
		"React",
		"PostgreSQL",
		"Prisma ORM",
		"Docker",
	],

	// Toolbox Categories
	toolboxCategories: [
		{
			id: "languages",
			title: "Languages",
			color: "emerald" as const,
			items: [
				{ title: "JavaScript", icon: "js" },
				{ title: "TypeScript", icon: "ts" },
				{ title: "PHP", icon: "php" },
			],
		},
		{
			id: "frontend",
			title: "Frontend",
			color: "sky" as const,
			items: [
				{ title: "React", icon: "react" },
				{ title: "Next.js", icon: "nextjs" },
				{ title: "Tailwind CSS", icon: "tailwindcss" },
				{ title: "SASS", icon: "sass" },
			],
		},
		{
			id: "ui-component",
			title: "UI Component",
			color: "indigo" as const,
			items: [
				{ title: "Shadcn UI", icon: "shadcnUI" },
				{ title: "Mantine UI", icon: "mantineUI" },
			],
		},
		{
			id: "backend",
			title: "Backend",
			color: "violet" as const,
			items: [
				{ title: "NestJS", icon: "nestjs" },
				{ title: "Laravel", icon: "laravel" },
				{ title: "Prisma ORM", icon: "prisma" },
				{ title: "Laravel Reverb", icon: "laravelReverb" },
			],
		},
		{
			id: "databases",
			title: "Databases",
			color: "amber" as const,
			items: [
				{ title: "MySQL", icon: "mysql" },
				{ title: "PostgreSQL", icon: "postgres" },
				{ title: "Redis", icon: "redis" },
			],
		},

		{
			id: "devops",
			title: "DevOps",
			color: "slate" as const,
			items: [
				{ title: "Docker", icon: "docker" },
				{ title: "Git", icon: "git" },
			],
		},
		{
			id: "tools",
			title: "Tools",
			color: "rose" as const,
			items: [
				{ title: "Inertia.js", icon: "inertia" },
				{ title: "React Hook Form", icon: "reactHookForm" },
				{ title: "Zustand", icon: "zustand" },
				{ title: "Zod", icon: "zod" },
				{ title: "Tiptap", icon: "tiptap" },
				{ title: "Resend", icon: "resend" },
				{ title: "Bun", icon: "bun" },
			],
		},
	] as const,

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
			highlights: [
				"Strong foundation in programming languages and software development",
				"Database design and management principles",
				"Web development technologies and frameworks",
				"Software engineering best practices",
				"Problem-solving and analytical thinking",
			],
		},
	],

	portfolioProjects: [
		{
			id: "team-docs-platform",
			company: "Personal Project",
			year: "2025",
			title: "Team-Docs - Collaborative Documentation Platform",
			status: "completed" as const,
			category: "SaaS Platform",
			tags: ["Next.js", "Collaboration", "Documentation", "Enterprise"],
			featured: true,
			priority: 1,
			shortDescription:
				"A modern, enterprise-grade collaborative documentation platform with Notion-like editing experience.",
			fullDescription:
				"A modern, enterprise-grade collaborative documentation platform featuring Notion-like editing experience, multi-tenant architecture, and advanced workspace management designed for efficient team knowledge sharing. Built with Next.js 15 and modern React patterns for optimal performance.",
			keyFeatures: [
				"TipTap-powered Notion-like editor with slash commands",
				"Multi-tenant architecture with workspace isolation",
				"PostgreSQL full-text search with ranking algorithms",
				"Comprehensive admin dashboard with workspace approval",
				"NextAuth.js JWT authentication with middleware protection",
				"Performance optimized with Server Actions",
			],
			results: [
				{
					title:
						"TipTap-powered Notion-like editor with slash commands and real-time collaboration",
				},
				{
					title:
						"Multi-tenant architecture with workspace isolation and role-based permissions",
				},
				{
					title:
						"PostgreSQL full-text search with ranking algorithms and workspace-scoped security",
				},
				{
					title:
						"Comprehensive admin dashboard with workspace approval and user management",
				},
				{
					title:
						"NextAuth.js JWT authentication with middleware-based route protection",
				},
				{
					title:
						"Performance optimized with Server Actions and React 18 concurrent features",
				},
			],
			coverImage: {
				src: projectImages.teamDocsCover,
				alt: "Team-Docs Collaborative Platform Interface",
				priority: true,
			},
			images: [
				{
					src: projectImages.teamDocsCover,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.teamDocsGallery1,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.teamDocsGallery2,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.teamDocsGallery3,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.teamDocsGallery4,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.teamDocsGallery5,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.teamDocsGallery6,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.teamDocsGallery7,
					alt: "Team-Docs Collaborative Platform Interface",
					height: 500,
					width: 500,
				},
			],
			technologies: [
				"Next.js 15",
				"PostgreSQL",
				"Prisma ORM",
				"NextAuth.js",
				"TipTap",
				"Tailwind CSS v4",
				"Shadcn UI",
				"Zustand",
				"Docker",
			],
			links: [
				{
					type: "live" as const,
					url: "https://team-docs-new.vercel.app/",
					label: "View Live Demo",
				},
			],
			// Legacy support
			link: "https://team-docs-new.vercel.app/",
			image: projectImages.teamDocsCover,
			description:
				"A modern, enterprise-grade collaborative documentation platform featuring Notion-like editing experience, multi-tenant architecture, and advanced workspace management designed for efficient team knowledge sharing.",
			hasLiveDemo: true,
			isComingSoon: false,
		},
		{
			id: "institution-management-suite",
			company: "Collaborative Project",
			year: "2024",
			title: "Institution Management Suite",
			status: "completed" as const,
			category: "Education Management",
			tags: [
				"Laravel",
				"Docker",
				"Lando",
				"Blade",
				"TailwindCSS",
				"MySQL",
				"RBAC",
				"Notifications",
				"CRUD",
			],
			featured: true,
			priority: 2,
			shortDescription:
				"Dockerized Laravel application for educational institutions with role-based admin, teacher, and student management.",
			fullDescription:
				"A Docker (Lando) powered Laravel application with Blade and TailwindCSS that centralizes institution operations: teacher and student management, class/level and group assignments, preset resources (subjects, levels, groups), a lightweight shop, notifications, and robust CRUD with authorization and validation.",
			keyFeatures: [
				"Institution, teacher, and student management with RBAC",
				"Assignments: teacher-to-class, student-to-class/group, level and group mapping",
				"Presets for subjects, levels, and groups to streamline workflows",
				"Complex form validation and policy-based authorization",
				"Notification system for key events (enrollment, assignments, orders)",
				"Shop module for basic purchases and fee tracking",
				"Dynamic forms and advanced table UI (filter, sort, bulk actions)",
			],
			results: [
				{
					title:
						"Centralized academic operations with secure role-based access",
				},
				{ title: "Reduced admin overhead via presets and bulk table actions" },
				{
					title:
						"Improved data integrity through strict validation and policies",
				},
			],
			coverImage: {
				src: projectImages.institutionCover,
				alt: "Institution Management Suite Dashboard",
				caption: "Dashboard overview (placeholder image, will be updated)",
			},
			technologies: [
				"Laravel",
				"Blade",
				"TailwindCSS",
				"MySQL",
				"Docker",
				"Lando",
			],
			links: [],
			// Legacy support
			link: "#",
			images: [
				{
					src: projectImages.institutionCover,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.institutionGallery1,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.institutionGallery2,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.institutionGallery3,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.institutionGallery4,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.institutionGallery5,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.institutionGallery6,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
				{
					src: projectImages.institutionGallery7,
					alt: "Institution Management Suite Dashboard",
					height: 500,
					width: 500,
				},
			],
			description:
				"Dockerized (Lando) Laravel app with Blade frontend for institution, teacher, and student management including assignments, presets, notifications, and robust CRUD.",
			hasLiveDemo: false,
			isPrivate: true,
		},
		// {
		// 	id: "multi-vendor-ecommerce",
		// 	company: "Personal Project",
		// 	year: "2025",
		// 	title: "Multi‑Vendor E‑Commerce Platform",
		// 	status: "in-progress" as const,
		// 	category: "E‑Commerce",
		// 	tags: [
		// 		"Laravel",
		// 		"Laravel 12",
		// 		"React",
		// 		"Inertia.js",
		// 		"Docker",
		// 		"RBAC",
		// 		"OTP",
		// 		"Real‑time",
		// 		"E‑Commerce",
		// 	],
		// 	featured: false,
		// 	priority: 1,
		// 	shortDescription:
		// 		"Dockerized Laravel 12 + React (Inertia) multi‑vendor marketplace with role hierarchy, approvals, OTP auth, and real‑time updates.",
		// 	fullDescription:
		// 		"An ongoing Dockerized Laravel 12 e‑commerce application using Inertia.js and React for a SPA‑like experience. Supports multi‑vendor operations with a clear role hierarchy (Super Admin, Vendor, Staff, Customer), product and vendor approval workflows, OTP‑backed authentication with email verification and authorization (Spatie), real‑time notifications, advanced product listings, reviews and ratings, seller chat, cart, and live delivery state tracking.",
		// 	keyFeatures: [
		// 		"Multi‑vendor system with role hierarchy (Super Admin, Vendor, Staff, Customer)",
		// 		"Product and vendor approval workflows",
		// 		"Manual authentication with email verification and OTP",
		// 		"RBAC using policies and permissions (Spatie)",
		// 		"Real‑time notifications and delivery state updates",
		// 		"Product CRUD with media, variants, and inventory basics",
		// 		"Advanced product listings: search, filters, sort, pagination",
		// 		"Product reviews and rating system",
		// 		"Buyer‑seller chat",
		// 		"Cart and checkout foundation",
		// 	],
		// 	results: [
		// 		{
		// 			title:
		// 				"Secure role hierarchy established with fine‑grained permissions",
		// 		},
		// 		{ title: "Operational vendor onboarding with approval pipeline" },
		// 		{ title: "Real‑time notification and delivery tracking implemented" },
		// 	],
		// 	coverImage: {
		// 		src: projectImages.organizationCover,
		// 		alt: "Multi‑Vendor E‑Commerce Platform Dashboard",
		// 		caption: "Marketplace overview (placeholder image, will be updated)",
		// 	},
		// 	technologies: [
		// 		"Laravel 12",
		// 		"Inertia.js",
		// 		"React",
		// 		"TailwindCSS",
		// 		"MySQL",
		// 		"Docker",
		// 		"Spatie Permission",
		// 		"Laravel Sanctum",
		// 		"Laravel Notifications",
		// 	],
		// 	architecture: [
		// 		"Laravel monolith with Inertia SPA pattern",
		// 		"React front‑end via Inertia.js",
		// 		"RBAC with role hierarchy and policies",
		// 		"Real‑time broadcasting for notifications and delivery state",
		// 	],
		// 	challenges: [
		// 		"Designing scalable role hierarchy across vendors",
		// 		"Building auditable approval workflows",
		// 		"Maintaining responsive product listings with complex filters",
		// 		"Ensuring consistent auth with OTP + email verification",
		// 	],
		// 	solutions: [
		// 		"Leveraged Spatie Permission with policies/gates for granular RBAC",
		// 		"Modeled approval states with clear transitions and audit trails",
		// 		"Server‑side filtering/sorting with indexed queries and pagination",
		// 		"Combined Sanctum session auth with OTP and verified email flow",
		// 	],
		// 	links: [],
		// 	// Legacy support
		// 	link: "#",
		// 	image: projectImages.organizationCover,
		// 	description:
		// 		"Dockerized Laravel 12 + Inertia React multi‑vendor marketplace with RBAC, approvals, OTP auth, real‑time notifications, reviews, chat, cart, and live delivery tracking.",
		// 	hasLiveDemo: false,
		// 	isComingSoon: true,
		// 	isPrivate: true,
		// },
		{
			id: "blogstream-cms",
			company: "Personal Project",
			year: "2025",
			title: "BlogStream CMS – Modern Multi-Author Publishing",
			status: "in-progress" as const,
			category: "Content Platform",
			tags: [
				"Next.js 16",
				"React 19",
				"Prisma",
				"PostgreSQL",
				"TailwindCSS v4",
				"Better Auth",
				"Resend",
				"Server Actions",
				"Bun",
				"Docker",
			],
			featured: false,
			priority: 3,
			shortDescription:
				"Smart publishing hub streaming the latest category-driven stories with rich author tooling and role-ready governance.",
			fullDescription:
				"BlogStream CMS delivers a modern blog experience powered by Next.js 16 Cache Components and React 19 Suspense to surface fresh stories, category discovery, and popular author spotlights in real time. Authenticated writers craft long-form content with a JSON-backed rich text editor, media galleries, and personalized dashboards, while Better Auth, avatar uploads that adjust between local storage and Vercel Blob, and an emerging admin area lay the groundwork for moderation, featured curation, and user governance. It’s currently private, Docker-ready for local work, and prepping for a Vercel launch once the advanced moderation and analytics features land.",
			keyFeatures: [
				"Featured hero, latest-feed pagination, and category browsing driven by Server Actions with cache lifetimes for fast homepage storytelling.",
				"Rich-text authoring pipeline storing structured JSON, preview images, tags, reactions, and scheduled publishing metadata for future editorial workflows.",
				"Role-aware UX that greets anonymous users with sign-in CTAs, switches to personal dashboards for writers, and routes admins into a dedicated panel.",
				"Better Auth signup with email verification, password reset, and profile avatar uploads that automatically pick local disk or Vercel Blob storage depending on environment.",
				"Planned enhancements include tag-powered search, homepage sorting/filtering modes, and social logins to demonstrate mastery over the React/Next.js ecosystem.",
			],
			results: [
				{
					title: "Suspense-backed feed loading",
					description:
						"Implemented Suspense-backed feed loading and toast-aware error states for seamless content browsing.",
				},
				{
					title: "Prisma-backed content model",
					description:
						"Delivered a Prisma-backed content model with authors, categories, reactions, and media that’s ready for advanced editorial analytics.",
				},
				{
					title: "Multi-environment file pipeline",
					description:
						"Shipped a multi-environment-ready file pipeline and email notifications through Resend to support branded onboarding flows.",
				},
				{
					title: "Roadmapped moderation capabilities",
					description:
						"Roadmapped moderation dashboards, featured-story controls, and social identity providers to round out enterprise storytelling capabilities.",
				},
			],
			coverImage: {
				src: projectImages.bloggishCover,
				alt: "BlogStream CMS homepage with featured story hero",
				priority: true,
			},
			images: [
				{
					src: projectImages.bloggishGallery1,
					alt: "BlogStream – Featured hero with Server Actions",
				},
				{
					src: projectImages.bloggishGallery2,
					alt: "BlogStream – Latest posts with load more",
				},
				{
					src: projectImages.bloggishGallery3,
					alt: "BlogStream – Author dashboard view",
				},
				{
					src: projectImages.bloggishGallery4,
					alt: "BlogStream – Category and popular authors discovery",
				},
				{
					src: projectImages.bloggishGallery5,
					alt: "BlogStream – Better Auth verification and reset flow",
				},
				{
					src: projectImages.bloggishGallery6,
					alt: "BlogStream – Prisma content modeling overview",
				},
			],
			technologies: [
				"Next.js 16",
				"React 19",
				"Prisma ORM",
				"PostgreSQL",
				"Better Auth",
				"TailwindCSS v4",
				"Resend",
				"@vercel/blob",
				"Bun",
				"Docker Compose",
			],
			links: [
				{
					type: "preview" as const,
					url: "#",
					label: "Vercel Preview (Coming Soon)",
				},
			],
			link: "#",
			image: projectImages.bloggishCover,
			description:
				"BlogStream CMS is a private Next.js 16 publishing platform pairing live blog feeds, rich text authoring, Better Auth security, and environment-aware media uploads—now gearing up for admin moderation and Vercel release.",
			hasLiveDemo: false,
			isComingSoon: true,
			isPrivate: true,
		},
		{
			id: "org-management-system",
			company: "SoftBd LTD",
			year: "2024",
			title: "Organization Management System",
			status: "completed" as const,
			category: "Enterprise Software",
			tags: ["Laravel", "Enterprise", "Management", "Authentication"],
			featured: false,
			priority: 5,
			shortDescription:
				"A comprehensive organization management system with role-based permissions and automated payment tracking.",
			fullDescription:
				"A comprehensive organization management system where Super users manage organizations and subscriptions, Admins handle assigned organizations, and Members join organizations with automated payment tracking and penalty management. Built with Laravel and modern web technologies for scalable enterprise use.",
			keyFeatures: [
				"Role-based permission system with 3 user levels",
				"Automated installment tracking with penalty calculation",
				"Google OAuth integration for seamless authentication",
				"Email notification system for payment reminders",
				"Comprehensive subscription management",
			],
			results: [
				{
					title:
						"Role-based permission system with 3 user levels (Super, Admin, Member)",
				},
				{
					title:
						"Automated installment tracking with penalty calculation for overdue payments",
				},
				{ title: "Google OAuth integration for seamless user authentication" },
				{ title: "Email notification system for payment reminders and alerts" },
				{
					title:
						"Comprehensive subscription management with installment tracking",
				},
			],
			coverImage: {
				src: projectImages.organizationCover,
				alt: "Organization Management System Dashboard",
				priority: true,
			},
			images: [
				{
					src: projectImages.organizationGallery1,
					alt: "Organization – Dashboard overview",
				},
				{
					src: projectImages.organizationGallery2,
					alt: "Organization – Subscription management",
				},
				{
					src: projectImages.organizationGallery3,
					alt: "Organization – Members list",
				},
				{
					src: projectImages.organizationGallery4,
					alt: "Organization – Payment tracking",
				},
				{
					src: projectImages.organizationGallery5,
					alt: "Organization – Penalty calculation",
				},
				{
					src: projectImages.organizationGallery6,
					alt: "Organization – Notifications",
				},
			],
			technologies: [
				"Laravel",
				"TailwindCSS",
				"MySQL",
				"Gmail API",
				"Google OAuth",
			],
			links: [],
			// Legacy support
			link: "#",
			image: projectImages.organizationCover,
			description:
				"A comprehensive organization management system where Super users manage organizations and subscriptions, Admins handle assigned organizations, and Members join organizations with automated payment tracking and penalty management.",
			hasLiveDemo: false,
			isPrivate: true,
		},
		{
			id: "jukto-news-platform",
			company: "SoftBd LTD",
			year: "2024",
			title: "Jukto News Platform",
			status: "completed" as const,
			category: "News & Media",
			tags: ["Laravel", "React", "News", "Content Management"],
			featured: false,
			priority: 4,
			shortDescription:
				"A dynamic news aggregation platform with real-time updates and content management.",
			fullDescription:
				"A dynamic news aggregation platform offering up-to-date articles from various categories with real-time updates, content management, and interactive user interface for enhanced engagement. Features advanced content scraping and automated news aggregation.",
			keyFeatures: [
				"Real-time news aggregation from multiple sources",
				"Advanced content management with automated scraping",
				"Interactive UI components with responsive design",
				"Streamlined user navigation with performance optimization",
				"REST API integration for seamless data flow",
			],
			results: [
				{
					title:
						"Real-time news aggregation from multiple sources and categories",
				},
				{ title: "Advanced content management with automated news scraping" },
				{
					title:
						"Interactive UI components with responsive design across all devices",
				},
				{
					title:
						"Streamlined user navigation with efficient performance optimization",
				},
				{ title: "REST API integration for seamless data flow and updates" },
			],
			coverImage: {
				src: projectImages.juktonewsCover,
				alt: "Jukto News Platform Interface",
			},
			images: [
				{
					src: projectImages.juktonewsGallery1,
					alt: "Jukto News – Homepage feed",
				},
				{
					src: projectImages.juktonewsGallery2,
					alt: "Jukto News – Article details",
				},
				{
					src: projectImages.juktonewsGallery3,
					alt: "Jukto News – Category listing",
				},
			],
			technologies: ["Laravel", "React", "MySQL", "TailwindCSS", "REST APIs"],
			links: [
				{
					type: "live" as const,
					url: "https://news.jukto.com",
					label: "View Live",
				},
			],
			// Legacy support
			link: "https://news.jukto.com",
			image: projectImages.juktonewsCover,
			description:
				"A dynamic news aggregation platform offering up-to-date articles from various categories with real-time updates, content management, and interactive user interface for enhanced engagement.",
			hasLiveDemo: true,
			isPrivate: false,
		},
	],
};

// Export individual items for easier access
export const {
	name,
	title,
	profile,
	email,
	location,
	availability,
	socialLinks,
	workExperience,
	skills,
	techStack,
	stats,
	achievements,
	education,
	portfolioProjects,
} = PERSONAL_INFO;
