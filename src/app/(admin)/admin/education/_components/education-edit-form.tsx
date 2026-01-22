"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateEducation } from "@/actions/education-actions";
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
import {
	type EducationFormInput,
	EducationFormSchema,
} from "@/schema/education-schema";
import type { EducationEntry } from "@/types/education";

interface EducationEditFormProps {
	education: EducationEntry;
}

export default function EducationEditForm({
	education,
}: EducationEditFormProps) {
	const router = useRouter();

	const form = useForm<EducationFormInput>({
		mode: "onBlur",
		resolver: zodResolver(EducationFormSchema),
		defaultValues: {
			institution: education.institution ?? "",
			degree: education.degree ?? "",
			durationLabel: education.durationLabel ?? "",
			startDate: education.startDate ?? "",
			endDate: education.endDate ?? "",
			gpa: education.gpa ?? "",
			description: education.description ?? "",
			sortOrder: education.sortOrder.toString(),
			highlights:
				education.highlights.length > 0
					? education.highlights
					: [{ value: "" }],
		},
	});

	const highlightArray = useFieldArray({
		name: "highlights",
		control: form.control,
	});

	function addHighlight() {
		highlightArray.append({ value: "" });
	}

	function removeHighlight(index: number) {
		if (highlightArray.fields.length <= 1) return;
		highlightArray.remove(index);
	}

	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	async function onSubmit(data: EducationFormInput) {
		const result = await updateEducation(education.id, data);

		if (!result.success) {
			form.setError("root", { message: result.message });
			return;
		}

		toast.success(result.data.message);
		router.refresh();
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<div className="grid gap-6 md:grid-cols-2">
				<Controller
					name="institution"
					control={form.control}
					render={({ field, fieldState }) => (
						<FormInput
							field={field}
							fieldState={fieldState}
							label="Institution name"
							inputProps={{
								placeholder: "Feni Computer Institute",
								autoComplete: "off",
							}}
						/>
					)}
				/>

				<Controller
					name="degree"
					control={form.control}
					render={({ field, fieldState }) => (
						<FormInput
							field={field}
							fieldState={fieldState}
							label="Degree title"
							inputProps={{
								placeholder: "Diploma in Computer Science",
								autoComplete: "off",
							}}
						/>
					)}
				/>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<Controller
					name="durationLabel"
					control={form.control}
					render={({ field, fieldState }) => (
						<FormInput
							field={field}
							fieldState={fieldState}
							label="Duration label"
							description="Displayed badge text on the public timeline."
							inputProps={{
								placeholder: "2021 - 2024",
								autoComplete: "off",
							}}
						/>
					)}
				/>

				<Controller
					name="startDate"
					control={form.control}
					render={({ field, fieldState }) => (
						<FormInput
							field={field}
							fieldState={fieldState}
							label="Start date label"
							inputProps={{
								placeholder: "January 2021",
								autoComplete: "off",
							}}
						/>
					)}
				/>

				<Controller
					name="endDate"
					control={form.control}
					render={({ field, fieldState }) => (
						<FormInput
							field={field}
							fieldState={fieldState}
							label="End date label"
							inputProps={{
								placeholder: "June 2024 or Current",
								autoComplete: "off",
							}}
						/>
					)}
				/>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Controller
					name="gpa"
					control={form.control}
					render={({ field, fieldState }) => (
						<FormInput
							field={field}
							fieldState={fieldState}
							label="GPA label"
							inputProps={{
								placeholder: "3.72/4.0",
								autoComplete: "off",
							}}
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
							description="Lower numbers appear first in the public timeline."
							inputProps={{ autoComplete: "off" }}
						/>
					)}
				/>
			</div>

			<Controller
				name="description"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormTextArea
						field={field}
						fieldState={fieldState}
						label="Program description (optional)"
						textareaProps={{
							rows: 4,
							placeholder: "Share context about the program or achievements.",
						}}
					/>
				)}
			/>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-white">Highlights</h3>
						<p className="text-sm text-gray-400">
							Bullet points rendered underneath the card. Update concrete wins
							or focus areas.
						</p>
					</div>
					<Button
						type="button"
						variant="secondary"
						size="sm"
						className="gap-2"
						onClick={addHighlight}
					>
						<Plus className="h-4 w-4" />
						Add highlight
					</Button>
				</div>

				<div className="space-y-4">
					{highlightArray.fields.map((fieldItem, index) => (
						<div
							key={fieldItem.id}
							className="rounded-2xl border border-white/5 p-4"
						>
							<div className="flex items-start gap-3">
								<div className="flex-1">
									<Controller
										name={`highlights.${index}.value` as const}
										control={form.control}
										render={({ field, fieldState }) => (
											<FormTextArea
												field={field}
												fieldState={fieldState}
												label={`Highlight ${index + 1}`}
												textareaProps={{
													rows: 2,
													placeholder: "Describe what you accomplished.",
												}}
											/>
										)}
									/>
								</div>
								{highlightArray.fields.length > 1 && (
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="mt-6 text-gray-500 hover:text-red-500"
										onClick={() => removeHighlight(index)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			<div className="grid grid-cols-3 items-center">
				<FormServerError form={form} />
				<div className="flex justify-center">
					<FormSubmitButton isSubmitting={isSubmitting} isDirty={isDirty} />
				</div>
				<div />
			</div>
		</form>
	);
}
