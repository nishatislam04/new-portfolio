"use client";

export default function ClientCurrentYear() {
	const currentYear = new Date().getFullYear();
	return <div className="text-white/40">&copy; {currentYear}. All rights reserved.</div>;
}
