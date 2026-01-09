"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { submitUserInfoForm } from "@/actions/user-info-form-actions";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInfoFormSchema } from "@/schema/user-info-form-schema";

export default function UserInfoCreate() {
	const form = useForm<z.infer<typeof UserInfoFormSchema>>({
		mode: "onBlur",
		resolver: zodResolver(UserInfoFormSchema),
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

	async function onSubmit(data: z.infer<typeof UserInfoFormSchema>) {
		const result = await submitUserInfoForm(data);
		if (!result.success) {
			if (result.type === "validation") {
				// Set field errors from server validation
				Object.entries(result.fieldErrors).forEach(([field, messages]) => {
					form.setError(field as Parameters<typeof form.setError>[0], {
						message: messages.join(", "),
					});
				});
			}
			if (result.type === "server-error" && result.error.field) {
				form.setError(
					result.error.field as keyof z.infer<typeof UserInfoFormSchema>,
					{
						message: result.message,
					},
				);
			} else {
				form.setError("root", {
					message:
						result.message === "slug already exists"
							? "Slug already exists. Please change your name and phone number"
							: result.message,
				});
			}
		}

		// success
		if (result.success) {
			form.reset();
			toast.success(result.data.message);
		}
	}

	// Check if form has any validation errors
	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	return (
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
							autoComplete="name"
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
				name="title"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-8 -space-y-1" data-invalid={fieldState.invalid}>
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
				name="locationLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-8 -space-y-1" data-invalid={fieldState.invalid}>
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
				name="locationLink"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-8 -space-y-1" data-invalid={fieldState.invalid}>
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
				name="availability"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-8 -space-y-1" data-invalid={fieldState.invalid}>
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
						{fieldState.invalid && (
							<FieldError
								className="text-red-500 -mt-1"
								errors={[fieldState.error]}
							/>
						)}
					</Field>
				)}
			/>

			{/* Server error left-aligned, button centered */}
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
						disabled={!isDirty || isSubmitting}
						size="lg"
						className="mt-18 px-12"
						type="submit"
					>
						{isSubmitting ? "Submitting..." : "Confirm"}
					</Button>
				</div>

				<div />
			</div>
		</form>
	);
}
