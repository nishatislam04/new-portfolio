"use server";

import { cacheLife, cacheTag, revalidateTag, updateTag } from "next/cache";

import prisma from "@/lib/prisma";
import {
	type TapeWordServerItemInput,
	TapeWordServerItemSchema,
	type TapeWordServerPayloadInput,
	TapeWordServerPayloadSchema,
	type TapeWordsFormInput,
	TapeWordsFormSchema,
} from "@/schema/tape-word-schema";
import type { ActionValidationResult } from "@/utils/validation";

export type TapeWordDTO = TapeWordServerItemInput & {
	id: string;
	profileId: string | null;
};

export type TapeWordMutationResult = {
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

export const getTapeWords = async (): Promise<
	ActionValidationResult<TapeWordDTO[]>
> => {
	// "use cache";
	// cacheTag("tape-word");
	// cacheLife("weeks");

	try {
		const profileId = await getRootProfileId();

		const records = await prisma.tapeWord.findMany({
			where: { profileId },
			orderBy: { sortOrder: "asc" },
		});

		const items: TapeWordDTO[] = records.map((tapeWord) => ({
			id: tapeWord.id,
			profileId: tapeWord.profileId,
			value: tapeWord.value,
			sortOrder: tapeWord.sortOrder,
		}));

		return { success: true, data: items };
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to fetch tape words";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "TAPE_WORD_FETCH_FAILED" },
		};
	}
};

function buildServerPayload(
	formData: TapeWordsFormInput,
): ActionValidationResult<TapeWordServerPayloadInput> {
	const clientParsed = TapeWordsFormSchema.safeParse(formData);
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

	const normalizedItems: TapeWordServerItemInput[] =
		clientParsed.data.items.map((item) => {
			const parsedItem = TapeWordServerItemSchema.safeParse({
				...item,
				sortOrder: Number.parseInt(item.sortOrder, 10) || 0,
			});

			if (!parsedItem.success) {
				throw parsedItem.error;
			}

			return parsedItem.data;
		});

	const serverParsed = TapeWordServerPayloadSchema.safeParse({
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

export const upsertTapeWords = async (
	formData: TapeWordsFormInput,
): Promise<ActionValidationResult<TapeWordMutationResult>> => {
	try {
		const payloadResult = buildServerPayload(formData);
		if (!payloadResult.success) return payloadResult;

		const profileId = await getRootProfileId();

		await prisma.$transaction(async (tx) => {
			const existing = await tx.tapeWord.findMany({
				where: { profileId },
			});

			const existingById = new Map(existing.map((item) => [item.id, item]));

			const incomingIds = new Set<string>();

			for (const item of payloadResult.data.items) {
				if (item.id && existingById.has(item.id)) {
					incomingIds.add(item.id);
					await tx.tapeWord.update({
						where: { id: item.id },
						data: {
							value: item.value,
							sortOrder: item.sortOrder,
						},
					});
				} else {
					const created = await tx.tapeWord.create({
						data: {
							profileId,
							value: item.value,
							sortOrder: item.sortOrder,
						},
					});
					incomingIds.add(created.id);
				}
			}

			for (const existingItem of existing) {
				if (!incomingIds.has(existingItem.id)) {
					await tx.tapeWord.delete({ where: { id: existingItem.id } });
				}
			}
		});

		updateTag("tape-word");
		revalidateTag("tape-word", "max");

		return {
			success: true,
			data: {
				success: true,
				message: "Tape words updated successfully",
			},
		};
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to update tape words";
		return {
			success: false,
			type: "server-error",
			message,
			error: { type: "unknown", code: "TAPE_WORD_UPSERT_FAILED" },
		};
	}
};
