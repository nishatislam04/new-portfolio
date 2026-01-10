import z from "zod";

// Single social link item schema
export const SocialLinkItemSchema = z.object({
	label: z.string().min(1, "Label is required").trim(),
	url: z.url("Invalid URL").trim(),
	// Optional icon URL after upload (server fills this); either file or this must exist
	icon: z.url("Invalid icon URL").optional(),
	sortOrder: z.coerce
		.number()
		.int()
		.min(0, "Sort order must be a positive integer"),
});

export type SocialLinkItemInput = z.infer<typeof SocialLinkItemSchema>;
