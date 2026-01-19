"use server";

import { put } from "@vercel/blob";
import { cacheLife, cacheTag, revalidateTag, updateTag } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import {
	WorkExperienceCreateServerSchema,
	type WorkExperienceFormInput,
	WorkExperienceFormSchema,
	WorkExperienceServerBaseSchema,
	WorkExperienceTechnologySchema,
} from "@/schema/work-experience-schema";
import type { ActionValidationResult } from "@/utils/validation";

/**
 * Normalized technology shape as stored in the database JSON column.
 */
export type WorkExperienceTechnology = {
	label: string;
	iconUrl?: string;
};

export type WorkExperienceAchivements = {
	value: string;
};

/**
 * DTO returned to the admin UI for a single Work Experience entry.
 */
export type WorkExperienceDTO = {
	id: string;
	company: string;
	position: string;
	location: string;
	type: string | null;
	durationLabel: string | null;
	startLabel: string | null;
	endLabel: string | null;
	description: string | null;
	isCurrent: boolean;
	sortOrder: number;
	achievements: WorkExperienceAchivements[];
	technologies: WorkExperienceTechnology[];
};

/**
 * Result type for successful create/update/delete operations.
 */
export type WorkExperienceMutationResult = {
	success: true;
	message: string;
};

/**
 * Upload a technology icon file to Vercel Blob and return its public URL.
 * Returns undefined when no file is provided.
 */
async function uploadTechnologyIcon(
	file: File | undefined,
): Promise<string | undefined> {
	if (!file || file.size === 0) return undefined;

	const blob = await put(
		`work-experience-tech/${Date.now()}-${file.name}`,
		file,
		{
			access: "public",
		},
	);
	return blob.url;
}

/**
 * Fetch the root profile. The current schema assumes a single profile.
 */
async function getRootProfileId(): Promise<string> {
	const profile = await prisma.profile.findFirst({ select: { id: true } });
	if (!profile) {
		throw new Error("Root profile not found. Create user info first.");
	}
	return profile.id;
}

/**
 * Normalize technologies JSON coming from the database into
 * `{ label, iconUrl? }[]`, supporting both legacy string[] and
 * the new object[] representation.
 */
function normalizeTechnologies(json: unknown): WorkExperienceTechnology[] {
	const LegacyOrObjectArraySchema = z.array(
		z.union([z.string().min(1), WorkExperienceTechnologySchema]),
	);

	const parsed = LegacyOrObjectArraySchema.safeParse(json ?? []);
	if (!parsed.success) return [];

	return parsed.data.map((item) =>
		typeof item === "string" ? { label: item } : item,
	);
}

/**
 * Fetch all work experiences for the root profile, ordered by sortOrder.
 */
export const getWorkExperiences = async (): Promise<
	ActionValidationResult<WorkExperienceDTO[]>
> => {
	"use cache";
	cacheTag("work-experience");
	cacheLife("weeks");

	try {
		const profileId = await getRootProfileId();

		const experiences = await prisma.workExperience.findMany({
			where: { profileId },
			orderBy: { sortOrder: "asc" },
		});

		const list: WorkExperienceDTO[] = experiences.map((exp) => ({
			id: exp.id,
			company: exp.company,
			position: exp.position,
			location: exp.location,
			type: exp.type,
			durationLabel: exp.durationLabel,
			startLabel: exp.startLabel,
			endLabel: exp.endLabel,
			description: exp.description,
			isCurrent: exp.isCurrent,
			sortOrder: exp.sortOrder,
			achievements: exp.achievements,
			technologies: normalizeTechnologies(exp.technologies),
		}));

		return { success: true, data: list };
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Failed to fetch work experiences";
		return {
			success: false,
			type: "server-error",
			data: [],
			message,
			error: { type: "unknown", code: "WORK_EXPERIENCE_FETCH_FAILED" },
		};
	}
};

/**
 * Create a new work experience entry.
 *
 * - Validates client payload with Zod
 * - Uploads technology icons to Vercel Blob
 * - Re-validates normalized payload with server-side schema
 * - Persists to Prisma
 */
