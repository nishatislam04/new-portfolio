"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { FormInputProps } from "@/types/form";

export default function FormInput({
	field,
	fieldState,
	label,
	description,
	className,
	inputProps,
	errorClassName = "text-red-500 -mt-1",
	labelClassName = "text-sm text-gray-300",
	descriptionClassName = "text-sm text-gray-400",
}: FormInputProps) {
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
			<Input
				{...inputProps}
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
