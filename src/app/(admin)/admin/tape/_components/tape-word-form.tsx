"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { upsertTapeWords } from "@/actions/tape-word-actions";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	type TapeWordsFormInput,
	TapeWordsFormSchema,
} from "@/schema/tape-word-schema";
import type { TapeWordEntry } from "@/types/tape-word";

interface TapeWordFormProps {
	items: TapeWordEntry[];
}

function buildDefaults(items: TapeWordEntry[]): TapeWordsFormInput {
	if (!items.length) {
		return {
			items: [
				{
					id: undefined,
					value: "",
					sortOrder: "0",
				},
			],
		};
	}

	return {
		items: items.map((item) => ({
			id: item.id,
			value: item.value,
			sortOrder: String(item.sortOrder ?? 0),
		})),
	};
}

export default function TapeWordForm({ items }: TapeWordFormProps) {
	const router = useRouter();

	const form = useForm<TapeWordsFormInput>({
		mode: "onBlur",
		resolver: zodResolver(TapeWordsFormSchema),
		defaultValues: buildDefaults(items),
	});

	const fieldArray = useFieldArray<TapeWordsFormInput, "items", "id">({
		name: "items",
		control: form.control,
	});

	useEffect(() => {
		if (fieldArray.fields.length === 0) {
			fieldArray.append({
				id: undefined,
				value: "",
				sortOrder: "0",
			});
		}
	}, [fieldArray, fieldArray.append, fieldArray.fields.length]);

	function handleAddTapeWord() {
		const currentItems = form.getValues("items") ?? [];
		const maxSort = currentItems.reduce((max, item) => {
			const value = Number.parseInt(item.sortOrder, 10);
			if (Number.isNaN(value)) return max;
			return value > max ? value : max;
		}, 0);

		fieldArray.append({
			id: undefined,
			value: "",
			sortOrder: String(maxSort + 1),
		});
	}

	async function onSubmit(data: TapeWordsFormInput) {
		const result = await upsertTapeWords(data);

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
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-white">Tape words</h3>
						<p className="text-sm text-gray-400 max-w-2xl">
							These words power the scrolling tape in your hero section. Keep
							them short, impactful, and brand-aligned.
						</p>
					</div>
					<Button
						type="button"
						variant="oldButtonSecondary"
						size="sm"
						className="gap-2"
						onClick={handleAddTapeWord}
					>
						<Plus className="h-4 w-4" />
						Add tape word
					</Button>
				</div>

				<div className="space-y-4">
					{fieldArray.fields.map((fieldItem, index) => (
						<div
							key={fieldItem.id}
							className="rounded-2xl border border-white/5 bg-gray-900/60 p-4 space-y-4"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1 grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
									<Controller
										name={`items.${index}.value`}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel
													className="text-sm text-gray-300"
													htmlFor={field.name}
												>
													Value
												</FieldLabel>
												<Input
													{...field}
													id={field.name}
													placeholder="PERFORMANT"
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
					variant="ghost"
					type="button"
					disabled={isSubmitting || !isDirty}
					onClick={() => form.reset(buildDefaults(items))}
				>
					Reset
				</Button>
				<Button type="submit" disabled={isSubmitting || !isDirty}>
					{isSubmitting ? "Saving..." : "Save tape words"}
				</Button>
			</div>
		</form>
	);
}
