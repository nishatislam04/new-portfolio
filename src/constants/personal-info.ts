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
			highlights: ["Strong foundation in programming languages and software development", "Database design and management principles", "Web development technologies and frameworks", "Software engineering best practices", "Problem-solving and analytical thinking"],
		},
	],

	portfolioProjects: [
		{
			id: "org-management-system",
			company: "SoftBd LTD",
			year: "2024",
			title: "Organization Management System",
			status: "completed" as const,
			category: "Enterprise Software",
			tags: ["Laravel", "Enterprise", "Management", "Authentication"],
			featured: true,
			priority: 1,
			shortDescription: "A comprehensive organization management system with role-based permissions and automated payment tracking.",
			fullDescription:
				"A comprehensive organization management system where Super users manage organizations and subscriptions, Admins handle assigned organizations, and Members join organizations with automated payment tracking and penalty management. Built with Laravel and modern web technologies for scalable enterprise use.",
			keyFeatures: ["Role-based permission system with 3 user levels", "Automated installment tracking with penalty calculation", "Google OAuth integration for seamless authentication", "Email notification system for payment reminders", "Comprehensive subscription management"],
			results: [
				{ title: "Role-based permission system with 3 user levels (Super, Admin, Member)" },
				{ title: "Automated installment tracking with penalty calculation for overdue payments" },
				{ title: "Google OAuth integration for seamless user authentication" },
				{ title: "Email notification system for payment reminders and alerts" },
				{ title: "Comprehensive subscription management with installment tracking" },
			],
			coverImage: {
				src: projectImages.organizationCover,
				alt: "Organization Management System Dashboard",
				priority: true,
			},
			technologies: ["Laravel", "TailwindCSS", "MySQL", "Gmail API", "Google OAuth"],
			links: [],
			// Legacy support
			link: "#",
			image: projectImages.organizationCover,
			description: "A comprehensive organization management system where Super users manage organizations and subscriptions, Admins handle assigned organizations, and Members join organizations with automated payment tracking and penalty management.",
			hasLiveDemo: false,
			isPrivate: true,
		},
		{
			id: "team-docs-platform",
			company: "Personal Project",
			year: "2025",
			title: "Team-Docs - Collaborative Documentation Platform",
			status: "completed" as const,
			category: "SaaS Platform",
			tags: ["Next.js", "Collaboration", "Documentation", "Enterprise"],
			featured: true,
			priority: 2,
			shortDescription: "A modern, enterprise-grade collaborative documentation platform with Notion-like editing experience.",
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
				{ title: "TipTap-powered Notion-like editor with slash commands and real-time collaboration" },
				{ title: "Multi-tenant architecture with workspace isolation and role-based permissions" },
				{ title: "PostgreSQL full-text search with ranking algorithms and workspace-scoped security" },
				{ title: "Comprehensive admin dashboard with workspace approval and user management" },
				{ title: "NextAuth.js JWT authentication with middleware-based route protection" },
				{ title: "Performance optimized with Server Actions and React 18 concurrent features" },
			],
			coverImage: {
				src: projectImages.teamDocsCover,
				alt: "Team-Docs Collaborative Platform Interface",
				priority: true,
			},
			technologies: ["Next.js 15", "PostgreSQL", "Prisma ORM", "NextAuth.js", "TipTap", "Tailwind CSS v4", "Shadcn UI", "Zustand", "Docker"],
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
			description: "A modern, enterprise-grade collaborative documentation platform featuring Notion-like editing experience, multi-tenant architecture, and advanced workspace management designed for efficient team knowledge sharing.",
			hasLiveDemo: true,
			isComingSoon: false,
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
			priority: 3,
			shortDescription: "A dynamic news aggregation platform with real-time updates and content management.",
			fullDescription: "A dynamic news aggregation platform offering up-to-date articles from various categories with real-time updates, content management, and interactive user interface for enhanced engagement. Features advanced content scraping and automated news aggregation.",
			keyFeatures: ["Real-time news aggregation from multiple sources", "Advanced content management with automated scraping", "Interactive UI components with responsive design", "Streamlined user navigation with performance optimization", "REST API integration for seamless data flow"],
			results: [
				{ title: "Real-time news aggregation from multiple sources and categories" },
				{ title: "Advanced content management with automated news scraping" },
				{ title: "Interactive UI components with responsive design across all devices" },
				{ title: "Streamlined user navigation with efficient performance optimization" },
				{ title: "REST API integration for seamless data flow and updates" },
			],
			coverImage: {
				src: projectImages.juktoCover,
				alt: "Jukto News Platform Interface",
			},
			technologies: ["Laravel", "React", "MySQL", "TailwindCSS", "REST APIs"],
			links: [],
			// Legacy support
			link: "#",
			image: projectImages.juktoCover,
			description: "A dynamic news aggregation platform offering up-to-date articles from various categories with real-time updates, content management, and interactive user interface for enhanced engagement.",
			hasLiveDemo: false,
			isPrivate: true,
		},
		// Dummy projects to showcase different content structures
		{
			id: "ecommerce-dashboard",
			company: "Demo Project",
			year: "2024",
			title: "E-Commerce Analytics Dashboard",
			status: "completed" as const,
			category: "Analytics & BI",
			tags: ["React", "D3.js", "Analytics", "Dashboard"],
			featured: false,
			priority: 4,
			shortDescription: "A comprehensive analytics dashboard for e-commerce businesses with real-time data visualization.",
			fullDescription: "A comprehensive analytics dashboard designed for e-commerce businesses to track sales, customer behavior, and inventory management. Features real-time data visualization, predictive analytics, and customizable reporting tools.",
			keyFeatures: [
				"Real-time sales and revenue tracking",
				"Customer behavior analytics with heatmaps",
				"Inventory management with low-stock alerts",
				"Predictive analytics for demand forecasting",
				"Customizable dashboard with drag-and-drop widgets",
				"Multi-store support with consolidated reporting",
			],
			results: [
				{ title: "Increased sales visibility by 300% with real-time dashboards", impact: "300% increase", metrics: "Real-time tracking" },
				{ title: "Reduced inventory costs by 25% through predictive analytics", impact: "25% cost reduction", metrics: "Predictive modeling" },
				{ title: "Improved customer retention by 40% with behavior insights", impact: "40% improvement", metrics: "Customer analytics" },
			],
			coverImage: {
				src: projectImages.organizationCover, // Using placeholder
				alt: "E-Commerce Analytics Dashboard",
				caption: "Main dashboard showing sales overview and key metrics",
			},
			images: [
				{
					src: projectImages.organizationCover,
					alt: "Sales Analytics View",
					caption: "Detailed sales analytics with trend visualization",
				},
				{
					src: projectImages.teamDocsCover,
					alt: "Customer Behavior Heatmap",
					caption: "Customer interaction heatmap and behavior patterns",
				},
				{
					src: projectImages.juktoCover,
					alt: "Inventory Management Interface",
					caption: "Real-time inventory tracking and alerts system",
				},
			],
			technologies: [
				{ name: "React", category: "frontend" as const },
				{ name: "TypeScript", category: "frontend" as const },
				{ name: "D3.js", category: "frontend" as const },
				{ name: "Node.js", category: "backend" as const },
				{ name: "PostgreSQL", category: "database" as const },
				{ name: "Redis", category: "database" as const },
			],
			architecture: ["Microservices", "Event-driven architecture", "CQRS pattern"],
			challenges: ["Handling real-time data streams from multiple sources", "Optimizing complex analytical queries for large datasets", "Creating responsive visualizations for mobile devices"],
			solutions: ["Implemented WebSocket connections with Redis pub/sub", "Used database indexing and query optimization techniques", "Created adaptive chart components with responsive breakpoints"],
			links: [
				{
					type: "live" as const,
					url: "https://demo-ecommerce-dashboard.vercel.app",
					label: "View Live Demo",
				},
				{
					type: "github" as const,
					url: "https://github.com/demo/ecommerce-dashboard",
					label: "View Source Code",
				},
			],
		},
		{
			id: "mobile-fitness-app",
			company: "Freelance Project",
			year: "2024",
			title: "FitTrack - Personal Fitness Mobile App",
			status: "in-progress" as const,
			category: "Mobile Application",
			tags: ["React Native", "Health", "Mobile", "Fitness"],
			featured: false,
			priority: 5,
			shortDescription: "A comprehensive fitness tracking mobile app with AI-powered workout recommendations.",
			fullDescription: "A comprehensive fitness tracking mobile application that helps users monitor their workouts, nutrition, and progress. Features AI-powered workout recommendations, social challenges, and integration with popular fitness devices.",
			keyFeatures: [
				"AI-powered personalized workout recommendations",
				"Comprehensive nutrition tracking with barcode scanning",
				"Social challenges and community features",
				"Wearable device integration (Apple Watch, Fitbit)",
				"Progress tracking with detailed analytics",
				"Offline workout mode with sync capabilities",
			],
			results: [
				{ title: "Beta testing with 500+ users showing 85% engagement rate", impact: "85% engagement", metrics: "Beta metrics" },
				{ title: "Average 30% improvement in user fitness goals", impact: "30% improvement", metrics: "Goal achievement" },
			],
			coverImage: {
				src: projectImages.teamDocsCover, // Using placeholder
				alt: "FitTrack Mobile App Interface",
				caption: "Main workout tracking interface with AI recommendations",
			},
			images: [
				{
					src: projectImages.teamDocsCover,
					alt: "Workout Planning Screen",
					caption: "AI-powered workout planning with custom routines",
				},
				{
					src: projectImages.juktoCover,
					alt: "Nutrition Tracking Interface",
					caption: "Comprehensive nutrition tracking with barcode scanning",
				},
				{
					src: projectImages.organizationCover,
					alt: "Progress Analytics Dashboard",
					caption: "Detailed progress tracking and performance analytics",
				},
				{
					src: projectImages.teamDocsCover,
					alt: "Social Challenges Feature",
					caption: "Community challenges and social fitness features",
				},
			],
			videoUrl: "https://www.youtube.com/embed/demo-video",
			technologies: [
				{ name: "React Native", category: "frontend" as const },
				{ name: "TypeScript", category: "frontend" as const },
				{ name: "Expo", category: "tool" as const },
				{ name: "Node.js", category: "backend" as const },
				{ name: "MongoDB", category: "database" as const },
				{ name: "AWS", category: "cloud" as const },
			],
			architecture: ["Native mobile architecture", "RESTful API", "Cloud storage"],
			challenges: ["Optimizing battery usage for continuous tracking", "Handling offline data synchronization", "Integrating with multiple fitness device APIs"],
			solutions: ["Implemented efficient background processing with minimal battery impact", "Created robust offline-first architecture with conflict resolution", "Built unified SDK wrapper for multiple device integrations"],
			links: [
				{
					type: "demo" as const,
					url: "https://expo.dev/@demo/fittrack-app",
					label: "Try Expo Demo",
				},
				{
					type: "case-study" as const,
					url: "https://medium.com/@demo/fittrack-case-study",
					label: "Read Case Study",
				},
			],
		},
	],
};

// Export individual items for easier access
export const { name, title, profile, email, location, availability, socialLinks, workExperience, skills, techStack, stats, achievements, education, portfolioProjects } = PERSONAL_INFO;
