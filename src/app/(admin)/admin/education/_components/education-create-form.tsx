"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
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
	highlights: [""],
};

export default function EducationCreateForm() {
	const router = useRouter();

	const form = useForm<EducationFormInput>({
		mode: "onBlur",
		resolver: zodResolver(EducationFormSchema),
		defaultValues: DEFAULT_VALUES,
	});

	const highlights = form.watch("highlights");
	const highlightKeysRef = useRef<string[]>([]);

	const generateKey = useCallback(() => {
		if (
			typeof crypto !== "undefined" &&
			typeof crypto.randomUUID === "function"
		) {
			return crypto.randomUUID();
		}
		return Math.random().toString(36).slice(2);
	}, []);

	useEffect(() => {
		if (!highlights || highlights.length === 0) {
			form.setValue("highlights", [""], { shouldDirty: true });
			highlightKeysRef.current = [generateKey()];
			return;
		}

		const desiredLength = highlights.length;
		let keys = highlightKeysRef.current;
		if (keys.length < desiredLength) {
			keys = [
				...keys,
				...Array.from({ length: desiredLength - keys.length }, () =>
					generateKey(),
				),
			];
		} else if (keys.length > desiredLength) {
			keys = keys.slice(0, desiredLength);
		}
		highlightKeysRef.current = keys;
	}, [generateKey, highlights, form]);

	function addHighlight() {
		const next = [...(highlights ?? []), ""];
		form.setValue("highlights", next, { shouldDirty: true });
		highlightKeysRef.current = [...highlightKeysRef.current, generateKey()];
	}

	function removeHighlight(index: number) {
		if (!highlights) return;
		const next = highlights.filter((_, idx) => idx !== index);
		form.setValue("highlights", next.length > 0 ? next : [""], {
			shouldDirty: true,
		});
		const nextKeys = highlightKeysRef.current.filter((_, idx) => idx !== index);
		highlightKeysRef.current = nextKeys.length > 0 ? nextKeys : [generateKey()];
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
					{(highlights ?? []).map((_, index) => (
						<div
							key={highlightKeysRef.current[index] ?? `highlight-${index}`}
							className="rounded-2xl border border-white/5 p-4"
						>
							<div className="flex items-start gap-3">
								<div className="flex-1">
									<Controller
										name={`highlights.${index}` as const}
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
								{(highlights?.length ?? 0) > 1 && (
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
