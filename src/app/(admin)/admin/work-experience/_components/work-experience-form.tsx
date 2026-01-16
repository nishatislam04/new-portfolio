"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	createWorkExperience,
	deleteWorkExperience,
	updateWorkExperience,
	type WorkExperienceDTO,
} from "@/actions/work-experience-actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	type WorkExperienceFormInput,
	WorkExperienceFormSchema,
} from "@/schema/work-experience-schema";

// Employment types used by the dropdown in the form.
const EMPLOYMENT_TYPES = [
	{ value: "full-time", label: "Full-time" },
	{ value: "part-time", label: "Part-time" },
	{ value: "contract", label: "Contract" },
	{ value: "internship", label: "Internship" },
	{ value: "volunteer", label: "Volunteer" },
];

interface BaseWorkExperienceFormProps {
	mode: "create" | "edit";
	initialData?: WorkExperienceDTO;
}

function BaseWorkExperienceForm({
	mode,
	initialData,
}: BaseWorkExperienceFormProps) {
	const router = useRouter();

	const form = useForm<WorkExperienceFormInput>({
		mode: "onBlur",
		resolver: zodResolver(WorkExperienceFormSchema),
		defaultValues:
			mode === "edit" && initialData
				? {
						company: initialData.company,
						position: initialData.position,
						location: initialData.location,
						type: initialData.type ?? "full-time",
						durationLabel: initialData.durationLabel ?? "",
						startLabel: initialData.startLabel ?? "",
						endLabel: initialData.endLabel ?? "",
						description: initialData.description ?? "",
						isCurrent: initialData.isCurrent,
						sortOrder: String(initialData.sortOrder ?? 0),
						achievements:
							initialData.achievements.length > 0
								? initialData.achievements
								: [""],
						technologies:
							initialData.technologies.length > 0
								? initialData.technologies.map((tech) => ({
										label: tech.label,
										icon: undefined,
										existingIconUrl: tech.iconUrl,
									}))
								: [
										{
											label: "",
											icon: undefined,
											existingIconUrl: undefined,
										},
									],
					}
				: {
						company: "",
						position: "",
						location: "",
						type: "full-time",
						durationLabel: "",
						startLabel: "",
						endLabel: "",
						description: "",
						isCurrent: true,
						sortOrder: "0",
						achievements: [""],
						technologies: [
							{
								label: "",
								icon: undefined,
								existingIconUrl: undefined,
							},
						],
					},
	});

	const achievementsArray = useFieldArray({
		name: "achievements",
		control: form.control,
	});

	const technologiesArray = useFieldArray({
		name: "technologies",
		control: form.control,
	});

	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	async function onSubmit(data: WorkExperienceFormInput) {
		const action =
			mode === "create" || !initialData
				? createWorkExperience
				: (payload: WorkExperienceFormInput) =>
						updateWorkExperience(initialData.id, payload);

		const result = await action(data);

		if (!result.success) {
			form.setError("root", {
				message: result.message,
			});
			return;
		}

		// success
		if (mode === "create") {
			form.reset();
		}

		router.refresh();
		toast.success(result.data.message);
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<div className="grid gap-6 md:grid-cols-2">
				{/* Company */}
				<Controller
					name="company"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Company
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="SOFTBD LTD"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Position */}
				<Controller
					name="position"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Position
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Junior Software Engineer"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Location */}
				<Controller
					name="location"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Location
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Dhaka, Bangladesh"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Employment Type */}
				<Controller
					name="type"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Employment Type
							</FieldLabel>
							<select
								{...field}
								id={field.name}
								className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
							>
								{EMPLOYMENT_TYPES.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			{/* Duration & Dates */}
			<div className="grid gap-6 md:grid-cols-3">
				<Controller
					name="durationLabel"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Duration label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="July 2024 - Current"
							/>
							<FieldDescription className="text-sm text-gray-400">
								Display-only label for the timeline.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="startLabel"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								Start label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="July 2024"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="endLabel"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-300/90 -mb-1"
								htmlFor={field.name}
							>
								End label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Current"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			{/* Description */}
			<Controller
				name="description"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-4" data-invalid={fieldState.invalid}>
						<FieldLabel
							className="text-lg text-gray-300/90 -mb-1"
							htmlFor={field.name}
						>
							Role description
						</FieldLabel>
						<Textarea
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder="Describe your responsibilities and impact."
							rows={4}
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			{/* Current status & sort order */}
			<div className="grid gap-6 md:grid-cols-2">
				<Controller
					name="isCurrent"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
							<FieldLabel className="text-lg text-gray-300/90 -mb-1">
								Current role
							</FieldLabel>
							<div className="flex items-center gap-3 mt-2">
								<input
									id="isCurrent"
									type="checkbox"
									checked={field.value}
									onChange={(event) => field.onChange(event.target.checked)}
									className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-emerald-500 focus:ring-emerald-500"
								/>
								<label htmlFor="isCurrent" className="text-sm text-gray-300">
									Mark as current position
								</label>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="sortOrder"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field className="mb-4" data-invalid={fieldState.invalid}>
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
								type="number"
								min={0}
							/>
							<FieldDescription className="text-sm text-gray-400">
								Lower numbers appear first on the public timeline.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			{/* Achievements */}
			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-100">
						Key achievements
					</h3>
					<Button
						type="button"
						variant="secondary"
						size="sm"
						onClick={() => achievementsArray.append("")}
					>
						Add achievement
					</Button>
				</div>
				<p className="text-sm text-gray-400">
					Each achievement is rendered as a separate bullet in the public
					section. You can add as many as you need.
				</p>

				<div className="space-y-4">
					{achievementsArray.fields.map((fieldItem, index) => (
						<Controller
							// eslint-disable-next-line react/no-array-index-key
							key={fieldItem.id}
							name={`achievements.${index}`}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<div className="flex items-start gap-3">
										<div className="flex-1">
											<FieldLabel
												className="text-sm text-gray-300/90 mb-1"
												htmlFor={field.name}
											>
												Achievement {index + 1}
											</FieldLabel>
											<Textarea
												{...field}
												id={field.name}
												aria-invalid={fieldState.invalid}
												rows={2}
												placeholder="Describe a concrete result or highlight."
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</div>
										{achievementsArray.fields.length > 1 && (
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="mt-6 text-gray-500 hover:text-red-500"
												onClick={() => achievementsArray.remove(index)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										)}
									</div>
								</Field>
							)}
						/>
					))}
				</div>
			</section>

			{/* Technologies */}
			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-100">Technologies</h3>
					<Button
						type="button"
						variant="secondary"
						size="sm"
						onClick={() =>
							technologiesArray.append({
								label: "",
								icon: undefined,
								existingIconUrl: undefined,
							})
						}
					>
						Add technology
					</Button>
				</div>
				<p className="text-sm text-gray-400">
					Each technology can optionally have an icon upload. Icons are stored
					in Vercel Blob and referenced by URL in the database.
				</p>

				<div className="space-y-4">
					{technologiesArray.fields.map((fieldItem, index) => (
						<div
							// eslint-disable-next-line react/no-array-index-key
							key={fieldItem.id}
							className="rounded-2xl border border-white/5 bg-gray-900/60 p-4 space-y-3"
						>
							<div className="flex items-start gap-3">
								<div className="flex-1 space-y-2">
									<Controller
										name={`technologies.${index}.label`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel
													className="text-sm text-gray-300/90 mb-1"
													htmlFor={field.name}
												>
													Technology label
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													aria-invalid={fieldState.invalid}
													placeholder="React"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
									<Controller
										name={`technologies.${index}.icon`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel
													className="text-sm text-gray-300/90 mb-1"
													htmlFor={field.name}
												>
													Icon (optional)
												</FieldLabel>
												<Input
													id={field.name}
													aria-invalid={fieldState.invalid}
													type="file"
													accept="image/*,image/svg+xml"
													onChange={(event) =>
														field.onChange(event.target.files?.[0])
													}
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
									{form.watch(`technologies.${index}.existingIconUrl`) && (
										<p className="text-xs text-gray-500">
											Existing icon will be kept unless a new file is uploaded.
										</p>
									)}
								</div>
								{technologiesArray.fields.length > 1 && (
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="mt-6 text-gray-500 hover:text-red-500"
										onClick={() => technologiesArray.remove(index)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Root-level error and submit button */}
			<div className="grid grid-cols-3 items-center w-full">
				<div className="flex justify-start">
					{form.formState.errors.root && (
						<div className="max-w-md">
							<Field className="text-red-600" data-invalid>
								<FieldError errors={[form.formState.errors.root]} />
							</Field>
						</div>
					)}
				</div>

				<div className="flex justify-center">
					<Button
						variant="oldButtonPrimary"
						size="lg"
						type="submit"
						disabled={!isDirty || isSubmitting}
					>
						{isSubmitting
							? mode === "create"
								? "Creating..."
								: "Updating..."
							: mode === "create"
								? "Create work experience"
								: "Update work experience"}
					</Button>
				</div>

				<div />
			</div>
		</form>
	);
}

export function WorkExperienceForm() {
	return <BaseWorkExperienceForm mode="create" />;
}

interface WorkExperienceEditFormProps {
	experience: WorkExperienceDTO | undefined;
}

export function WorkExperienceEditForm({
	experience,
}: WorkExperienceEditFormProps) {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	if (!experience) return null;

	async function handleDelete() {
		setIsDeleting(true);
		const result = await deleteWorkExperience(experience.id);
		setIsDeleting(false);

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		toast.success(result.data.message);
		router.refresh();
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-semibold text-emerald-300/90">
					Edit work experience
				</h2>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="oldButtonDestructive"
							size="lg"
							className="px-6 py-3 rounded-xl text-sm"
							type="button"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete this work experience?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. The entry will be removed from
								your admin data and no longer be available once the public
								sections start reading from the database.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
								{isDeleting ? "Deleting..." : "Yes, delete"}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<BaseWorkExperienceForm mode="edit" initialData={experience} />
		</div>
	);
}
