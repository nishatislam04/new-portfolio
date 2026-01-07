import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";
import { type Prisma, PrismaClient } from "../src/generated/client";

// Prisma setup (uses same adapter/config as app)
const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	console.log("Start seeding ...");

	// Create a test user with hashed password (or update if exists)
	const hashedPassword = await hashPassword("password123");
	
	const user = await prisma.user.upsert({
		where: { email: 'test@example.com' },
		update: { name: 'Test User Updated' },
		create: {
			email: 'test@example.com',
			name: 'Test User',
			// password: hashedPassword,
		},
	});

	console.log("Created/updated user:", user);
	console.log("Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});