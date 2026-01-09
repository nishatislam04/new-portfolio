"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { submitUserInfoForm } from "@/actions/user-info-form-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import { Button } from "@/components/ui";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	firstName: z.string().min(1, "First name is required").trim(),
	lastName: z.string().min(1, "Last name is required").trim(),
	email: z.email("Invalid email").trim(),
	title: z.string().min(1, "Title is required").trim(),
	bio: z.string().min(1, "Bio is required").trim(),
	phone: z.string().min(1, "Phone is required").trim(),
	locationLabel: z.string().min(1, "Location label is required").trim(),
	locationLink: z.string().min(1, "Location link is required").trim(),
	availability: z.string().min(1, "Availability is required").trim(),
});

export default function UserInfoPage(): ReactElement {
	const form = useForm<z.infer<typeof formSchema>>({
		mode: "onChange",
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			title: "",
			bio: "",
			phone: "",
			locationLabel: "",
			locationLink: "",
			availability: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const result = await submitUserInfoForm(data);
		if (!result.success) {
			console.error(result);
		}
	}

	// Check if form has any validation errors
	const hasErrors = Object.keys(form.formState.errors).length > 0;
	const isSubmitting = form.formState.isSubmitting;

	return (
		<AdminPageShell title="User Info Management" description="">
			{/* user form */}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Controller
					name="firstName"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-8" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								First Name
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your first name"
								autoComplete="first-name"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="lastName"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-8" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Last Name
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your last name"
								autoComplete="last-name"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-8" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Email
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your email"
								autoComplete="email"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="title"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							className="mb-8 -space-y-1"
							data-invalid={fieldState.invalid}
						>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Title
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your title"
								autoComplete="title"
							/>
							<FieldDescription className="text-sm text-gray-400">
								Enter your title (Designation).
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="bio"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-8" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Bio
							</FieldLabel>
							<Textarea
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your bio"
								autoComplete="bio"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="phone"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-8" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Phone Number
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your phone number"
								autoComplete="phone"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="locationLabel"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							className="mb-8 -space-y-1"
							data-invalid={fieldState.invalid}
						>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Location Label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter location label"
								autoComplete="location-label"
							/>
							<FieldDescription className="text-sm text-gray-400">
								Enter location label (address name).
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="locationLink"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							className="mb-8 -space-y-1"
							data-invalid={fieldState.invalid}
						>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Location Link
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter location link"
								autoComplete="location-link"
							/>
							<FieldDescription className="text-sm text-gray-400">
								Enter location link(google map link).
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="availability"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							className="mb-8 -space-y-1"
							data-invalid={fieldState.invalid}
						>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Available
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter availability"
								autoComplete="availability"
							/>
							<FieldDescription className="text-sm text-gray-400">
								Enter availability (e.g., Available, Not Available).
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<div className="flex justify-center w-full items-center">
					<Button
						disabled={hasErrors || isSubmitting}
						size="lg"
						className="mt-18 px-12"
						type="submit"
					>
						{isSubmitting ? "Submitting..." : "Confirm"}
					</Button>
				</div>
			</form>
		</AdminPageShell>
	);
}
