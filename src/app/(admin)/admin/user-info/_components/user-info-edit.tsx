"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateUserInfoForm } from "@/actions/user-info-form-actions";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import FormTextArea from "@/components/form/form-textarea";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserInfoUpdateSchema } from "@/schema/user-info-form-schema";
import AlertResourceDelete from "./alert-resource-delete";

interface UserInfoEditProps {
	user: {
		id: string;
		firstName: string | null;
		lastName: string | null;
		email: string | null;
		title: string | null;
		bio: string | null;
		phone: string | null;
		locationLabel: string | null;
		locationLink: string | null;
		availability: string | null;
	};
}

export default function UserInfoEdit({ user }: UserInfoEditProps) {
	const router = useRouter();
	const form = useForm<z.infer<typeof UserInfoUpdateSchema>>({
		mode: "onBlur",
		resolver: zodResolver(UserInfoUpdateSchema),
		defaultValues: {
			id: user.id,
			firstName: user.firstName ?? "",
			lastName: user.lastName ?? "",
			email: user.email ?? "",
			title: user.title ?? "",
			bio: user.bio ?? "",
			phone: user.phone ?? "",
			locationLabel: user.locationLabel ?? "",
			locationLink: user.locationLink ?? "",
			availability: user.availability ?? "",
		},
	});

	async function onSubmit(data: z.infer<typeof UserInfoUpdateSchema>) {
		const result = await updateUserInfoForm(data);
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
					result.error.field as keyof z.infer<typeof UserInfoUpdateSchema>,
					{
						message: result.message,
					},
				);
			} else {
				form.setError("root", {
					message: result.message,
				});
			}
		}

		// success
		if (result.success) {
			router.refresh();
			toast.success(result.data.message);
		}
	}

	// Check if form has any validation errors
	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-3xl font-semibold text-emerald-300/90 capitalize self-center h-full">
					User Edit Management
				</h2>

				{/* first alert - asking if they really want to delete this resource */}
				<AlertResourceDelete user={user} />
			</div>

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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							inputProps={{
								placeholder: "Enter your first name",
								autoComplete: "first-name",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							inputProps={{
								placeholder: "Enter your last name",
								autoComplete: "name",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							inputProps={{
								placeholder: "Enter your email",
								autoComplete: "email",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							description="Enter your title (Designation)."
							descriptionClassName="text-sm text-gray-400"
							inputProps={{
								placeholder: "Enter your title",
								autoComplete: "title",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							textareaProps={{
								placeholder: "Enter your bio",
								autoComplete: "bio",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							inputProps={{
								placeholder: "Enter your phone number",
								autoComplete: "phone",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							description="Enter location label (address name)."
							descriptionClassName="text-sm text-gray-400"
							inputProps={{
								placeholder: "Enter location label",
								autoComplete: "location-label",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							description="Enter location link(google map link)."
							descriptionClassName="text-sm text-gray-400"
							inputProps={{
								placeholder: "Enter location link",
								autoComplete: "location-link",
							}}
							errorClassName="text-red-500 -mt-1"
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
							labelClassName="text-lg text-gray-300/90 -mb-1"
							description="Enter your availability status."
							descriptionClassName="text-sm text-gray-400"
							inputProps={{
								placeholder: "Enter availability",
								autoComplete: "availability",
							}}
							errorClassName="text-red-500 -mt-1"
						/>
					)}
				/>
				{form.formState.errors.root && (
					<div className="mb-8 text-red-500">
						{form.formState.errors.root.message}
					</div>
				)}
				<div className="flex gap-4">
					<Button
						type="submit"
						disabled={isSubmitting || !isDirty}
						className="flex-1"
					>
						{isSubmitting ? "Updating..." : "Update User Info"}
					</Button>
				</div>
			</form>
		</div>
	);
}
