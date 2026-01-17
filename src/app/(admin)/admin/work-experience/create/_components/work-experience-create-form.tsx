"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createWorkExperience } from "@/actions/work-experience-actions";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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

/**
 * Build the initial empty state for creating a new work experience.
 *
 * This keeps all default values in one place so they are easy to
 * adjust later without hunting through the component.
 */
function buildCreateDefaults(): WorkExperienceFormInput {
	return {
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
	};
}

/**
 * WorkExperienceCreateForm
 *
 * Standalone form component responsible only for creating a new
 * work experience entry. It owns its own React Hook Form instance
 * and talks directly to the `createWorkExperience` server action.
 */
export function WorkExperienceCreateForm() {
	const router = useRouter();

	const form = useForm<WorkExperienceFormInput>({
		mode: "onBlur",
		resolver: zodResolver(WorkExperienceFormSchema),
		defaultValues: buildCreateDefaults(),
	});

	const achievementsArray = useFieldArray({
		name: "achievements",
		// Casting is safe because the field name matches the schema.
		control: form.control as any,
	});

	const technologiesArray = useFieldArray({
		name: "technologies",
		control: form.control as any,
	});

	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	// Ensure there is always at least one achievement row so the UI
	// never renders an empty list the user cannot interact with.
	useEffect(() => {
		if (achievementsArray.fields.length === 0) {
			(achievementsArray as any).append("");
		}
	}, [achievementsArray, achievementsArray.fields.length]);

	async function onSubmit(data: WorkExperienceFormInput) {
		const result = await createWorkExperience(data);

		if (!result.success) {
			form.setError("root", {
				message: result.message,
			});
			return;
		}

		form.reset();
		router.push("/admin/work-experience");
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
								autoComplete="off"
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
								autoComplete="off"
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
								autoComplete="off"
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
							<Select
								name={field.name}
								value={field.value || "full-time"}
								onValueChange={field.onChange}
							>
								<SelectTrigger
									id={field.name}
									aria-invalid={fieldState.invalid}
								>
									<SelectValue placeholder="Select employment type" />
								</SelectTrigger>
								<SelectContent position="item-aligned">
									{EMPLOYMENT_TYPES.map((type) => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
								autoComplete="off"
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
								autoComplete="off"
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
								autoComplete="off"
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
							autoComplete="off"
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
									autoComplete="off"
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
								autoComplete="off"
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
						variant="oldButtonSecondary"
						size="sm"
						onClick={() => (achievementsArray as any).append("")}
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
												autoComplete="off"
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
						variant="oldButtonSecondary"
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
													autoComplete="off"
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
						{isSubmitting ? "Creating..." : "Create work experience"}
					</Button>
				</div>

				<div />
			</div>
		</form>
	);
}
