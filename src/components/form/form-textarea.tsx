"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { FormTextareaProps } from "@/types/form";

export default function FormTextArea({
	field,
	fieldState,
	label,
	description,
	className,
	textareaProps,
	errorClassName = "text-red-500 -mt-1",
	labelClassName = "text-lg text-gray-300/90 -mb-1",
	descriptionClassName,
}: FormTextareaProps) {
	return (
		<Field className={className} data-invalid={fieldState.invalid}>
			<FieldLabel
				className={labelClassName ?? "text-lg text-gray-300/90 -mb-1"}
				htmlFor={field.name}
			>
				{label}
			</FieldLabel>
			{description ? (
				<FieldDescription
					className={descriptionClassName ?? "text-sm text-gray-400"}
				>
					{description}
				</FieldDescription>
			) : null}
			<Textarea
				{...textareaProps}
				id={field.name}
				aria-invalid={fieldState.invalid}
				value={field.value as string | number | readonly string[] | undefined}
				onChange={field.onChange}
				onBlur={field.onBlur}
				name={field.name}
			/>
			{fieldState.invalid && fieldState.error && (
				<FieldError
					className={errorClassName ?? "text-red-500 -mt-1"}
					errors={[fieldState.error]}
				/>
			)}
		</Field>
	);
}
