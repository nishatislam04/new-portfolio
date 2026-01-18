import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function AlertEmailCheck({
	onOpenChange,
}: {
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					type="button"
					className="text-sm text-emerald-400 hover:text-emerald-300 underline -ml-4 mt-2"
				>
					click here to get the password
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl font-semibold text-white">
						Alert
					</AlertDialogTitle>
					<AlertDialogDescription className="text-gray-300">
						this resource deleting password will be sent to your email box.
						Alease check
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="p-6 flex items-center justify-end">
					<AlertDialogAction
						onClick={() => onOpenChange(false)}
						className="bg-gray-600 cursor-pointer"
					>
						OK
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
