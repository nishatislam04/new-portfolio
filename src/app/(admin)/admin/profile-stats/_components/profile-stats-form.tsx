"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createProfileStats } from "@/actions/profile-stats-actions";
import FormInput from "@/components/form/form-input";
import FormResetButton from "@/components/form/form-reset-button";
import FormSubmitButton from "@/components/form/form-submit-button";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import {
	type ProfileStatsFormInput,
	ProfileStatsFormSchema,
} from "@/schema/profile-stats-schema";

interface ProfileStatsFormProps {
	stats: {
		id: string;
		experienceLabel: string | null;
		projectsCompletedLabel: string | null;
		technologiesLabel: string | null;
		clientSatisfactionLabel: string | null;
	};
}

export default function ProfileStatsForm({ stats }: ProfileStatsFormProps) {
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

	async function onSubmit(data: z.infer<typeof ProfileStatsFormSchema>) {
		const result = await createProfileStats(data);

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

		form.reset();
		toast.success(result.data.message);
		router.refresh();
	}

	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<Controller
				name="experienceLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Experience label"
						description="Displayed years of experience (e.g. &quot;1+&quot;, &quot;3+ years&quot;)."
						className="mb-6"
						inputProps={{ placeholder: "1+" }}
						errorClassName="text-red-500 -mt-1"
					/>
				)}
			/>

			<Controller
				name="projectsCompletedLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Projects completed label"
						description="Total shipped projects (e.g. &quot;10+&quot;, &quot;25 completed&quot;)."
						className="mb-6"
						inputProps={{ placeholder: "10+" }}
					/>
				)}
			/>

			<Controller
				name="technologiesLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Technologies label"
						description="Total technologies used (e.g. &quot;50+&quot;, &quot;30 tools&quot;)."
						className="mb-6"
						inputProps={{ placeholder: "50+" }}
					/>
				)}
			/>

			<Controller
				name="clientSatisfactionLabel"
				control={form.control}
				render={({ field, fieldState }) => (
					<FormInput
						field={field}
						fieldState={fieldState}
						label="Client satisfaction label"
						description="Perceived satisfaction metric (e.g. &quot;100%&quot;, &quot;5.0 rating&quot;)."
						className="mb-6"
						inputProps={{ placeholder: "100%" }}
					/>
				)}
			/>

			{form.formState.errors.root && (
				<p className="text-sm text-red-500">
					{form.formState.errors.root.message}
				</p>
			)}

			<div className="flex justify-end items-center gap-3 pt-4">
				<FormResetButton
					isSubmitting={isSubmitting}
					isDirty={isDirty}
					handler={() => form.reset()}
				/>
				<FormSubmitButton isSubmitting={isSubmitting} isDirty={isDirty} />
			</div>
		</form>
	);
}
