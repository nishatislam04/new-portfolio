"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { FormFileInputProps } from "@/types/form";

export default function FormFileInput({
	field,
	fieldState,
	label,
	description,
	className,
	inputProps,
	errorClassName = "text-red-500 -mt-1",
	labelClassName = "text-sm text-gray-300",
	descriptionClassName,
}: FormFileInputProps) {
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
				type="file"
				name={field.name}
				onChange={(event) => {
					const file = event.target.files?.[0];
					field.onChange(file);
				}}
				onBlur={field.onBlur}
			/>
			{fieldState.invalid && fieldState.error && (
				<FieldError className={errorClassName} errors={[fieldState.error]} />
			)}
		</Field>
	);
}
