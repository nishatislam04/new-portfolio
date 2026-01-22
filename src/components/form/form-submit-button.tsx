import { Button } from "../ui/button";

export default function FormSubmitButton({
	isSubmitting,
	isDirty,
	label = "save",
	labelChange = "Saving...",
}: {
	isSubmitting: boolean;
	isDirty: boolean;
	label?: string;
	labelChange?: string;
}) {
	return (
		<Button type="submit" disabled={isSubmitting || !isDirty}>
			{isSubmitting ? labelChange : label}
		</Button>
	);
}
