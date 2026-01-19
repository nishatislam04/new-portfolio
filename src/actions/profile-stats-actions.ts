"use server";

import { cacheLife, cacheTag, revalidateTag, updateTag } from "next/cache";

import prisma from "@/lib/prisma";
import {
	type ProfileStatsFormInput,
	ProfileStatsFormSchema,
} from "@/schema/profile-stats-schema";
import type { ActionValidationResult } from "@/utils/validation";

async function getRootProfileId(): Promise<string> {
	const profile = await prisma.profile.findFirst({ select: { id: true } });
	if (!profile) {
		throw new Error("Root profile not found. Create user info first.");
	}
	return profile.id;
}

export type ProfileStatsDTO = {
	id: string;
	profileId: string;
	experienceLabel: string | null;
	projectsCompletedLabel: string | null;
	technologiesLabel: string | null;
	clientSatisfactionLabel: string | null;
};

export type ProfileStatsMutationResult = {
	success: true;
	message: string;
};

export const getProfileStats = async (): Promise<
	ActionValidationResult<ProfileStatsDTO>
> => {
	"use cache";
	cacheTag("profile-stats");
	cacheLife("weeks");

	try {
		const profileId = await getRootProfileId();
		const stats = await prisma.profileStats.findFirst({
			where: { profileId },
		});

		if (!stats)
			return {
				success: true,
				data: [],
			};

		return {
			success: true,
			data: {
				id: stats.id,
				profileId: stats.profileId,
				experienceLabel: stats.experienceLabel,
				projectsCompletedLabel: stats.projectsCompletedLabel,
				technologiesLabel: stats.technologiesLabel,
				clientSatisfactionLabel: stats.clientSatisfactionLabel,
			},
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to fetch profile stats";
		return {
			success: false,
			type: "server-error",
			data: [],
			message,
			error: { type: "unknown", code: "PROFILE_STATS_FETCH_FAILED" },
		};
	}
};

function buildServerPayload(
	formData: ProfileStatsFormInput,
): ActionValidationResult<ProfileStatsFormInput> {
	const parsed = ProfileStatsFormSchema.safeParse(formData);
	if (!parsed.success) {
		const message = parsed.error.issues
			.map((issue) => issue.message)
			.join(", ");
		return {
			success: false,
			type: "validation",
			message,
			fieldErrors: {},
		};
	}

	return { success: true, data: parsed.data };
}

export const createProfileStats = async (
	formData: ProfileStatsFormInput,
): Promise<ActionValidationResult<ProfileStatsMutationResult>> => {
	try {
		const payloadResult = buildServerPayload(formData);
		if (!payloadResult.success) return payloadResult;

		const profileId = await getRootProfileId();

		await prisma.profileStats.upsert({
			where: {
				profileId,
			},
			update: {
				experienceLabel: payloadResult.data.experienceLabel,
				projectsCompletedLabel: payloadResult.data.projectsCompletedLabel,
				technologiesLabel: payloadResult.data.technologiesLabel,
				clientSatisfactionLabel: payloadResult.data.clientSatisfactionLabel,
			},
			create: {
				profileId,
				experienceLabel: payloadResult.data.experienceLabel,
				projectsCompletedLabel: payloadResult.data.projectsCompletedLabel,
				technologiesLabel: payloadResult.data.technologiesLabel,
				clientSatisfactionLabel: payloadResult.data.clientSatisfactionLabel,
			},
		});

		revalidateTag("profile-stats", "max");

		return {
			success: true,
			data: {
				success: true,
				message: "Profile stats modify successfully",
			},
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to create profile stats";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "PROFILE_STATS_CREATE_FAILED" },
		};
	}
};
