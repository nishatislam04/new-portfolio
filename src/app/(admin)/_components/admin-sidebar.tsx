"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
} from "@/components/ui/sidebar";

import {
	homepageLink,
	passwordLink,
	primaryLink,
	secondaryLinks,
} from "./nav-items";

const linkButtonClasses =
	"h-12 justify-start gap-3 rounded-xl text-base font-medium tracking-tight";

export function AdminSidebar(): ReactElement {
	const pathname = usePathname();

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	return (
		<Sidebar
			className="border-r border-white/10 bg-gray-950/95 px-2 py-6 text-gray-200 shadow-[0_0_60px_rgba(13,148,136,0.15)] flex flex-col"
			collapsible="offcanvas"
		>
			{/* Fixed Header Section */}
			<div className="flex flex-col gap-6 pb-4">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									size="lg"
									className={`${linkButtonClasses} text-lg`}
									isActive={isActive(primaryLink.href)}
								>
									<Link
										href={primaryLink.href}
										className="flex w-full items-center gap-3"
										prefetch={false}
									>
										<primaryLink.icon className="size-5 text-emerald-300" />
										<span>{primaryLink.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									size="lg"
									className={`${linkButtonClasses} text-lg`}
									isActive={isActive(homepageLink.href)}
								>
									<Link
										href={homepageLink.href}
										className="flex w-full items-center gap-3"
										prefetch={false}
									>
										<homepageLink.icon className="size-5 text-blue-300" />
										<span>{homepageLink.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator className="border-white/10" />
			</div>

			{/* Scrollable Content Section */}
			<SidebarContent className="flex-1 overflow-auto">
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs uppercase tracking-[0.3em] text-gray-500">
						Content
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="space-y-1">
							{secondaryLinks.map((link) => (
								<SidebarMenuItem key={link.href}>
									<SidebarMenuButton
										asChild
										size="lg"
										className={linkButtonClasses}
										isActive={isActive(link.href)}
									>
										<Link
											href={link.href}
											className="flex w-full items-center gap-3"
											prefetch={false}
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

			{/* Fixed Footer Section */}
			<div className="flex flex-col gap-4 pt-4">
				<SidebarSeparator className="border-white/10" />
				<SidebarFooter className="px-2">
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton
										asChild
										size="lg"
										className={linkButtonClasses}
										isActive={isActive(passwordLink.href)}
									>
										<Link
											href={passwordLink.href}
											className="flex w-full items-center gap-3"
											prefetch={false}
										>
											<passwordLink.icon className="size-5 text-orange-300" />
											<span>{passwordLink.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarFooter>
			</div>

			<SidebarRail />
		</Sidebar>
	);
}
