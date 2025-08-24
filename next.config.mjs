import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// --- ✅ Turbopack Settings ---
	turbopack: {
		rules: {
			"*.svg": {
				loaders: [
					{
						loader: "@svgr/webpack",
						options: {
							icon: true,
							svgo: true,
							svgoConfig: {
								plugins: [
									{
										name: "preset-default",
										params: {
											overrides: {
												removeViewBox: false, // 👈 Needed for responsiveness
											},
										},
									},
								],
							},
						},
					},
				],
				as: "*.js", // Treat output as JS component
			},
		},
	},

	// --- ✅ Experimental Flags ---
	experimental: {
		// Forward browser logs to the terminal for easier debugging
		// browserDebugInfoInTerminal: true,
		// Enable new caching and pre-rendering behavior
		// dynamicIO: true,
		// Activate new client-side router improvements
		// clientSegmentCache: true,
		// Explore route composition and segment overrides via DevTools
		devtoolSegmentExplorer: true,
		// Enable persistent caching for the turbopack dev server and build.
		turbopackPersistentCaching: true,
	},

	// --- ✅ Optimizations ---
	compress: true,
	poweredByHeader: false,
	images: {
		formats: ["image/webp", "image/avif"],
		deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
};

export default withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})(nextConfig);
