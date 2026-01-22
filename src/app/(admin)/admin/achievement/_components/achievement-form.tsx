"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { upsertAchievements } from "@/actions/achievement-actions";
import FormInput from "@/components/form/form-input";
import FormResetButton from "@/components/form/form-reset-button";
import FormServerError from "@/components/form/form-server-error";
import FormSubmitButton from "@/components/form/form-submit-button";
import { Button } from "@/components/ui/button";
import {
	type AchievementsFormInput,
	AchievementsFormSchema,
} from "@/schema/achievement-schema";
import type { AchievementEntry } from "@/types/achievement";

interface AchievementFormProps {
	items: AchievementEntry[];
}

function buildDefaults(items: AchievementEntry[]): AchievementsFormInput {
	if (!items.length) {
		return {
			items: [
				{
					id: undefined,
					number: "",
					text: "",
					sortOrder: "0",
				},
			],
		};
	}

	return {
		items: items.map((item) => ({
			id: item.id,
			number: item.number,
			text: item.text,
			sortOrder: String(item.sortOrder ?? 0),
		})),
	};
}

export default function AchievementForm({ items }: AchievementFormProps) {
	const router = useRouter();

	const form = useForm<AchievementsFormInput>({
		mode: "onBlur",
		resolver: zodResolver(AchievementsFormSchema),
		defaultValues: buildDefaults(items),
	});

	const fieldArray = useFieldArray({
		name: "items",
		control: form.control,
	});

	function handleAddAchievement() {
		const currentItems = form.getValues("items") ?? [];
		const maxSort = currentItems.reduce((max, item) => {
			const value = Number.parseInt(item.sortOrder, 10);
			if (Number.isNaN(value)) return max;
			return value > max ? value : max;
		}, 0);

		fieldArray.append({
			id: undefined,
			number: "",
			text: "",
			sortOrder: String(maxSort + 1),
		});
	}

	async function onSubmit(data: AchievementsFormInput) {
		const result = await upsertAchievements(data);

		if (!result.success) {
			if (result.type === "validation") {
				form.setError("root", {
					message: result.message,
				});
			}

			if (result.type === "server-error") {
				form.setError("root", {
					message: result.message,
				});
			}

			return;
		}

		toast.success(result.data.message);
		router.refresh();
	}

	const isSubmitting = form.formState.isSubmitting;
	const isDirty = form.formState.isDirty;

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
			<section className="space-y-4">
				<div className="flex items-center justify-end">
					<Button
						type="button"
						variant="secondary"
						size="sm"
						className="gap-2"
						onClick={handleAddAchievement}
					>
						<Plus className="h-4 w-4" />
						Add achievement
					</Button>
				</div>

				<div className="space-y-4">
					{fieldArray.fields.map((fieldItem, index) => (
						<div
							key={fieldItem.id}
							className="rounded-2xl border border-white/5 bg-gray-900/60 p-4 space-y-4"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1 grid gap-4 md:grid-cols-3">
									<Controller
										name={`items.${index}.number`}
										control={form.control}
										render={({ field, fieldState }) => (
											<FormInput
												field={field}
												fieldState={fieldState}
												label="Number"
												inputProps={{ placeholder: "1+" }}
											/>
										)}
									/>

									<Controller
										name={`items.${index}.text`}
										control={form.control}
										render={({ field, fieldState }) => (
											<FormInput
												field={field}
												fieldState={fieldState}
												label="Achievment Information"
												inputProps={{ placeholder: "years of experience" }}
											/>
										)}
									/>

									<Controller
										name={`items.${index}.sortOrder`}
										control={form.control}
										render={({ field, fieldState }) => (
											<FormInput
												field={field}
												fieldState={fieldState}
												label="Sort Order"
												inputProps={{ placeholder: "Enter sort order number" }}
											/>
										)}
									/>
								</div>

								{fieldArray.fields.length > 1 && (
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="mt-2 text-gray-500 hover:text-red-500"
										onClick={() => fieldArray.remove(index)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			<FormServerError form={form} />

			<div className="flex justify-end gap-3 pt-4">
				<FormResetButton isSubmitting={isSubmitting} isDirty={isDirty} />
				<FormSubmitButton isSubmitting={isSubmitting} isDirty={isDirty} />
			</div>
		</form>
	);
}
