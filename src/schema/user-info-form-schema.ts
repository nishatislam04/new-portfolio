import z from "zod";

export const UserInfoFormSchema = z.object({
	firstName: z.string().min(1, "First name is required").trim(),
	lastName: z.string().min(1, "Last name is required").trim(),
	email: z.email("Invalid email").trim(),
	title: z.string().min(1, "Title is required").trim(),
	bio: z.string().min(1, "Bio is required").trim(),
	phone: z
		.string()
		.min(1, "Phone is required")
		.max(11, "Phone must be 11 digits")
		.trim(),
	locationLabel: z.string().min(1, "Location label is required").trim(),
	locationLink: z.string().min(1, "Location link is required").trim(),
	availability: z.string().min(1, "Availability is required").trim(),
});

export const UserInfoUpdateSchema = z.object({
	id: z.string().min(1, "Profile ID is required"),
	firstName: z.string().min(1, "First name is required").trim().optional(),
	lastName: z.string().min(1, "Last name is required").trim().optional(),
	email: z.email("Invalid email").trim().optional(),
	title: z.string().min(1, "Title is required").trim().optional(),
	bio: z.string().min(1, "Bio is required").trim().optional(),
	phone: z
		.string()
		.min(1, "Phone is required")
		.max(11, "Phone must be 11 digits")
		.trim()
		.optional(),
	locationLabel: z
		.string()
		.min(1, "Location label is required")
		.trim()
		.optional(),
	locationLink: z
		.string()
		.min(1, "Location link is required")
		.trim()
		.optional(),
	availability: z.string().min(1, "Availability is required").trim().optional(),
});

export const UserInfoDeleteSchema = z.object({
	id: z.string().min(1, "Profile ID is required"),
	password: z.string().min(1, "Password is required").trim(),
});
