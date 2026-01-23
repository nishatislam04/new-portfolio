import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	poweredByHeader: false,
	images: {
		formats: ["image/webp", "image/avif"],
		deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		qualities: [20, 25, 50, 75],
	},
	cacheComponents: true,
	experimental: {
		browserDebugInfoInTerminal: {
			depthLimit: 5,
			edgeLimit: 100,
		},
	},
};

export default withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})(nextConfig);
