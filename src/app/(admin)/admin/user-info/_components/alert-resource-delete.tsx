import { Trash2 } from "lucide-react";
import { useState } from "react";
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
import DeleteResourceDialog from "./delete-resource-dialog";

export default function AlertResourceDelete({
	user,
}: {
	user: {
		id: string;
	};
}) {
	// this is the password input dialog state
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	return (
		<>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button type="button" variant="oldButtonDestructive" size="lg">
						<Trash2 />
						Delete Me
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete this resource?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => setShowDeleteDialog(true)}
							className="bg-green-600"
						>
							Yes, Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* resource delete dialog */}
			<DeleteResourceDialog
				user={user}
				open={showDeleteDialog}
				onOpenChange={(open) => {
					if (!open) {
						setShowDeleteDialog(false);
					}
				}}
			/>
		</>
	);
}
