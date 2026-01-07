import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Start seeding ...");

	// Create a test user
	const user = await prisma.user.create({
		data: {
			email: 'test@example.com',
			name: 'Test User',
		},
	});

	console.log("Created user:", user);
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