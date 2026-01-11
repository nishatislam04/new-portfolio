"use server";

import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";
import {
	type SocialLinkItemInput,
	SocialLinkItemSchema,
	type SocialLinksFormInput,
} from "@/schema/social-links-schema";

/**
 * Result type for successful social links creation
 */
type CreateSocialLinksResult = {
	success: true;
	message: string;
};

/**
 * Creates social links with file upload support
 *
 * This server action handles:
 * - File upload to Vercel Blob storage
 * - Data validation using Zod schema
 * - Database storage with Prisma ORM
 * - Error handling with consistent response format
 *
 * @param formData - Form data containing labels, URLs, files, and sort orders
 * @returns Promise with success/error response
 */
export async function createSocialLinks(formData: SocialLinksFormInput) {
	try {
		// Find existing root profile (single record)
		const profile = await prisma.profile.findFirst();

		/**
		 * Helper function to upload icon file to Vercel Blob storage
		 *
		 * Process:
		 * 1. Validates file exists and has content
		 * 2. Uploads with timestamped filename to prevent conflicts
		 * 3. Returns public URL for database storage
		 * 4. Returns undefined if no file provided
		 *
		 * @param file - File object from form input or undefined
		 * @returns Promise resolving to public URL or undefined
		 */
		async function uploadIcon(
			file: File | undefined,
		): Promise<string | undefined> {
			if (!file || file.size === 0) return undefined;

			const blob = await put(`social-icons/${Date.now()}-${file.name}`, file, {
				access: "public",
			});
			return blob.url;
		}

		/**
		 * Transform form data into array of social link items
		 * Each platform (gmail, linkedin, whatsapp, messenger) gets its own item
		 * File uploads are processed asynchronously and URLs are stored
		 */
		const items: SocialLinkItemInput[] = [
			{
				label: formData.gmailLabel,
				url: formData.gmailUrl,
				icon: await uploadIcon(formData.gmailIcon),
				sortOrder: parseInt(formData.gmailSortOrder) || 0,
			},
			{
				label: formData.linkedinLabel,
				url: formData.linkedinUrl,
				icon: await uploadIcon(formData.linkedinIcon),
				sortOrder: parseInt(formData.linkedinSortOrder) || 1,
			},
			{
				label: formData.whatsappLabel,
				url: formData.whatsappUrl,
				icon: await uploadIcon(formData.whatsappIcon),
				sortOrder: parseInt(formData.whatsappSortOrder) || 2,
			},
			{
				label: formData.messengerLabel,
				url: formData.messengerUrl,
				icon: await uploadIcon(formData.messengerIcon),
				sortOrder: parseInt(formData.messengerSortOrder) || 3,
			},
		];

		/**
		 * Validate each social link item against schema
		 * Throws error with combined messages if validation fails
		 * Uses safeParse to prevent runtime errors
		 */
		const validatedItems = items.map((item) => {
			const parsed = SocialLinkItemSchema.safeParse(item);
			if (!parsed.success) {
				const msg = parsed.error.issues
					.map((issue) => issue.message)
					.join(", ");
				throw new Error(msg);
			}
			return parsed.data;
		});

		/**
		 * Persist all validated items to database
		 * Uses createMany for bulk insertion efficiency
		 * Maps validated items to Prisma create format
		 */
		await prisma.socialLink.createMany({
			data: validatedItems.map((i) => ({
				label: i.label,
				url: i.url,
				icon: i.icon, // URL from Vercel Blob storage
				sortOrder: i.sortOrder,
				profileId: profile?.id ?? null,
			})),
			skipDuplicates: true, // Prevents duplicate entries
		});

		/**
		 * Return success response
		 * Follows consistent response format for frontend handling
		 */
		const result: CreateSocialLinksResult = {
			success: true,
			message: "Social links created successfully",
		};
		return { success: true, data: result } as const;
	} catch (err: unknown) {
		/**
		 * Consistent error handling
		 * Provides fallback message for unknown errors
		 * Returns structured error response for frontend
		 */
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
