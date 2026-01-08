import type { LucideIcon } from "lucide-react";

import {
	Award,
	BarChart3,
	BriefcaseBusiness,
	FolderKanban,
	GraduationCap,
	KeyRound,
	Layers3,
	ScrollText,
	Settings,
	Share2,
	UserRound,
} from "lucide-react";

export type AdminNavLink = {
	title: string;
	href: string;
	icon: LucideIcon;
};

export type AdminSettingsItem = {
	title: string;
	href: string;
	icon: LucideIcon;
};

export type AdminSettingsLink = {
	title: string;
	icon: LucideIcon;
	items: AdminSettingsItem[];
};

export const primaryLink: AdminNavLink = {
	title: "Overview",
	href: "/admin",
	icon: Layers3,
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

export const settingsLink: AdminSettingsLink = {
	title: "Settings",
	icon: Settings,
	items: [
		{
			title: "Password",
			href: "/admin/settings/password",
			icon: KeyRound,
		},
	],
};
