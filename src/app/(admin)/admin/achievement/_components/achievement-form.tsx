"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { upsertAchievements } from "@/actions/achievement-actions";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel
													className="text-sm text-gray-300"
													htmlFor={field.name}
												>
													Number
												</FieldLabel>
												<Input {...field} id={field.name} placeholder="1+" />
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									<Controller
										name={`items.${index}.text`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel
													className="text-sm text-gray-300"
													htmlFor={field.name}
												>
													Achievment Information
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													placeholder="years of experience"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									<Controller
										name={`items.${index}.sortOrder`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel
													className="text-sm text-gray-300"
													htmlFor={field.name}
												>
													Sort order
												</FieldLabel>
												<Input {...field} id={field.name} inputMode="numeric" />
												<FieldDescription className="text-xs text-gray-400">
													Lower numbers appear first.
												</FieldDescription>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
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

			{form.formState.errors.root && (
				<p className="text-sm text-red-500">
					{form.formState.errors.root.message}
				</p>
			)}

			<div className="flex justify-end gap-3 pt-4">
				<Button
					variant="secondary"
					type="button"
					disabled={isSubmitting || !isDirty}
					onClick={() => form.reset(buildDefaults(items))}
				>
					Reset
				</Button>
				<Button type="submit" disabled={isSubmitting || !isDirty}>
					{isSubmitting ? "Saving..." : "Save achievements"}
				</Button>
			</div>
		</form>
	);
}
