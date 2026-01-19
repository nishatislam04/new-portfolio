"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createEducation } from "@/actions/education-actions";
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

const DEFAULT_VALUES: EducationFormInput = {
	institution: "",
	degree: "",
	durationLabel: "",
	startDate: "",
	endDate: "",
	gpa: "",
	description: "",
	sortOrder: "0",
	highlights: [{ value: "" }],
};

export default function EducationCreateForm() {
	const router = useRouter();

	const form = useForm<EducationFormInput>({
		mode: "onBlur",
		resolver: zodResolver(EducationFormSchema),
		defaultValues: DEFAULT_VALUES,
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
		const result = await createEducation(data);

		if (!result.success) {
			form.setError("root", { message: result.message });
			return;
		}

		form.reset(DEFAULT_VALUES);
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
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-200"
								htmlFor={field.name}
							>
								Institution name
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								autoComplete="off"
								placeholder="Feni Computer Institute"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="degree"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-200"
								htmlFor={field.name}
							>
								Degree title
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								autoComplete="off"
								placeholder="Diploma in Computer Science"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<Controller
					name="durationLabel"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-200"
								htmlFor={field.name}
							>
								Duration label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								placeholder="2021 - 2024"
								autoComplete="off"
							/>
							<FieldDescription className="text-sm text-gray-400">
								Displayed badge text on the public timeline.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="startDate"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-200"
								htmlFor={field.name}
							>
								Start date label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								placeholder="January 2021"
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="endDate"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-200"
								htmlFor={field.name}
							>
								End date label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								placeholder="June 2024 or Current"
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Controller
					name="gpa"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-200"
								htmlFor={field.name}
							>
								GPA label
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								placeholder="3.72/4.0"
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="sortOrder"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="text-lg text-gray-200"
								htmlFor={field.name}
							>
								Sort order
							</FieldLabel>
							<Input {...field} id={field.name} autoComplete="off" />
							<FieldDescription className="text-sm text-gray-400">
								Lower numbers appear first in the public timeline.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<Controller
				name="description"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel className="text-lg text-gray-200" htmlFor={field.name}>
							Program description (optional)
						</FieldLabel>
						<Textarea
							{...field}
							id={field.name}
							rows={4}
							placeholder="Share context about the program or achievements."
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-white">Highlights</h3>
						<p className="text-sm text-gray-400">
							Bullet points rendered underneath the card. Add concrete wins or
							focus areas.
						</p>
					</div>
					<Button
						type="button"
						variant="oldButtonSecondary"
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
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel
													className="text-sm text-gray-300"
													htmlFor={field.name}
												>
													Highlight {index + 1}
												</FieldLabel>
												<Textarea
													{...field}
													id={field.name}
													rows={2}
													placeholder="Describe what you accomplished."
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
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
				<div className="text-red-500">
					{form.formState.errors.root && (
						<Field data-invalid>
							<FieldError errors={[form.formState.errors.root]} />
						</Field>
					)}
				</div>
				<div className="flex justify-center">
					<Button
						variant="oldButtonPrimary"
						size="lg"
						type="submit"
						disabled={!isDirty || isSubmitting}
					>
						{isSubmitting ? "Saving..." : "Save education"}
					</Button>
				</div>
				<div />
			</div>
		</form>
	);
}
