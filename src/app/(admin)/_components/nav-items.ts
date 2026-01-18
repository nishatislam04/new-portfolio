import type { LucideIcon } from "lucide-react";

import {
	Award,
	BarChart3,
	BriefcaseBusiness,
	FolderKanban,
	GraduationCap,
	ScrollText,
	Share2,
	UserRound,
} from "lucide-react";

export type AdminNavLink = {
	title: string;
	href: string;
	icon: LucideIcon;
};

export const secondaryLinks: AdminNavLink[] = [
	{
		title: "User Info",
		href: "/admin/user-info",
		icon: UserRound,
	},
	{
		title: "Social Links",
		href: "/admin/social-links",
		icon: Share2,
	},
	{
		title: "Work Experience",
		href: "/admin/work-experience",
		icon: BriefcaseBusiness,
	},
	{
		title: "Education",
		href: "/admin/education",
		icon: GraduationCap,
	},
	{
		title: "Profile Stats",
		href: "/admin/profile-stats",
		icon: BarChart3,
	},
	{
		title: "Achievement",
		href: "/admin/achievement",
		icon: Award,
	},
	{
		title: "Tape",
		href: "/admin/tape",
		icon: ScrollText,
	},
	{
		title: "Projects",
		href: "/admin/projects",
		icon: FolderKanban,
	},
];
