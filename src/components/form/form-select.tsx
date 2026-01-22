"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { FormSelectProps } from "@/types/form";

export default function FormSelect({
	field,
	fieldState,
	label,
	options,
	selectPlaceholder,
	className,
	errorClassName,
}: FormSelectProps) {
	return (
		<Field className={className} data-invalid={fieldState.invalid}>
			<FieldLabel
				className="text-lg text-gray-300/90 -mb-1"
				htmlFor={field.name}
			>
				{label}
			</FieldLabel>
			<Select
				name={field.name}
				value={(field.value as string | undefined) ?? ""}
				onValueChange={field.onChange as (value: string) => void}
			>
				<SelectTrigger id={field.name} aria-invalid={fieldState.invalid}>
					<SelectValue placeholder={selectPlaceholder} />
				</SelectTrigger>
				<SelectContent position="item-aligned">
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{fieldState.invalid && fieldState.error && (
				<FieldError
					className={errorClassName}
					errors={[fieldState.error]}
				/>
			)}
		</Field>
	);
}
