"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { submitUserInfoForm } from "@/actions/user-info-form-actions";
import FormInput from "@/components/form/form-input";
import FormServerError from "@/components/form/form-server-error";
import FormSubmitButton from "@/components/form/form-submit-button";
import FormTextArea from "@/components/form/form-textarea";
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
					<FormInput
						field={field}
						fieldState={fieldState}
						label="First Name"
						className="mb-8"
						inputProps={{
							placeholder: "Enter your first name",
							autoComplete: "first-name",
						}}
					/>
				)}
			/>
			<Controller
				name="lastName"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Last Name"
						className="mb-8"
						inputProps={{
							placeholder: "Enter your last name",
							autoComplete: "name",
						}}
					/>
				)}
			/>
			<Controller
				name="email"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Email"
						className="mb-8"
						inputProps={{
							placeholder: "Enter your email",
							autoComplete: "email",
						}}
					/>
				)}
			/>
			<Controller
				name="title"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Title"
						className="mb-8 -space-y-1"
						description="Enter your title (Designation)."
						inputProps={{
							placeholder: "Enter your title",
							autoComplete: "title",
						}}
					/>
				)}
			/>
			<Controller
				name="bio"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormTextArea
						field={field}
						fieldState={fieldState}
						label="Bio"
						className="mb-8"
						textareaProps={{
							placeholder: "Enter your bio",
							autoComplete: "bio",
						}}
					/>
				)}
			/>
			<Controller
				name="phone"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Phone Number"
						className="mb-8"
						inputProps={{
							placeholder: "Enter your phone number",
							autoComplete: "phone",
						}}
					/>
				)}
			/>
			<Controller
				name="locationLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Location Label"
						className="mb-8 -space-y-1"
						description="Enter location label (address name)."
						inputProps={{
							placeholder: "Enter location label",
							autoComplete: "location-label",
						}}
					/>
				)}
			/>
			<Controller
				name="locationLink"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Location Link"
						className="mb-8 -space-y-1"
						description="Enter location link(google map link)."
						inputProps={{
							placeholder: "Enter location link",
							autoComplete: "location-link",
						}}
					/>
				)}
			/>
			<Controller
				name="availability"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Available"
						className="mb-8 -space-y-1"
						description="Enter availability (e.g., Available, Not Available)."
						inputProps={{
							placeholder: "Enter availability",
							autoComplete: "availability",
						}}
					/>
				)}
			/>

			{/* Server error left-aligned, button centered */}
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
	);
}
