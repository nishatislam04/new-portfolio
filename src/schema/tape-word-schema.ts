import z from "zod";

export const TapeWordItemFormSchema = z.object({
	id: z.string().optional(),
	value: z.string().min(1, "Value is required").trim(),
	sortOrder: z
		.string()
		.regex(/^[0-9]+$/, "Sort order must be a non-negative integer")
		.trim(),
});

export const TapeWordsFormSchema = z.object({
	items: z.array(TapeWordItemFormSchema),
});

export type TapeWordItemFormInput = z.infer<typeof TapeWordItemFormSchema>;
export type TapeWordsFormInput = z.infer<typeof TapeWordsFormSchema>;

export const TapeWordServerItemSchema = z.object({
	id: z.string().optional(),
	value: z.string().min(1).trim(),
	sortOrder: z.number().int().min(0),
});

export const TapeWordServerPayloadSchema = z.object({
	items: z.array(TapeWordServerItemSchema),
});

export type TapeWordServerItemInput = z.infer<typeof TapeWordServerItemSchema>;
export type TapeWordServerPayloadInput = z.infer<
	typeof TapeWordServerPayloadSchema
>;
