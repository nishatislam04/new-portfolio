"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProfileStats } from "@/actions/profile-stats-actions";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	ProfileStatsFormSchema,
	type ProfileStatsFormInput,
} from "@/schema/profile-stats-schema";

interface ProfileStatsEditFormProps {
	stats: {
		id: string;
		experienceLabel: string | null;
		projectsCompletedLabel: string | null;
		technologiesLabel: string | null;
		clientSatisfactionLabel: string | null;
	};
}

export default function ProfileStatsEditForm({
	stats,
}: ProfileStatsEditFormProps) {
	const router = useRouter();
	const form = useForm<ProfileStatsFormInput>({
		mode: "onBlur",
		defaultValues: {
			experienceLabel: stats.experienceLabel ?? "",
			projectsCompletedLabel: stats.projectsCompletedLabel ?? "",
			technologiesLabel: stats.technologiesLabel ?? "",
			clientSatisfactionLabel: stats.clientSatisfactionLabel ?? "",
		},
		resolver: zodResolver(ProfileStatsFormSchema),
	});

	async function onSubmit(formValues: ProfileStatsFormInput) {
		const result = await updateProfileStats(stats.id, formValues);

		if (!result.success) {
			if (result.type === "validation") {
				Object.entries(result.fieldErrors).forEach(([field, messages]) => {
					form.setError(field as keyof ProfileStatsFormInput, {
						message: messages.join(", "),
					});
				});
			}

			if (result.type === "server-error") {
				form.setError("root", {
					message: result.message,
				});
			}

			return;
		}

		router.refresh();
		toast.success(result.data.message);
	}

	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<Controller
				name="experienceLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-6" data-invalid={fieldState.invalid}>
						<FieldLabel
							className="text-lg text-gray-300/90 -mb-1"
							htmlFor={field.name}
						>
							Experience label
						</FieldLabel>
						<FieldDescription className="text-sm text-gray-400">
							Displayed years of experience (e.g. "1+", "3+ years").
						</FieldDescription>
						<Input
							{...field}
							id={field.name}
							placeholder="1+"
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

			<Controller
				name="projectsCompletedLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-6" data-invalid={fieldState.invalid}>
						<FieldLabel
							className="text-lg text-gray-300/90 -mb-1"
							htmlFor={field.name}
						>
							Projects completed label
						</FieldLabel>
						<FieldDescription className="text-sm text-gray-400">
							Total shipped projects (e.g. "10+", "25 completed").
						</FieldDescription>
						<Input
							{...field}
							id={field.name}
							placeholder="10+"
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

			<Controller
				name="technologiesLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-6" data-invalid={fieldState.invalid}>
						<FieldLabel
							className="text-lg text-gray-300/90 -mb-1"
							htmlFor={field.name}
						>
							Technologies label
						</FieldLabel>
						<FieldDescription className="text-sm text-gray-400">
							Total technologies used (e.g. "50+", "30 tools").
						</FieldDescription>
						<Input
							{...field}
							id={field.name}
							placeholder="50+"
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

			<Controller
				name="clientSatisfactionLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field className="mb-6" data-invalid={fieldState.invalid}>
						<FieldLabel
							className="text-lg text-gray-300/90 -mb-1"
							htmlFor={field.name}
						>
							Client satisfaction label
						</FieldLabel>
						<FieldDescription className="text-sm text-gray-400">
							Perceived satisfaction metric (e.g. "100%", "5.0 rating").
						</FieldDescription>
						<Input
							{...field}
							id={field.name}
							placeholder="100%"
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

			{form.formState.errors.root && (
				<p className="text-sm text-red-500">
					{form.formState.errors.root.message}
				</p>
			)}

			<div className="flex justify-end gap-3 pt-4">
				<Button
					variant="ghost"
					type="button"
					disabled={isSubmitting || !isDirty}
					onClick={() => form.reset()}
				>
					Reset
				</Button>
				<Button type="submit" disabled={isSubmitting || !isDirty}>
					Update stats
				</Button>
			</div>
		</form>
	);
}
