"use server";

import { cacheLife, cacheTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import {
	UserInfoFormSchema,
	UserInfoUpdateSchema,
} from "@/schema/user-info-form-schema";
import { safeServerAction } from "@/utils/validation";

export const submitUserInfoForm = async (data: unknown) =>
	safeServerAction(UserInfoFormSchema, data, async (validatedData) => {
		const slug =
			`${validatedData.firstName}-${validatedData.lastName}-${validatedData.phone.slice(-4)}`.toLowerCase();

		await prisma.profile.create({
			data: {
				...validatedData,
				slug,
			},
		});

		return {
			success: true,
			message: "User info submitted successfully",
		};
	});

export const updateUserInfoForm = async (data: unknown) =>
	safeServerAction(UserInfoUpdateSchema, data, async (validatedData) => {
		const { id, ...updateData } = validatedData;

		// Generate new slug if name or phone is being updated
		let slug: string | undefined;
		if (updateData.firstName && updateData.lastName && updateData.phone) {
			slug =
				`${updateData.firstName}-${updateData.lastName}-${updateData.phone.slice(-4)}`.toLowerCase();
		}

		await prisma.profile.update({
			where: { id },
			data: {
				...updateData,
				...(slug && { slug }),
			},
		});

		updateTag("user-info");

		return {
			success: true,
			message: "User info updated successfully",
		};
	});

export const getUserInfo = async () => {
	"use cache";
	cacheTag("user-info");
	cacheLife("weeks");
	try {
		const profile = await prisma.profile.findFirst({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				title: true,
				bio: true,
				phone: true,
				locationLabel: true,
				locationLink: true,
				availability: true,
			},
		});

		return {
			success: true,
			data: profile,
		};
	} catch (error) {
		console.error("Failed to fetch user info:", error);
		return {
			success: false,
			message: "Failed to fetch user info",
		};
	}
};
