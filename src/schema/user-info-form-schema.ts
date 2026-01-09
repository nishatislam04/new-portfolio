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
