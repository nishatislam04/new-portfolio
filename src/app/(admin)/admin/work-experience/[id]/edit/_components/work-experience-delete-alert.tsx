import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteWorkExperience } from "@/actions/work-experience-actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function WorkExperienceDeleteAlert({
	experienceId,
}: {
	experienceId: string;
}) {
	const router = useRouter();
	const [_, startTransition] = useTransition();

	async function handleDelete() {
		startTransition(async () => {
			const result = await deleteWorkExperience(experienceId);

			if (!result.success) {
				toast.error(result.message);
				return;
			}

			toast.success(result.data.message);
			router.push("/admin/work-experience");
		});
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="oldButtonDestructive" size="lg" type="button">
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this work experience?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. The entry will be removed from your
						admin data and no longer be available once the public sections start
						reading from the database.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete} className="px-8">
						Yes
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
