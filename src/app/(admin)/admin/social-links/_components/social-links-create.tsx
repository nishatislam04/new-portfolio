"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { createSocialLinks } from "@/actions/social-links-actions";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SocialLinksFormSchema } from "@/schema/social-links-schema";

/**
 * Social Links Create Form Component
 *
 * This component provides a form for creating social links with file upload support.
 * It uses React Hook Form for validation and state management,
 * and shadcn/ui components for consistent styling.
 *
 * Features:
 * - File upload to Vercel Blob storage
 * - Real-time validation with Zod schema
 * - Error handling with toast notifications
 * - Responsive design with proper accessibility
 *
 * @returns JSX element for the social links creation form
 */
export default function SocialLinksCreate() {
	const router = useRouter();
	/**
	 * Initialize React Hook Form with Zod validation
	 *
	 * Configuration:
	 * - mode: "onBlur" - Validates on field blur
	 * - resolver: Uses Zod schema for validation
	 * - defaultValues: Sets initial form state for all platforms
	 *
	 * Form structure matches SocialLinksFormSchema with individual fields for each platform
	 */
	const form = useForm<z.infer<typeof SocialLinksFormSchema>>({
		mode: "onBlur",
		resolver: zodResolver(SocialLinksFormSchema),
		defaultValues: {
			gmailLabel: "",
			gmailUrl: "",
			gmailIcon: undefined,
			gmailSortOrder: "0",
			linkedinLabel: "",
			linkedinUrl: "",
			linkedinIcon: undefined,
			linkedinSortOrder: "1",
			whatsappLabel: "",
			whatsappUrl: "",
			whatsappIcon: undefined,
			whatsappSortOrder: "2",
			messengerLabel: "",
			messengerUrl: "",
			messengerIcon: undefined,
			messengerSortOrder: "3",
		},
	});

	/**
	 * Form submission handler
	 *
	 * Process:
	 * 1. Validates form data with React Hook Form
	 * 2. Calls server action for file upload and database storage
	 * 3. Handles success/error responses
	 * 4. Shows toast notifications
	 * 5. Resets form on success
	 *
	 * @param data - Validated form data matching SocialLinksFormSchema
	 */
	async function onSubmit(data: z.infer<typeof SocialLinksFormSchema>) {
		const result = await createSocialLinks(data);
		if (!result.success) {
			// Show server error as root-level form error
			form.setError("root", {
				message: result.message,
			});
		}

		// success
		if (result.success) {
			form.reset(); // Clear form fields
			toast.success(result.data.message); // Show success notification
			router.push("/admin/social-links");
		}
	}

	// Check if form has any validation errors
	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<FieldSet>
				<FieldLegend>Gmail</FieldLegend>
				<FieldDescription>
					Enter details for Gmail contact link.
				</FieldDescription>
				<FieldGroup>
					<Controller
						name="gmailLabel"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Label
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="Gmail"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="gmailUrl"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									URL
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="mailto:you@example.com"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="gmailIcon"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Icon (SVG/PNG)
								</FieldLabel>
								<Input
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="file"
									accept="image/*,image/svg+xml"
									onChange={(e) => field.onChange(e.target.files?.[0])} // Handle file selection
									onBlur={field.onBlur}
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="gmailSortOrder"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Sort order
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="text"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</FieldSet>
			<FieldSeparator />
			<FieldSet>
				<FieldLegend>LinkedIn</FieldLegend>
				<FieldDescription>
					Enter details for LinkedIn profile link.
				</FieldDescription>
				<FieldGroup>
					<Controller
						name="linkedinLabel"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Label
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="LinkedIn"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="linkedinUrl"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									URL
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="https://www.linkedin.com/in/username"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="linkedinIcon"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Icon (SVG/PNG)
								</FieldLabel>
								<Input
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="file"
									accept="image/*,image/svg+xml"
									onChange={(e) => field.onChange(e.target.files?.[0])}
									onBlur={field.onBlur}
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="linkedinSortOrder"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Sort order
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="text"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</FieldSet>

			<FieldSeparator />
			<FieldSet>
				<FieldLegend>WhatsApp</FieldLegend>
				<FieldDescription>Enter details for WhatsApp link.</FieldDescription>
				<FieldGroup>
					<Controller
						name="whatsappLabel"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Label
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="WhatsApp"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="whatsappUrl"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									URL
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="https://wa.me/8801XXXXXXXXX"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="whatsappIcon"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Icon (SVG/PNG)
								</FieldLabel>
								<Input
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="file"
									accept="image/*,image/svg+xml"
									onChange={(e) => field.onChange(e.target.files?.[0])}
									onBlur={field.onBlur}
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="whatsappSortOrder"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Sort order
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="text"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</FieldSet>

			<FieldSeparator />
			<FieldSet>
				<FieldLegend>Messenger</FieldLegend>
				<FieldDescription>
					Enter details for Facebook Messenger link.
				</FieldDescription>
				<FieldGroup>
					<Controller
						name="messengerLabel"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Label
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="Messenger"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="messengerUrl"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									URL
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									placeholder="https://m.me/username"
									autoComplete="off"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="messengerIcon"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Icon (SVG/PNG)
								</FieldLabel>
								<Input
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="file"
									accept="image/*,image/svg+xml"
									onChange={(e) => field.onChange(e.target.files?.[0])}
									onBlur={field.onBlur}
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
					<Controller
						name="messengerSortOrder"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field className="mb-8" data-invalid={fieldState.invalid}>
								<FieldLabel
									className="text-lg text-gray-300/90 -mb-1"
									htmlFor={field.name}
								>
									Sort order
								</FieldLabel>
								<Input
									{...field}
									id={field.name}
									aria-invalid={fieldState.invalid}
									type="text"
								/>
								{fieldState.invalid && (
									<FieldError
										className="text-red-500 -mt-1"
										errors={[fieldState.error]}
									/>
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</FieldSet>

			{/* Server error and button layout */}
			<div className="grid grid-cols-3 items-center w-full">
				{/* Left column: error */}
				<div className="flex justify-start">
					{form.formState.errors.root && (
						<div className="max-w-md">
							<Field className="text-red-600" data-invalid>
								<FieldError errors={[form.formState.errors.root]} />
							</Field>
						</div>
					)}
				</div>

				{/* Center column: button */}
				<div className="flex justify-center">
					<Button
						variant="oldButtonPrimary"
						size="lg"
						type="submit"
						disabled={!isDirty || isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save social links"}
					</Button>
				</div>

				<div />
			</div>
		</form>
	);
}
