import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AdminSidebar } from "../_components/admin-sidebar";
import Header from "../_components/header";

export default function AdminRootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className="flex min-h-svh bg-gray-900 text-gray-100">
			<SidebarProvider>
				<AdminSidebar />
				<SidebarInset className="bg-gray-900/90">
					<Header />
					<main className="flex flex-1 flex-col gap-6 bg-gray-900/60 p-8">
						<div className="rounded-3xl border border-white/5 bg-gray-900/80 p-6 shadow-[0_0_60px_rgba(13,148,136,0.08)]">
							<Toaster position="top-center" closeButton />
							{children}
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
