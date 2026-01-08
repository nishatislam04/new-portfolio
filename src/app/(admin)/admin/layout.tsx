import type { ReactNode } from "react";

import { fontClassName } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import { AdminSidebar } from "../_components/admin-sidebar";

export default function AdminRootLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div
			className={`${fontClassName} flex min-h-svh bg-gray-900 text-gray-100`}
		>
			<SidebarProvider>
				<AdminSidebar />
				<SidebarInset className="bg-gray-900/90">
					<header className="flex h-20 items-center gap-4 border-b border-white/10 bg-gray-900/80 px-6 backdrop-blur">
						<div className="w-full flex items-center justify-between gap-3">
							<SidebarTrigger className=" bg-gray-900/80 text-gray-200 hover:bg-white/10" />
							<div className="space-y-1 ml-4">
								<p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
									Control Center
								</p>
								<h1 className="text-2xl font-semibold text-white">
									Portfolio Administration
								</h1>
							</div>
							<p className="ml-auto text-sm text-gray-400">
								minhajul islam nishat
							</p>
						</div>
					</header>
					<main className="flex flex-1 flex-col gap-6 bg-gray-900/60 p-8">
						<div className="rounded-3xl border border-white/5 bg-gray-900/80 p-6 shadow-[0_0_60px_rgba(13,148,136,0.08)]">
							{children}
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
