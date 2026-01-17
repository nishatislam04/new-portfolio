import z from "zod";

export const ProfileStatsFormSchema = z.object({
	experienceLabel: z.string().min(1, "Experience label is required").trim(),
	projectsCompletedLabel: z
		.string()
		.min(1, "Projects completed label is required")
		.trim(),
	technologiesLabel: z
		.string()
		.min(1, "Technologies label is required")
		.trim(),
	clientSatisfactionLabel: z
		.string()
		.min(1, "Client satisfaction label is required")
		.trim(),
});

export type ProfileStatsFormInput = z.infer<typeof ProfileStatsFormSchema>;
