"use server";

import prisma from "@/lib/prisma";
import { UserInfoFormSchema } from "@/schema/user-info-form-schema";
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
