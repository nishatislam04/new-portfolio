"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { updateSocialLinks } from "@/actions/social-links-actions";
import FormFileInput from "@/components/form/form-file-input";
import FormInput from "@/components/form/form-input";
import FormServerError from "@/components/form/form-server-error";
import FormSubmitButton from "@/components/form/form-submit-button";
import { Button } from "@/components/ui/button";
import {
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { SocialLinksFormSchema } from "@/schema/social-links-schema";

interface SocialLink {
	id: string;
	label: string;
	url: string;
	icon?: string | null;
	sortOrder: number;
	profileId?: string | null;
}

/**
 * Social Links Edit Form Component
 *
 * This component provides a form for editing existing social links with file upload support.
 * It uses React Hook Form for validation and state management,
 * and shadcn/ui components for consistent styling.
 *
 * Features:
 * - Fetches existing data from database
 * - File upload to Vercel Blob storage with overwrite capability
 * - Real-time validation with Zod schema
 * - Error handling with toast notifications
 * - Shows existing icon information and allows updates
 * - Responsive design with proper accessibility
 *
 * @returns JSX element for the social links editing form
 */
export default function SocialLinksEdit({
	socialLinks,
}: {
	socialLinks: SocialLink[];
}) {
	/**
	 * Initialize React Hook Form with Zod validation
	 *
	 * Configuration:
	 * - mode: "onBlur" - Validates on field blur
	 * - resolver: Uses Zod schema for validation
	 * - defaultValues: Will be populated with existing data
	 */
	const form = useForm<z.infer<typeof SocialLinksFormSchema>>({
		mode: "onBlur",
		resolver: zodResolver(SocialLinksFormSchema),
		defaultValues: {
			gmailLabel:
				socialLinks.find((link) => link.label.toLowerCase().includes("gmail"))
					?.label || "",
			gmailUrl:
				socialLinks.find((link) => link.label.toLowerCase().includes("gmail"))
					?.url || "",
			gmailIcon: undefined,
			gmailSortOrder:
				socialLinks
					.find((link) => link.label.toLowerCase().includes("gmail"))
					?.sortOrder.toString() || "0",
			linkedinLabel:
				socialLinks.find((link) =>
					link.label.toLowerCase().includes("linkedin"),
				)?.label || "",
			linkedinUrl:
				socialLinks.find((link) =>
					link.label.toLowerCase().includes("linkedin"),
				)?.url || "",
			linkedinIcon: undefined,
			linkedinSortOrder:
				socialLinks
					.find((link) => link.label.toLowerCase().includes("linkedin"))
					?.sortOrder.toString() || "1",
			whatsappLabel:
				socialLinks.find((link) =>
					link.label.toLowerCase().includes("whatsapp"),
				)?.label || "",
			whatsappUrl:
				socialLinks.find((link) =>
					link.label.toLowerCase().includes("whatsapp"),
				)?.url || "",
			whatsappIcon: undefined,
			whatsappSortOrder:
				socialLinks
					.find((link) => link.label.toLowerCase().includes("whatsapp"))
					?.sortOrder.toString() || "2",
			messengerLabel:
				socialLinks.find((link) =>
					link.label.toLowerCase().includes("messenger"),
				)?.label || "",
			messengerUrl:
				socialLinks.find((link) =>
					link.label.toLowerCase().includes("messenger"),
				)?.url || "",
			messengerIcon: undefined,
			messengerSortOrder:
				socialLinks
					.find((link) => link.label.toLowerCase().includes("messenger"))
					?.sortOrder.toString() || "3",
		},
	});

	/**
	 * Form submission handler
	 *
	 * Process:
	 * 1. Validates form data with React Hook Form
	 * 2. Calls server action for file upload and database update
	 * 3. Handles success/error responses
	 * 4. Shows toast notifications
	 *
	 * @param data - Validated form data matching SocialLinksFormSchema
	 */
	async function onSubmit(data: z.infer<typeof SocialLinksFormSchema>) {
		const result = await updateSocialLinks(data, socialLinks);
		if (!result.success) {
			// Show server error as root-level form error
			form.setError("root", {
				message: result.message,
			});
		}

		// success
		if (result.success) {
			toast.success(result.data.message); // Show success notification
		}
	}

	// Check if form has any validation errors
	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	return (
		<>
			<h1>Edit Social link</h1>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FieldSet className="mt-8">
					<FieldLegend>Gmail</FieldLegend>
					<FieldDescription>
						Enter details for Gmail contact link.
					</FieldDescription>

					<FieldGroup>
						<Controller
							name="gmailLabel"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Label"
									inputProps={{
										placeholder: "Gmail",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="gmailUrl"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="URL"
									inputProps={{
										placeholder: "mailto:you@example.com",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="gmailIcon"
							control={form.control}
							render={({ field, fieldState }) => (
								<>
									<FormFileInput
										field={field}
										fieldState={fieldState}
										label="Icon (SVG/PNG)"
										className="mb-2"
										inputProps={{ accept: "image/*,image/svg+xml" }}
									/>
									{socialLinks.find((link) =>
										link.label.toLowerCase().includes("gmail"),
									)?.icon && (
										<FieldDescription>
											<span className="text-emerald-400">
												✓ Icon already exists
											</span>{" "}
											- Choose a new file to update
										</FieldDescription>
									)}
								</>
							)}
						/>
						<Controller
							name="gmailSortOrder"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Sort order"
									inputProps={{ type: "text" }}
								/>
							)}
						/>
					</FieldGroup>
				</FieldSet>
				<FieldSeparator />
				<FieldSet className="mt-8">
					<FieldLegend>LinkedIn</FieldLegend>
					<FieldDescription>
						Enter details for LinkedIn profile link.
					</FieldDescription>

					<FieldGroup>
						<Controller
							name="linkedinLabel"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Label"
									inputProps={{
										placeholder: "LinkedIn",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="linkedinUrl"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="URL"
									inputProps={{
										placeholder: "https://www.linkedin.com/in/username",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="linkedinIcon"
							control={form.control}
							render={({ field, fieldState }) => (
								<>
									<FormFileInput
										field={field}
										fieldState={fieldState}
										label="Icon (SVG/PNG)"
										className="mb-2"
										inputProps={{ accept: "image/*,image/svg+xml" }}
									/>
									{socialLinks.find((link) =>
										link.label.toLowerCase().includes("linkedin"),
									)?.icon && (
										<FieldDescription>
											<span className="text-emerald-400">
												✓ Icon already exists
											</span>{" "}
											- Choose a new file to update
										</FieldDescription>
									)}
								</>
							)}
						/>
						<Controller
							name="linkedinSortOrder"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Sort order"
									inputProps={{ type: "text" }}
								/>
							)}
						/>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />
				<FieldSet className="mt-8">
					<FieldLegend>WhatsApp</FieldLegend>
					<FieldDescription>Enter details for WhatsApp link.</FieldDescription>

					<FieldGroup>
						<Controller
							name="whatsappLabel"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Label"
									inputProps={{
										placeholder: "WhatsApp",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="whatsappUrl"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="URL"
									inputProps={{
										placeholder: "https://wa.me/8801XXXXXXXXX",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="whatsappIcon"
							control={form.control}
							render={({ field, fieldState }) => (
								<>
									<FormFileInput
										field={field}
										fieldState={fieldState}
										label="Icon (SVG/PNG)"
										className="mb-2"
										inputProps={{ accept: "image/*,image/svg+xml" }}
									/>
									{socialLinks.find((link) =>
										link.label.toLowerCase().includes("whatsapp"),
									)?.icon && (
										<FieldDescription>
											<span className="text-emerald-400">
												✓ Icon already exists
											</span>{" "}
											- Choose a new file to update
										</FieldDescription>
									)}
								</>
							)}
						/>
						<Controller
							name="whatsappSortOrder"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Sort order"
									inputProps={{ type: "text" }}
								/>
							)}
						/>
					</FieldGroup>
				</FieldSet>

				<FieldSeparator />
				<FieldSet className="mt-8">
					<FieldLegend>Messenger</FieldLegend>
					<FieldDescription>
						Enter details for Facebook Messenger link.
					</FieldDescription>

					<FieldGroup>
						<Controller
							name="messengerLabel"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Label"
									inputProps={{
										placeholder: "Messenger",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="messengerUrl"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="URL"
									inputProps={{
										placeholder: "https://m.me/username",
										autoComplete: "off",
									}}
								/>
							)}
						/>
						<Controller
							name="messengerIcon"
							control={form.control}
							render={({ field, fieldState }) => (
								<>
									<FormFileInput
										field={field}
										fieldState={fieldState}
										label="Icon (SVG/PNG)"
										className="mb-2"
										inputProps={{ accept: "image/*,image/svg+xml" }}
									/>
									{socialLinks.find((link) =>
										link.label.toLowerCase().includes("messenger"),
									)?.icon && (
										<FieldDescription>
											<span className="text-emerald-400">
												✓ Icon already exists
											</span>{" "}
											- Choose a new file to update
										</FieldDescription>
									)}
								</>
							)}
						/>
						<Controller
							name="messengerSortOrder"
							control={form.control}
							render={({ field, fieldState }) => (
								<FormInput
									field={field}
									fieldState={fieldState}
									label="Sort order"
									inputProps={{ type: "text" }}
								/>
							)}
						/>
					</FieldGroup>
				</FieldSet>

				{/* Server error and button layout */}
				<div className="grid grid-cols-3 items-center w-full">
					{/* Left column: error */}
					<div className="flex justify-start">
						<FormServerError form={form} />
					</div>

					{/* Center column: button */}
					<div className="flex justify-center">
						<FormSubmitButton isSubmitting={isSubmitting} isDirty={isDirty} />
					</div>

					<div />
				</div>
			</form>
		</>
	);
}
