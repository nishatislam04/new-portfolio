"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import {
	deleteUserInfo,
	updateUserInfoForm,
} from "@/actions/user-info-form-actions";
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
} from "@/components/ui";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	UserInfoDeleteSchema,
	UserInfoUpdateSchema,
} from "@/schema/user-info-form-schema";

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
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [passwordOpen, setPasswordOpen] = useState(false);
	const [noticeOpen, setNoticeOpen] = useState(false);
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

	const deleteForm = useForm<z.infer<typeof UserInfoDeleteSchema>>({
		mode: "onBlur",
		resolver: zodResolver(UserInfoDeleteSchema),
		defaultValues: {
			id: user.id,
			password: "",
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

	async function onDeleteSubmit(data: z.infer<typeof UserInfoDeleteSchema>) {
		const result = await deleteUserInfo(data);
		if (!result.success) {
			if (result.type === "validation") {
				Object.entries(result.fieldErrors).forEach(([field, messages]) => {
					deleteForm.setError(
						field as Parameters<typeof deleteForm.setError>[0],
						{
							message: messages.join(", "),
						},
					);
				});
			}
			if (result.type === "server-error") {
				toast.error(result.message);
			}
			return;
		}

		setPasswordOpen(false);
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
				<Button
					type="button"
					variant="destructive"
					onClick={() => setConfirmOpen(true)}
				>
					<Trash2 />
					Delete Me
				</Button>
			</div>

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
								Enter your availability status.
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
				{form.formState.errors.root && (
					<div className="mb-8 text-red-500">
						{form.formState.errors.root.message}
					</div>
				)}
				<div className="flex gap-4">
					<Button
						type="submit"
						variant="primary"
						disabled={isSubmitting || !isDirty}
						className="flex-1"
					>
						{isSubmitting ? "Updating..." : "Update User Info"}
					</Button>
				</div>
			</form>

			{/* First Confirmation Dialog */}
			<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<h3 className="text-xl font-semibold text-white">
							Delete Confirmation
						</h3>
						<p className="text-gray-300">
							Are you sure you want to delete this resource?
						</p>
					</DialogHeader>
					<div className="p-6 flex items-center justify-end gap-3">
						<Button
							type="button"
							className="bg-gray-800 hover:bg-gray-700"
							onClick={() => setConfirmOpen(false)}
						>
							Cancel
						</Button>
						<Button
							type="button"
							className="bg-red-600 hover:bg-red-700 text-white"
							onClick={() => {
								setConfirmOpen(false);
								setPasswordOpen(true);
							}}
						>
							Yes, Delete
						</Button>
					</div>
					<DialogClose onClose={() => setConfirmOpen(false)}>✕</DialogClose>
				</DialogContent>
			</Dialog>

			{/* Second Dialog: Password Entry */}
			<Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
				<DialogContent>
					<DialogHeader>
						<h3 className="text-xl font-semibold text-white">
							Please provide delete resource password below
						</h3>
						<p className="text-gray-300">
							This action is permanent and cannot be undone.
						</p>
					</DialogHeader>
					<div className="px-6">
						<button
							type="button"
							className="text-sm text-emerald-400 hover:text-emerald-300 underline"
							onClick={() => setNoticeOpen(true)}
						>
							click here to get the password
						</button>
					</div>
					<form
						className="p-6 pt-4"
						onSubmit={deleteForm.handleSubmit(onDeleteSubmit)}
					>
						<Controller
							name="password"
							control={deleteForm.control}
							render={({ field, fieldState }) => (
								<Field className="mb-6" data-invalid={fieldState.invalid}>
									<FieldLabel
										className="text-gray-300/90 -mb-1"
										htmlFor={field.name}
									>
										Password
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										type="password"
										placeholder="Enter delete password"
										aria-invalid={fieldState.invalid}
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
						<div className="flex items-center justify-end gap-3">
							<Button
								type="button"
								className="bg-gray-800 hover:bg-gray-700"
								onClick={() => setPasswordOpen(false)}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-red-600 hover:bg-red-700 text-white"
							>
								Delete
							</Button>
						</div>
					</form>
					<DialogClose onClose={() => setPasswordOpen(false)}>✕</DialogClose>
				</DialogContent>
			</Dialog>

			{/* Notice Dialog (Alert) */}
			<Dialog open={noticeOpen} onOpenChange={setNoticeOpen}>
				<DialogContent>
					<DialogHeader>
						<h3 className="text-xl font-semibold text-white">Alert</h3>
						<p className="text-gray-300">
							this resource deleting password will be sent to your email box.
							please check
						</p>
					</DialogHeader>
					<div className="p-6 flex items-center justify-end">
						<Button
							type="button"
							className="bg-emerald-600 hover:bg-emerald-700 text-white"
							onClick={() => setNoticeOpen(false)}
						>
							OK
						</Button>
					</div>
					<DialogClose onClose={() => setNoticeOpen(false)}>✕</DialogClose>
				</DialogContent>
			</Dialog>
		</div>
	);
}
