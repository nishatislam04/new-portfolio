import type { ReactNode } from "react";
import "./globals.css";
import { fontClassName } from "./fonts";

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" className={fontClassName}>
			<body>{children}</body>
		</html>
	);
}
