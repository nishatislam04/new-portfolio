import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://new-portfolio-psi-bice.vercel.app";

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/_next/", "/admin/"],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
