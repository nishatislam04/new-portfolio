import { Button } from "../ui/button";

export default function FormResetButton({
	isSubmitting,
	isDirty,
	handler,
}: {
	isSubmitting: boolean;
	isDirty: boolean;
	handler?: () => void;
}) {
	return (
		<Button
			variant="secondary"
			type="button"
			disabled={isSubmitting || !isDirty}
			onClick={handler}
		>
			Reset
		</Button>
	);
}
