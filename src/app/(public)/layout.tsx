import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	metadataBase: new URL("https://new-portfolio-psi-bice.vercel.app"),
	title: {
		default: "Nishat Mazumder - Full Stack Web Developer",
		template: "%s | Nishat Mazumder",
	},
	description:
		"Full Stack Web Developer specializing in Next.js, Laravel, and React. I build enterprise-grade applications with modern technologies and clean, scalable code.",
	keywords: [
		"Full Stack Developer",
		"Next.js",
		"Laravel",
		"React",
		"TypeScript",
		"Web Development",
		"Frontend",
		"Backend",
		"PostgreSQL",
		"MySQL",
		"Prisma ORM",
		"Tailwind CSS",
		"JavaScript",
		"PHP",
		"Bangladesh Developer",
		"Dhaka Developer",
	],
	authors: [{ name: "Nishat Mazumder" }],
	creator: "Nishat Mazumder",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://new-portfolio-psi-bice.vercel.app",
		title: "Nishat Mazumder - Full Stack Web Developer",
		description:
			"Full Stack Web Developer specializing in Next.js, Laravel, and React. I build enterprise-grade applications with modern technologies and clean, scalable code.",
		siteName: "Nishat Mazumder Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Nishat Mazumder - Full Stack Web Developer",
		description:
			"Full Stack Web Developer specializing in Next.js, Laravel, and React. I build enterprise-grade applications with modern technologies and clean, scalable code.",
	},
	icons: {
		icon: [
			{ url: "/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon.ico", rel: "icon", sizes: "32x32" },
		],
		apple: [{ url: "/apple-touch-icon.png" }],
		other: [{ rel: "manifest", url: "/site.webmanifest" }],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	viewportFit: "cover",
	themeColor: "#0f172a",
};

export default function PublicRootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className="bg-gray-900 text-white min-h-svh relative">{children}</div>
	);
}
