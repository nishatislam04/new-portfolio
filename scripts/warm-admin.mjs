const baseUrl = process.env.WARM_BASE_URL ?? "http://192.168.0.105:3000";

// Add or adjust routes here as you create new admin pages
const routes = [
	"/admin/tape",
	"/admin/user-info",
	"/admin/social-links",
	"/admin/work-experience",
	"/admin/work-experience/create",
	"/admin/education",
	"/admin/profile-stats",
	"/admin/achievement",
];

async function warmRoutes() {
	console.log(`Warming ${routes.length} admin routes on ${baseUrl}...`);

	for (const route of routes) {
		const url = new URL(route, baseUrl).toString();
		try {
			const res = await fetch(url);
			console.log(`${res.status} ${res.statusText} - ${url}`);
		} catch (error) {
			console.error(
				`Error warming ${url}:`,
				error instanceof Error ? error.message : error,
			);
		}
	}

	console.log("Warm-up complete.");
}

warmRoutes()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error("Warm-up script failed:", error);
		process.exit(1);
	});
