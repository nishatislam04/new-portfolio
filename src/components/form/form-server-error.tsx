import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Field, FieldError } from "../ui/field";

interface FormServerErrorProps<T extends FieldValues = FieldValues> {
	form: UseFormReturn<T>;
}

export default function FormServerError<T extends FieldValues = FieldValues>({
	form,
}: FormServerErrorProps<T>) {
	return (
		form.formState.errors.root && (
			<Field className="text-sm text-red-500" data-invalid>
				<FieldError errors={[form.formState.errors.root]} />
			</Field>
		)
	);
}
