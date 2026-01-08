"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { primaryLink, secondaryLinks, settingsLink } from "./nav-items";

const linkButtonClasses =
	"h-12 justify-start gap-3 rounded-xl text-base font-medium tracking-tight";

export function AdminSidebar(): ReactElement {
	const pathname = usePathname();

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	return (
		<Sidebar
			className="border-r border-white/10 bg-gray-950/95 px-2 py-6 text-gray-200 shadow-[0_0_60px_rgba(13,148,136,0.15)]"
			collapsible="offcanvas"
		>
			<SidebarContent className="flex flex-col gap-6">
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
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator className="border-white/10" />

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

				<SidebarSeparator className="border-white/10" />
			</SidebarContent>

			<SidebarFooter className="px-2">
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs uppercase tracking-[0.3em] text-gray-500">
						Preferences
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuButton
											size="lg"
											className={`${linkButtonClasses} justify-between`}
										>
											<span className="flex items-center gap-3">
												<settingsLink.icon className="size-5" />
												<span>{settingsLink.title}</span>
											</span>
											<ChevronDown className="size-4 text-gray-500" />
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="start"
										side="right"
										className="min-w-60 rounded-2xl border border-white/10 bg-gray-950/95 p-2 shadow-2xl"
									>
										{settingsLink.items.map((item) => (
											<DropdownMenuItem
												asChild
												key={item.href}
												className="rounded-xl px-3 py-2 text-sm text-gray-200 focus:bg-emerald-500/15 focus:text-emerald-200"
											>
												<Link
													href={item.href}
													className="flex items-center gap-3"
													prefetch={false}
												>
													<item.icon className="size-4 text-emerald-300" />
													<span>{item.title}</span>
												</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
