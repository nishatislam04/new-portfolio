import z from "zod";

/**
 * Client-side form schema used with React Hook Form for creating/updating
 * a single Work Experience entry.
 *
 * This schema is intentionally separate from the server schema so that
 * we can safely use `File` (for icon uploads) only on the client.
 */

// Technology item as represented in the client form
export const WorkExperienceTechnologyClientSchema = z.object({
	label: z.string().min(1, "Technology label is required").trim(),
	// File input for icon upload (optional)
	icon: z.instanceof(File).optional(),
	// When editing, we may already have an existing icon URL stored in DB
	existingIconUrl: z.string().url().optional(),
});

// Main client-side form schema
export const WorkExperienceFormSchema = z.object({
	company: z.string().min(1, "Company is required").trim(),
	position: z.string().min(1, "Position is required").trim(),
	location: z.string().min(1, "Location is required").trim(),
	// Employment type like: "full-time", "part-time", etc.
	type: z.string().min(1, "Employment type is required").trim(),
	// Display-friendly duration label (e.g. "July 2024 - Current")
	durationLabel: z.string().min(1, "Duration is required").trim(),
	startLabel: z.string().min(1, "Start label is required").trim(),
	endLabel: z.string().min(1, "End label is required").trim(),
	description: z.string().min(1, "Description is required").trim(),
	isCurrent: z.boolean(),
	// Stored as string in the form, parsed to number on the server
	sortOrder: z
		.string()
		.regex(/^\d+$/, "Sort order must be a positive integer")
		.trim(),
	// Achievements are modeled as simple string bullets
	achievements: z
		.array(z.string().min(1, "Achievement cannot be empty").trim())
		.min(1, "At least one achievement is required"),
	// Technologies with label + optional icon upload
	technologies: z
		.array(WorkExperienceTechnologyClientSchema)
		.min(1, "At least one technology is required"),
});

export type WorkExperienceFormInput = z.infer<typeof WorkExperienceFormSchema>;

/**
 * Server-side schemas without `File` to validate data after file uploads
 * have been processed and we have concrete icon URLs.
 */

export const WorkExperienceTechnologySchema = z.object({
	label: z.string().min(1).trim(),
	iconUrl: z.string().url().optional(),
});

export const WorkExperienceServerBaseSchema = z.object({
	company: z.string().min(1).trim(),
	position: z.string().min(1).trim(),
	location: z.string().min(1).trim(),
	type: z.string().min(1).trim(),
	durationLabel: z.string().min(1).trim(),
	startLabel: z.string().min(1).trim(),
	endLabel: z.string().min(1).trim(),
	description: z.string().min(1).trim(),
	isCurrent: z.boolean(),
	sortOrder: z.number().int().min(0),
	achievements: z.array(z.string().min(1).trim()),
	technologies: z.array(WorkExperienceTechnologySchema),
});

export const WorkExperienceCreateServerSchema = WorkExperienceServerBaseSchema;

export const WorkExperienceUpdateServerSchema =
	WorkExperienceServerBaseSchema.extend({
		id: z.string().min(1, "Work experience ID is required"),
	});

export type WorkExperienceServerInput = z.infer<
	typeof WorkExperienceServerBaseSchema
>;

export type WorkExperienceCreateServerInput = z.infer<
	typeof WorkExperienceCreateServerSchema
>;

export type WorkExperienceUpdateServerInput = z.infer<
	typeof WorkExperienceUpdateServerSchema
>;
