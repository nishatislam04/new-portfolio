"use server";

import prisma from "@/lib/prisma";

export async function submitUserInfoForm(data: {
	firstName: string;
	lastName: string;
	email: string;
	title: string;
	bio: string;
	phone: string;
	locationLabel: string;
	locationLink: string;
	availability: string;
}) {
	try {
		const slug = `${data.firstName}-${data.lastName}`.toLowerCase();
		await prisma.profile.create({
			data: {
				...data,
				slug,
			},
		});

		return {
			success: true,
			message: "User info submitted successfully",
		};
	} catch (error: unknown) {
		console.error("Error submitting user info form:", (error as Error).message);
		return {
			success: false,
			message: "Failed to submit user info form",
			rawMessage: error,
		};
	}
}
