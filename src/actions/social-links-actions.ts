"use server";

import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import {
	type SocialLinkItemInput,
	SocialLinkItemSchema,
} from "@/schema/social-links-schema";

type CreateSocialLinksResult = {
	success: true;
	message: string;
};

// Helper to extract one section from FormData and optionally upload its icon file
async function parseSection(form: FormData, key: string) {
	const label = (form.get(`${key}[label]`) as string) ?? "";
	const url = (form.get(`${key}[url]`) as string) ?? "";
	const sortOrderRaw = form.get(`${key}[sortOrder]`);
	const sortOrder =
		typeof sortOrderRaw === "string" ? Number.parseInt(sortOrderRaw) : 0;
	const file = form.get(`${key}[icon]`);

	let iconUrl: string | undefined;
	if (file && typeof file !== "string") {
		const f = file as File;
		if (f.size > 0) {
			const blob = await put(`social-icons/${Date.now()}-${f.name}`, f, {
				access: "public",
			});
			iconUrl = blob.url;
		}
	}

	const candidate: SocialLinkItemInput = {
		label,
		url,
		sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
		...(iconUrl ? { icon: iconUrl } : {}),
	} as SocialLinkItemInput;

	const parsed = SocialLinkItemSchema.safeParse(candidate);
	if (!parsed.success) {
		const msg = parsed.error.issues.map((issue) => issue.message).join(", ");
		throw new Error(msg);
	}
	return parsed.data;
}

export async function createSocialLinks(formData: FormData) {
	try {
		// Find existing root profile (single)
		const profile = await prisma.profile.findFirst();

		const sections = ["gmail", "linkedin", "whatsapp", "messenger"] as const;
		const items: SocialLinkItemInput[] = [];
		for (const key of sections) {
			const item = await parseSection(formData, key);
			items.push(item);
		}

		// Persist all
		await prisma.socialLink.createMany({
			data: items.map((i) => ({
				label: i.label,
				url: i.url,
				icon: i.icon,
				sortOrder: i.sortOrder,
				profileId: profile?.id ?? null,
			})),
			skipDuplicates: true,
		});

		const result: CreateSocialLinksResult = {
			success: true,
			message: "Social links created successfully",
		};
		return { success: true, data: result } as const;
	} catch (err: unknown) {
		const message =
			err instanceof Error ? err.message : "Failed to create social links";
		return {
			success: false as const,
			type: "server-error" as const,
			message,
			error: { type: "unknown", code: "SOCIAL_LINKS_CREATE_FAILED" },
		};
	}
}
