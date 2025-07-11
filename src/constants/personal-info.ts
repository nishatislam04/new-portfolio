// Personal Information Constants
// Update this file with your own information to customize the portfolio

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
	availability: "Available for freelance projects",

	// Social Links
	socialLinks: {
		linkedin: "https://www.linkedin.com/in/nishat-mazumder/",
		github: "https://github.com/nishatislam04",
		whatsapp: "https://wa.me/8801641102404",
		messenger: "https://m.me/nishat.mazumder.004",
	},

	// Work Experience
	workExperience: [
		{
			company: "SOFTBD LTD",
			position: "Junior Software Engineer",
			duration: "JULY 2024 - CURRENT",
			description: [
				"Developed a comprehensive organization management system with role-based permissions (Super, Admin, Member), subscription management, and automated payment tracking with penalty calculations.",
				"Contributed to Jukto News platform development, implementing real-time news aggregation, content management, and interactive UI components with responsive design.",
				"Applied modern technologies including Laravel, React, MySQL, and REST APIs while collaborating with team members on full-stack web development projects.",
			],
		},
	],

	// Technical Skills
	skills: ["JavaScript", "TypeScript", "React", "Next.js", "PHP", "Laravel", "Vue.js", "MySQL", "PostgreSQL", "Prisma ORM", "NextAuth.js", "Zustand", "Docker", "Tailwind CSS", "Shadcn UI", "TipTap", "Framer Motion", "Git", "Bun"],

	// Tech Stack for About Section (subset of main skills)
	techStack: ["Next.js", "Laravel", "React", "PostgreSQL", "Prisma ORM", "Docker"],

	// Achievements/Stats
	stats: {
		projectsCompleted: "10+",
		experience: "1+",
		technologies: "20+",
		clientSatisfaction: "100%",
	},
};

// Export individual items for easier access
export const { name, title, profile, email, location, availability, socialLinks, workExperience, skills, techStack, stats } = PERSONAL_INFO;
