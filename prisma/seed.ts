import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/client";
import { NAV_ITEMS, TAPE_WORDS } from "../src/constants";
import { seedProfile } from "./seed-data";

// Prisma setup (uses same adapter/config as the app)
const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	console.log("\n🌱 Seeding portfolio data ...\n");

	// Ensure we have a connection string
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not set. Please configure your database connection.");
	}

	// Start with a clean slate for this profile slug to keep the seed idempotent.
	const existingProfile = await prisma.profile.findUnique({
		where: { slug: seedProfile.slug },
		select: { id: true },
	});

	if (existingProfile) {
		console.log(`Found existing profile for slug "${seedProfile.slug}" – deleting for a clean reseed...`);
		await prisma.profile.delete({ where: { id: existingProfile.id } });
	}

	// 1. Create Profile root
	const profile = await prisma.profile.create({
		data: {
			slug: seedProfile.slug,
			name: seedProfile.name,
			title: seedProfile.title,
			bio: seedProfile.bio,
			email: seedProfile.email,
			phone: seedProfile.phone,
			location: seedProfile.location,
			locationLink: seedProfile.locationLink,
			availability: seedProfile.availability,
			// JSON columns
			skills: seedProfile.skills,
			techStack: seedProfile.techStack,
		},
	});

	console.log("Created profile:", profile.slug);

	const profileId = profile.id;

	// 2. Social links (PERSONAL_INFO.SOCIAL_LINKS + GitHub/contact)
	if (seedProfile.socialLinks?.length) {
		await prisma.socialLink.createMany({
			data: seedProfile.socialLinks.map((link, index) => ({
				profileId,
				label: link.label,
				url: link.url,
				icon: link.icon,
				kind: link.kind,
				isPrimary: index === 0,
				isPublic: true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${seedProfile.socialLinks.length} social links.`);
	}

	// 3. Work experience timeline
	if (seedProfile.workExperience?.length) {
		await prisma.workExperience.createMany({
			data: seedProfile.workExperience.map((exp, index) => ({
				profileId,
				company: exp.company,
				position: exp.position,
				location: exp.location,
				type: exp.type,
				durationLabel: exp.durationLabel,
				startLabel: exp.startLabel,
				endLabel: exp.endLabel,
				description: exp.description,
				achievements: exp.achievements,
				technologies: exp.technologies,
				isCurrent: !!exp.endLabel && exp.endLabel.toLowerCase() === "current",
				isPublic: true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${seedProfile.workExperience.length} work experience entries.`);
	}

	// 4. Education entries
	if (seedProfile.education?.length) {
		await prisma.education.createMany({
			data: seedProfile.education.map((edu, index) => ({
				profileId,
				degree: edu.degree,
				institution: edu.institution,
				durationLabel: edu.durationLabel,
				gpa: edu.gpa,
				maxGpa: edu.maxGpa,
				description: edu.description,
				highlights: edu.highlights,
				isPublic: true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${seedProfile.education.length} education entries.`);
	}

	// 5. Profile stats (CTA counters)
	if (seedProfile.stats) {
		await prisma.profileStats.upsert({
			where: { profileId },
			update: {
				experienceLabel: seedProfile.stats.experience,
				projectsCompletedLabel: seedProfile.stats.projectsCompleted,
				technologiesLabel: seedProfile.stats.technologies,
				clientSatisfactionLabel: seedProfile.stats.clientSatisfaction,
			},
			create: {
				profileId,
				experienceLabel: seedProfile.stats.experience,
				projectsCompletedLabel: seedProfile.stats.projectsCompleted,
				technologiesLabel: seedProfile.stats.technologies,
				clientSatisfactionLabel: seedProfile.stats.clientSatisfaction,
			},
		});
		console.log("Created profile stats.");
	}

	// 6. Achievements (About section highlight cards)
	if (seedProfile.achievements?.length) {
		await prisma.achievement.createMany({
			data: seedProfile.achievements.map((achievement, index) => ({
				profileId,
				info: achievement.info,
				number: achievement.number,
				text: achievement.text,
				isPublic: true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${seedProfile.achievements.length} achievements.`);
	}

	// 7. Toolbox categories (horizontal toolbox rows)
	if (seedProfile.toolbox?.length) {
		await prisma.toolboxCategory.createMany({
			data: seedProfile.toolbox.map((category, index) => ({
				profileId,
				slug: category.slug,
				title: category.title,
				color: category.color,
				items: category.items,
				isPublic: true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${seedProfile.toolbox.length} toolbox categories.`);
	}

	// 8. Portfolio projects
	if (seedProfile.projects?.length) {
		await prisma.portfolioProject.createMany({
			data: seedProfile.projects.map((project, index) => ({
				profileId,
				slug: project.slug,
				title: project.title,
				company: project.company,
				year: project.year,
				status: project.status,
				category: project.category,
				shortDescription: project.shortDescription,
				fullDescription: project.fullDescription,
				keyFeatures: project.keyFeatures,
				results: project.results,
				coverImage: project.coverImage,
				images: project.images,
				technologies: project.technologies,
				architecture: project.architecture,
				challenges: project.challenges,
				solutions: project.solutions,
				links: project.links,
				tags: project.tags,
				featured: project.featured ?? false,
				priority: project.priority ?? index + 1,
				hasLiveDemo: project.hasLiveDemo,
				isPrivate: project.isPrivate,
				isComingSoon: project.isComingSoon,
				isPublic: project.isPrivate === true ? false : true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${seedProfile.projects.length} portfolio projects.`);
	}

	// 9. Navigation items and tape words from constants
	if (NAV_ITEMS?.length) {
		await prisma.navigationItem.createMany({
			data: NAV_ITEMS.map((item, index) => ({
				profileId,
				label: item.name,
				href: item.href,
				isPublic: true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${NAV_ITEMS.length} navigation items.`);
	}

	if (TAPE_WORDS?.length) {
		await prisma.tapeWord.createMany({
			data: TAPE_WORDS.map((value, index) => ({
				profileId,
				value,
				isPublic: true,
				sortOrder: index,
			})),
		});
		console.log(`Created ${TAPE_WORDS.length} tape words.`);
	}

	console.log("\n✅ Seeding finished.\n");
}

main()
	.catch((error) => {
		console.error("❌ Seeding failed:", error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});