export const createWorkExperience = async (
	formData: WorkExperienceFormInput,
): Promise<ActionValidationResult<WorkExperienceMutationResult>> => {
	try {
		// First-level validation against the client schema to guard shape.
		const clientParsed = WorkExperienceFormSchema.safeParse(formData);
		if (!clientParsed.success) {
			const message = clientParsed.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return {
				success: false,
				type: "validation",
				data: [],
				message,
				fieldErrors: {},
			};
		}

		const validated = clientParsed.data;

		// Upload icons and build normalized technologies array.
		const technologies: WorkExperienceTechnology[] = [];
		for (const tech of validated.technologies) {
			const uploadedUrl = await uploadTechnologyIcon(tech.icon);
			const iconUrl = uploadedUrl ?? tech.existingIconUrl;
			technologies.push({ label: tech.label, iconUrl: iconUrl ?? undefined });
		}

		// Prepare server-side payload (no File instances).
		const serverPayload = {
			company: validated.company,
			position: validated.position,
			location: validated.location,
			type: validated.type,
			durationLabel: validated.durationLabel,
			startLabel: validated.startLabel,
			endLabel: validated.endLabel,
			description: validated.description,
			isCurrent: validated.isCurrent,
			sortOrder: parseInt(validated.sortOrder, 10) || 0,
			achievements: validated.achievements,
			technologies,
		};

		// Server-side validation of the normalized data.
		const serverParsed =
			WorkExperienceCreateServerSchema.safeParse(serverPayload);
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

		const profileId = await getRootProfileId();

		await prisma.workExperience.create({
			data: {
				profileId,
				company: serverParsed.data.company,
				position: serverParsed.data.position,
				location: serverParsed.data.location,
				type: serverParsed.data.type,
				durationLabel: serverParsed.data.durationLabel,
				startLabel: serverParsed.data.startLabel,
				endLabel: serverParsed.data.endLabel,
				description: serverParsed.data.description,
				isCurrent: serverParsed.data.isCurrent,
				sortOrder: serverParsed.data.sortOrder,
				achievements: serverParsed.data.achievements,
				technologies: serverParsed.data.technologies,
			},
		});

		revalidateTag("work-experience", "max");

		return {
			success: true,
			data: {
				success: true,
				message: "Work experience created successfully",
			},
		};
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Failed to create work experience";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "WORK_EXPERIENCE_CREATE_FAILED" },
		};
	}
};

/**
 * Update an existing work experience entry.
 */
export const updateWorkExperience = async (
	id: string,
	formData: WorkExperienceFormInput,
): Promise<ActionValidationResult<WorkExperienceMutationResult>> => {
	try {
		const clientParsed = WorkExperienceFormSchema.safeParse(formData);
		if (!clientParsed.success) {
			const message = clientParsed.error.issues
				.map((issue) => issue.message)
				.join(", ");
			return {
				success: false,
				type: "validation",
				message,
				data: [],
				fieldErrors: {},
			};
		}

		const validated = clientParsed.data;

		// Upload icons and build normalized technologies array.
		const technologies: WorkExperienceTechnology[] = [];
		for (const tech of validated.technologies) {
			const uploadedUrl = await uploadTechnologyIcon(tech.icon);
			const iconUrl = uploadedUrl ?? tech.existingIconUrl;
			technologies.push({ label: tech.label, iconUrl: iconUrl ?? undefined });
		}

		const serverPayload = {
			company: validated.company,
			position: validated.position,
			location: validated.location,
			type: validated.type,
			durationLabel: validated.durationLabel,
			startLabel: validated.startLabel,
			endLabel: validated.endLabel,
			description: validated.description,
			isCurrent: validated.isCurrent,
			sortOrder: parseInt(validated.sortOrder, 10) || 0,
			achievements: validated.achievements,
			technologies,
		};

		const serverParsed =
			WorkExperienceServerBaseSchema.safeParse(serverPayload);
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

		await prisma.workExperience.update({
			where: { id },
			data: {
				company: serverParsed.data.company,
				position: serverParsed.data.position,
				location: serverParsed.data.location,
				type: serverParsed.data.type,
				durationLabel: serverParsed.data.durationLabel,
				startLabel: serverParsed.data.startLabel,
				endLabel: serverParsed.data.endLabel,
				description: serverParsed.data.description,
				isCurrent: serverParsed.data.isCurrent,
				sortOrder: serverParsed.data.sortOrder,
				achievements: serverParsed.data.achievements,
				technologies: serverParsed.data.technologies,
			},
		});

		updateTag("work-experience");

		return {
			success: true,
			data: {
				success: true,
				message: "Work experience updated successfully",
			},
		};
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Failed to update work experience";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "WORK_EXPERIENCE_UPDATE_FAILED" },
		};
	}
};

/**
 * Delete a work experience entry by id.
 *
 * Password-protected flows and email notifications can be layered on top
 * of this basic mutation using a separate schema and dialog, similar to
 * the user-info delete flow.
 */
export const deleteWorkExperience = async (
	id: string,
): Promise<ActionValidationResult<WorkExperienceMutationResult>> => {
	try {
		await prisma.workExperience.delete({ where: { id } });
		updateTag("work-experience");

		return {
			success: true,
			data: {
				success: true,
				message: "Work experience deleted successfully",
			},
		};
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Failed to delete work experience";
		return {
			success: false,
			type: "server-error",
			data: [],
			message,
			error: { type: "unknown", code: "WORK_EXPERIENCE_DELETE_FAILED" },
		};
	}
};
