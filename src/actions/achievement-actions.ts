"use server";

import { cacheLife, cacheTag, revalidateTag, updateTag } from "next/cache";

import prisma from "@/lib/prisma";
import {
	type AchievementServerItemInput,
	AchievementServerItemSchema,
	type AchievementServerPayloadInput,
	AchievementServerPayloadSchema,
	type AchievementsFormInput,
	AchievementsFormSchema,
} from "@/schema/achievement-schema";
import type { ActionValidationResult } from "@/utils/validation";

export type AchievementDTO = AchievementServerItemInput & {
	id: string;
	profileId: string;
};

export type AchievementMutationResult = {
	success: true;
	message: string;
};

async function getRootProfileId(): Promise<string> {
	const profile = await prisma.profile.findFirst({ select: { id: true } });
	if (!profile) {
		throw new Error("Root profile not found. Create user info first.");
	}
	return profile.id;
}

export const getAchievements = async (): Promise<
	ActionValidationResult<AchievementDTO[]>
> => {
	// "use cache";
	// cacheTag("achievement");
	// cacheLife("weeks");

	try {
		const profileId = await getRootProfileId();

		const records = await prisma.achievement.findMany({
			where: { profileId },
			orderBy: { sortOrder: "asc" },
		});

		const items: AchievementDTO[] = records.map((achievement) => ({
			id: achievement.id,
			profileId: achievement.profileId,
			info: achievement.info ?? "",
			number: achievement.number ?? "",
			text: achievement.text ?? "",
			sortOrder: achievement.sortOrder,
		}));

		return { success: true, data: items };
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to fetch achievements";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "ACHIEVEMENT_FETCH_FAILED" },
		};
	}
};

function buildServerPayload(
	formData: AchievementsFormInput,
): ActionValidationResult<AchievementServerPayloadInput> {
	const clientParsed = AchievementsFormSchema.safeParse(formData);
	if (!clientParsed.success) {
		const message = clientParsed.error.issues
			.map((issue) => issue.message)
			.join(", ");
		return {
			success: false,
			type: "validation",
			message,
			fieldErrors: {},
		};
	}

	const normalizedItems: AchievementServerItemInput[] =
		clientParsed.data.items.map((item) => {
			const parsedItem = AchievementServerItemSchema.safeParse({
				...item,
				sortOrder: Number.parseInt(item.sortOrder, 10) || 0,
			});

			if (!parsedItem.success) {
				throw parsedItem.error;
			}

			return parsedItem.data;
		});

	const serverParsed = AchievementServerPayloadSchema.safeParse({
		items: normalizedItems,
	});

	if (!serverParsed.success) {
		const message = serverParsed.error.issues
			.map((issue) => issue.message)
			.join(", ");
		return {
			success: false,
			type: "validation",
			message,
			fieldErrors: {},
		};
	}

	return { success: true, data: serverParsed.data };
}

export const upsertAchievements = async (
	formData: AchievementsFormInput,
): Promise<ActionValidationResult<AchievementMutationResult>> => {
	try {
		const payloadResult = buildServerPayload(formData);
		if (!payloadResult.success) return payloadResult;

		const profileId = await getRootProfileId();

		await prisma.$transaction(async (tx) => {
			const existing = await tx.achievement.findMany({
				where: { profileId },
			});

			const existingById = new Map(existing.map((item) => [item.id, item]));

			const incomingIds = new Set<string>();

			for (const item of payloadResult.data.items) {
				if (item.id && existingById.has(item.id)) {
					incomingIds.add(item.id);
					await tx.achievement.update({
						where: { id: item.id },
						data: {
							info: item.info,
							number: item.number,
							text: item.text,
							sortOrder: item.sortOrder,
						},
					});
				} else {
					const created = await tx.achievement.create({
						data: {
							profileId,
							info: item.info,
							number: item.number,
							text: item.text,
							sortOrder: item.sortOrder,
						},
					});
					incomingIds.add(created.id);
				}
			}

			for (const existingItem of existing) {
				if (!incomingIds.has(existingItem.id)) {
					await tx.achievement.delete({ where: { id: existingItem.id } });
				}
			}
		});

		updateTag("achievement");
		revalidateTag("achievement", "max");

		return {
			success: true,
			data: {
				success: true,
				message: "Achievements updated successfully",
			},
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to update achievements";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "ACHIEVEMENT_UPSERT_FAILED" },
		};
	}
};
