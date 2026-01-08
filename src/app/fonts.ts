import { Calistoga, Inter, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-sans",
});

export const calistoga = Calistoga({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-serif",
	weight: ["400"],
});

export const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
	weight: ["400", "500", "600"],
});

export const fontClassName = `${inter.variable} ${calistoga.variable} ${jetbrainsMono.variable} font-sans`;
