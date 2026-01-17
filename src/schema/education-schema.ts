import z from "zod";

export const EducationFormSchema = z.object({
	institution: z.string().min(1, "Institution name is required").trim(),
	degree: z.string().min(1, "Degree is required").trim(),
	durationLabel: z.string().min(1, "Duration label is required").trim(),
	startDate: z.string().min(1, "Start date is required").trim(),
	endDate: z.string().min(1, "End date is required").trim(),
	gpa: z.string().min(1, "GPA is required").trim(),
	description: z
		.string()
		.max(1000, "Description must be 1000 characters or less")
		.optional()
		.or(z.literal("")),
	sortOrder: z
		.string()
		.regex(/^\d+$/, "Sort order must be a positive integer")
		.trim(),
	highlights: z
		.array(z.string().min(1, "Highlight cannot be empty").trim())
		.min(1, "Add at least one highlight"),
});

export type EducationFormInput = z.infer<typeof EducationFormSchema>;

export const EducationServerSchema = z.object({
	institution: z.string().min(1).trim(),
	degree: z.string().min(1).trim(),
	durationLabel: z.string().min(1).trim(),
	startDate: z.string().min(1).trim(),
	endDate: z.string().min(1).trim(),
	gpa: z.string().min(1).trim(),
	description: z.string().trim().optional(),
	sortOrder: z.number().int().min(0),
	highlights: z.array(z.string().min(1).trim()),
});

export type EducationServerInput = z.infer<typeof EducationServerSchema>;
