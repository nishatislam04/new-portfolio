"use server";

import { cacheLife, cacheTag, revalidateTag, updateTag } from "next/cache";

import prisma from "@/lib/prisma";
import {
	type EducationFormInput,
	EducationFormSchema,
	EducationServerSchema,
} from "@/schema/education-schema";
import type { ActionValidationResult } from "@/utils/validation";

export type EducationDTO = {
	id: string;
	institution: string | null;
	degree: string | null;
	durationLabel: string | null;
	startDate: string | null;
	endDate: string | null;
	gpa: string | null;
	description: string | null;
	highlights: string[];
	sortOrder: number;
};

export type EducationMutationResult = {
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

function normalizeHighlights(json: unknown): string[] {
	if (!json) return [];
	return Array.isArray(json)
		? json.filter((item): item is string => typeof item === "string")
		: [];
}

export const getEducation = async (): Promise<
	ActionValidationResult<EducationDTO | null>
> => {
	"use cache";
	cacheTag("education");
	cacheLife("weeks");

	try {
		const profileId = await getRootProfileId();
		const education = await prisma.education.findFirst({
			where: { profileId },
			orderBy: { sortOrder: "asc" },
		});

		if (!education) {
			return { success: true, data: null };
		}

		return {
			success: true,
			data: {
				id: education.id,
				institution: education.institution,
				degree: education.degree,
				durationLabel: education.durationLabel,
				startDate: education.startDate,
				endDate: education.endDate,
				gpa: education.gpa,
				description: education.description,
				highlights: normalizeHighlights(education.highlights),
				sortOrder: education.sortOrder,
			},
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to fetch education";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "EDUCATION_FETCH_FAILED" },
		};
	}
};

function buildServerPayload(formData: EducationFormInput) {
	const parsed = EducationFormSchema.safeParse(formData);
	if (!parsed.success) {
		const message = parsed.error.issues
			.map((issue) => issue.message)
			.join(", ");
		return {
			success: false as const,
			type: "validation" as const,
			message,
			fieldErrors: {},
		} satisfies ActionValidationResult;
	}

	const normalized = {
		institution: parsed.data.institution,
		degree: parsed.data.degree,
		durationLabel: parsed.data.durationLabel,
		startDate: parsed.data.startDate,
		endDate: parsed.data.endDate,
		gpa: parsed.data.gpa,
		description: parsed.data.description?.trim() || null,
		sortOrder: Number.parseInt(parsed.data.sortOrder, 10) || 0,
		highlights: parsed.data.highlights,
	};

	const serverParsed = EducationServerSchema.safeParse(normalized);
	if (!serverParsed.success) {
		const message = serverParsed.error.issues
			.map((issue) => issue.message)
			.join(", ");
		return {
			success: false as const,
			type: "validation" as const,
			message,
			fieldErrors: {},
		} satisfies ActionValidationResult;
	}

	return { success: true as const, data: serverParsed.data };
}

export const createEducation = async (
	formData: EducationFormInput,
): Promise<ActionValidationResult<EducationMutationResult>> => {
	try {
		const payloadResult = buildServerPayload(formData);
		if (!payloadResult.success) return payloadResult;

		const profileId = await getRootProfileId();
		await prisma.education.create({
			data: {
				profileId,
				...payloadResult.data,
				highlights: payloadResult.data.highlights,
			},
		});

		revalidateTag("education", "max");

		return {
			success: true,
			data: {
				success: true,
				message: "Education entry created successfully",
			},
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to create education";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "EDUCATION_CREATE_FAILED" },
		};
	}
};

export const updateEducation = async (
	id: string,
	formData: EducationFormInput,
): Promise<ActionValidationResult<EducationMutationResult>> => {
	try {
		const payloadResult = buildServerPayload(formData);
		if (!payloadResult.success) return payloadResult;

		await prisma.education.update({
			where: { id },
			data: {
				...payloadResult.data,
				highlights: payloadResult.data.highlights,
			},
		});

		updateTag("education");

		return {
			success: true,
			data: {
				success: true,
				message: "Education entry updated successfully",
			},
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to update education";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "EDUCATION_UPDATE_FAILED" },
		};
	}
};
