"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { FormCheckboxProps } from "@/types/form";

export default function FormCheckbox({
	field,
	fieldState,
	label,
	checkboxLabel,
	className,
	errorClassName,
}: FormCheckboxProps) {
	return (
		<Field className={className} data-invalid={fieldState.invalid}>
			<FieldLabel className="text-lg text-gray-300/90 -mb-1">
				{label}
			</FieldLabel>
			<div className="flex items-center gap-3 mt-2">
				<Checkbox
					id={field.name}
					checked={Boolean(field.value)}
					onCheckedChange={field.onChange}
				/>
				{checkboxLabel ? (
					<label htmlFor={field.name} className="text-sm text-gray-300">
						{checkboxLabel}
					</label>
				) : null}
			</div>
			{fieldState.invalid && fieldState.error && (
				<FieldError
					className={errorClassName}
					errors={[fieldState.error]}
				/>
			)}
		</Field>
	);
}
