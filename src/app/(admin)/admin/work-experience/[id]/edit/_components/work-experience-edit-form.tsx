"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	updateWorkExperience,
	type WorkExperienceDTO,
} from "@/actions/work-experience-actions";

import FormCheckbox from "@/components/form/form-checkbox";
import FormFileInput from "@/components/form/form-file-input";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormServerError from "@/components/form/form-server-error";
import FormSubmitButton from "@/components/form/form-submit-button";
import FormTextArea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import {
	type WorkExperienceFormInput,
	WorkExperienceFormSchema,
} from "@/schema/work-experience-schema";
import WorkExperienceDeleteAlert from "./work-experience-delete-alert";

const EMPLOYMENT_TYPES = [
	{ value: "full-time", label: "Full-time" },
	{ value: "part-time", label: "Part-time" },
	{ value: "contract", label: "Contract" },
	{ value: "internship", label: "Internship" },
	{ value: "volunteer", label: "Volunteer" },
];

function buildEditDefaults(
	experience: WorkExperienceDTO,
): WorkExperienceFormInput {
	return {
		company: experience.company,
		position: experience.position,
		location: experience.location,
		type: experience.type ?? "full-time",
		durationLabel: experience.durationLabel ?? "",
		startLabel: experience.startLabel ?? "",
		endLabel: experience.endLabel ?? "",
		description: experience.description ?? "",
		isCurrent: experience.isCurrent,
		sortOrder: String(experience.sortOrder ?? 0),
		achievements:
			experience.achievements.length > 0
				? experience.achievements
				: [{ value: "" }],
		technologies:
			experience.technologies.length > 0
				? experience.technologies.map((tech) => ({
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
	};
}

export interface WorkExperienceEditFormProps {
	experience: WorkExperienceDTO;
}

export function WorkExperienceEditForm({
	experience,
}: WorkExperienceEditFormProps) {
	const router = useRouter();

	const form = useForm<WorkExperienceFormInput>({
		mode: "onBlur",
		resolver: zodResolver(WorkExperienceFormSchema),
		defaultValues: buildEditDefaults(experience),
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
		const result = await updateWorkExperience(experience.id, data);

		if (!result.success) {
			form.setError("root", {
				message: result.message,
			});
			return;
		}

		router.push("/admin/work-experience");
		toast.success(result.data.message);
	}

	return (
		<div className="space-y-6">
			{/* Header with title and delete action */}
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-semibold text-emerald-300/90">
					Edit work experience
				</h2>

				<WorkExperienceDeleteAlert experienceId={experience.id} />
			</div>

			{/* Main edit form */}
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid gap-6 md:grid-cols-2">
					{/* Company */}
					<Controller
						name="company"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="Company"
								className="mb-4"
								inputProps={{ placeholder: "SOFTBD LTD" }}
							/>
						)}
					/>

					{/* Position */}
					<Controller
						name="position"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="Position"
								className="mb-4"
								inputProps={{ placeholder: "Junior Software Engineer" }}
							/>
						)}
					/>

					{/* Location */}
					<Controller
						name="location"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="Location"
								className="mb-4"
								inputProps={{ placeholder: "Dhaka, Bangladesh" }}
							/>
						)}
					/>

					{/* Employment Type */}
					<Controller
						name="type"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormSelect
								field={field}
								fieldState={fieldState}
								label="Employment Type"
								options={EMPLOYMENT_TYPES}
								selectPlaceholder="Select employment type"
								className="mb-4"
							/>
						)}
					/>
				</div>

				{/* Duration & Dates */}
				<div className="grid gap-6 md:grid-cols-3">
					<Controller
						name="durationLabel"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="Duration label"
								className="mb-4"
								inputProps={{ placeholder: "July 2024 - Current" }}
								description="Display-only label for the timeline."
							/>
						)}
					/>

					<Controller
						name="startLabel"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="Start label"
								className="mb-4"
								inputProps={{ placeholder: "July 2024" }}
							/>
						)}
					/>

					<Controller
						name="endLabel"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="End label"
								className="mb-4"
								inputProps={{ placeholder: "Current" }}
							/>
						)}
					/>
				</div>

				{/* Description */}
				<Controller
					name="description"
					control={form.control}
					render={({ field, fieldState }) => (
						<FormTextArea
							field={field}
							fieldState={fieldState}
							label="Role description"
							className="mb-4"
							textareaProps={{
								placeholder: "Describe your responsibilities and impact.",
								rows: 4,
							}}
						/>
					)}
				/>

				{/* Current status & sort order */}
				<div className="grid gap-6 md:grid-cols-2">
					<Controller
						name="isCurrent"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormCheckbox
								field={field}
								fieldState={fieldState}
								label="Current role"
								checkboxLabel="Mark as current position"
								className="mb-4"
							/>
						)}
					/>

					<Controller
						name="sortOrder"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="Sort order"
								className="mb-4"
								inputProps={{}}
								description="Lower numbers appear first on the public timeline."
							/>
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
							onClick={() => achievementsArray.append({ value: "" })}
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
								name={`achievements.${index}.value`}
								control={form.control}
								render={({ field, fieldState }) => (
									<div className="flex items-start gap-3">
										<div className="flex-1">
											<FormTextArea
												field={field}
												fieldState={fieldState}
												label={`Achievement ${index + 1}`}
												textareaProps={{
													rows: 2,
													placeholder:
														"Describe a concrete result or highlight.",
												}}
											/>
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
								)}
							/>
						))}
					</div>
				</section>

				{/* Technologies */}
				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-gray-100">
							Technologies
						</h3>
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
												<FormInput
													field={field}
													fieldState={fieldState}
													label="Technology label"
													inputProps={{ placeholder: "React" }}
												/>
											)}
										/>
										<Controller
											name={`technologies.${index}.icon`}
											control={form.control}
											render={({ field, fieldState }) => (
												<FormFileInput
													field={field}
													fieldState={fieldState}
													label="Icon (optional)"
													className="mb-2"
													inputProps={{ accept: "image/*,image/svg+xml" }}
												/>
											)}
										/>
										{form.watch(`technologies.${index}.existingIconUrl`) && (
											<p className="text-xs text-gray-500">
												Existing icon will be kept unless a new file is
												uploaded.
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
						<FormServerError form={form} />
					</div>

					<div className="flex justify-center">
						<FormSubmitButton
							isSubmitting={isSubmitting}
							isDirty={isDirty}
							label="Update work experience"
							labelChange="Updating..."
						/>
					</div>

					<div />
				</div>
			</form>
		</div>
	);
}
