// "use client";

import { Home, KeyRound, Layers3 } from "lucide-react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { secondaryLinks } from "./nav-items";

const linkButtonClasses =
	"h-12 justify-start gap-3 rounded-xl text-base font-medium tracking-tight";

export function AdminSidebar(): ReactElement {
	// const pathname = usePathname();

	// const isActive = (href: string) =>
	// 	pathname === href || pathname.startsWith(`${href}/`);

	console.log("admin sidebar rendering");

	return (
		<Sidebar
			className="border-r border-white/10 bg-gray-950/95 px-2 py-6 text-gray-200 shadow-[0_0_60px_rgba(13,148,136,0.15)] flex flex-col"
			collapsible="offcanvas"
		>
			{/* HEADER */}
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							size="lg"
							className={`${linkButtonClasses} text-lg`}
							// isActive={pathname === "/admin"}
						>
							<Link href="/admin" className="flex w-full items-center gap-3">
								<Layers3 className="size-5 text-emerald-300" />
								Overview
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							size="lg"
							className={`${linkButtonClasses} text-lg`}
						>
							<Link href="/" className="flex w-full items-center gap-3">
								<Home className="size-5 text-blue-300" />
								Homepage
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			{/* Main Resource */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs uppercase tracking-[0.3em] text-gray-500">
						Resources
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="space-y-1">
							{secondaryLinks.map((link) => (
								<SidebarMenuItem key={link.href}>
									<SidebarMenuButton
										asChild
										size="lg"
										className={linkButtonClasses}
										// isActive={isActive(link.href)}
									>
										<Link
											href={link.href}
											className="flex w-full items-center gap-3"
										>
											<link.icon className="size-5" />
											<span>{link.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer  */}
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							size="lg"
							className={linkButtonClasses}
							// isActive={pathname === "/admin/settings/password"}
						>
							<Link
								href="/admin/settings/password"
								className="flex w-full items-center gap-3"
							>
								<KeyRound className="size-5 text-orange-300" />
								Password
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
