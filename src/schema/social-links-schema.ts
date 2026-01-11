import z from "zod";

export const SocialLinkItemSchema = z.object({
	label: z.string().min(1, "Label is required").trim(),
	url: z.url("Invalid URL").trim(),
	icon: z.url("Invalid icon URL").optional(),
	sortOrder: z.number().min(0, "Sort order must be a positive integer"),
});

export type SocialLinkItemInput = z.infer<typeof SocialLinkItemSchema>;

export const SocialLinksFormSchema = z.object({
	gmailLabel: z.string().min(1, "Gmail label is required").trim(),
	gmailUrl: z.url("Invalid Gmail URL").trim(),
	gmailIcon: z.instanceof(File).optional(),
	gmailSortOrder: z.string().min(0, "Sort order must be a positive integer"),
	linkedinLabel: z.string().min(1, "LinkedIn label is required").trim(),
	linkedinUrl: z.url("Invalid LinkedIn URL").trim(),
	linkedinIcon: z.instanceof(File).optional(),
	linkedinSortOrder: z.string().min(0, "Sort order must be a positive integer"),
	whatsappLabel: z.string().min(1, "WhatsApp label is required").trim(),
	whatsappUrl: z.url("Invalid WhatsApp URL").trim(),
	whatsappIcon: z.instanceof(File).optional(),
	whatsappSortOrder: z.string().min(0, "Sort order must be a positive integer"),
	messengerLabel: z.string().min(1, "Messenger label is required").trim(),
	messengerUrl: z.url("Invalid Messenger URL").trim(),
	messengerIcon: z.instanceof(File).optional(),
	messengerSortOrder: z
		.string()
		.min(0, "Sort order must be a positive integer"),
});

export type SocialLinksFormInput = z.infer<typeof SocialLinksFormSchema>;
