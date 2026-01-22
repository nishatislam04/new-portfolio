import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { deleteUserInfo } from "@/actions/user-info-form-actions";
import FormInput from "@/components/form/form-input";
import FormSubmitButton from "@/components/form/form-submit-button";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UserInfoDeleteSchema } from "@/schema/user-info-form-schema";
import AlertEmailCheck from "./alert-email-check";

interface DeleteResourceDialogProps {
	children?: React.ReactNode;
	user: {
		id: string;
	};
	open?: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function DeleteResourceDialog({
	children,
	user,
	open,
	onOpenChange,
}: DeleteResourceDialogProps) {
	const form = useForm<z.infer<typeof UserInfoDeleteSchema>>({
		mode: "onBlur",
		resolver: zodResolver(UserInfoDeleteSchema),
		defaultValues: {
			id: user.id,
			password: "",
		},
	});

	async function onDeleteSubmit(data: z.infer<typeof UserInfoDeleteSchema>) {
		const result = await deleteUserInfo(data);
		if (!result.success) {
			if (result.type === "validation") {
				Object.entries(result.fieldErrors).forEach(([field, messages]) => {
					form.setError(field as Parameters<typeof form.setError>[0], {
						message: messages.join(", "),
					});
				});
			}
			if (result.type === "server-error") {
				toast.error(result.message);
			}
			return;
		}

		onOpenChange(false);
		form.reset();
		toast.success("This feature is not implemented yet");
	}
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-white">
						Please provide delete resource password below
					</DialogTitle>
					<DialogDescription className="text-gray-300">
						This action is permanent and cannot be undone.
						{/* alert dialog showing to check password in email */}
						<AlertEmailCheck onOpenChange={onOpenChange} />
					</DialogDescription>
				</DialogHeader>

				<form className="p-0 pt-4" onSubmit={form.handleSubmit(onDeleteSubmit)}>
					<Controller
						name="password"
						control={form.control}
						render={({ field, fieldState }) => (
							<FormInput
								field={field}
								fieldState={fieldState}
								label="Password"
								inputProps={{ placeholder: "Enter the delete password" }}
							/>
						)}
					/>
					<div className="flex items-center justify-end gap-3">
						<Button
							type="button"
							className="bg-gray-800 hover:bg-gray-700"
							onClick={() => onOpenChange?.(false)}
						>
							Cancel
						</Button>
						<FormSubmitButton
							isSubmitting={form.formState.isSubmitting}
							isDirty={form.formState.isDirty}
							label="delete"
							labelChange="deleting"
						/>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
