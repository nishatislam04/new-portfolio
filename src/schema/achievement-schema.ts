import z from "zod";

export const AchievementItemFormSchema = z.object({
	id: z.string().optional(),
	info: z.string().min(1, "Info is required").trim(),
	number: z.string().min(1, "Number is required").trim(),
	text: z.string().min(1, "Text is required").trim(),
	sortOrder: z
		.string()
		.regex(/^[0-9]+$/, "Sort order must be a non-negative integer")
		.trim(),
});

export const AchievementsFormSchema = z.object({
	items: z.array(AchievementItemFormSchema),
});

export type AchievementItemFormInput = z.infer<
	typeof AchievementItemFormSchema
>;
export type AchievementsFormInput = z.infer<typeof AchievementsFormSchema>;

export const AchievementServerItemSchema = z.object({
	id: z.string().optional(),
	info: z.string().min(1).trim(),
	number: z.string().min(1).trim(),
	text: z.string().min(1).trim(),
	sortOrder: z.number().int().min(0),
});

export const AchievementServerPayloadSchema = z.object({
	items: z.array(AchievementServerItemSchema),
});

export type AchievementServerItemInput = z.infer<
	typeof AchievementServerItemSchema
>;
export type AchievementServerPayloadInput = z.infer<
	typeof AchievementServerPayloadSchema
>;
