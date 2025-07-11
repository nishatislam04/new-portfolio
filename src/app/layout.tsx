import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://new-portfolio-psi-bice.vercel.app"),
	title: {
		default: "Nishat Mazumder - Full Stack Web Developer",
		template: "%s | Nishat Mazumder",
	},
	description: "Full Stack Web Developer specializing in Next.js, Laravel, and React. I build enterprise-grade applications with modern technologies and clean, scalable code.",
	keywords: ["Full Stack Developer", "Next.js", "Laravel", "React", "TypeScript", "Web Development", "Frontend", "Backend", "PostgreSQL", "MySQL", "Prisma ORM", "Tailwind CSS", "JavaScript", "PHP", "Bangladesh Developer", "Dhaka Developer"],
	authors: [{ name: "Nishat Mazumder" }],
	creator: "Nishat Mazumder",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://new-portfolio-psi-bice.vercel.app",
		title: "Nishat Mazumder - Full Stack Web Developer",
		description: "Full Stack Web Developer specializing in Next.js, Laravel, and React. I build enterprise-grade applications with modern technologies and clean, scalable code.",
		siteName: "Nishat Mazumder Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Nishat Mazumder - Full Stack Web Developer",
		description: "Full Stack Web Developer specializing in Next.js, Laravel, and React. I build enterprise-grade applications with modern technologies and clean, scalable code.",
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={inter.variable}>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<meta name="theme-color" content="#0f172a" />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
