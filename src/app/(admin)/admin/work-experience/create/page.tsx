import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import { WorkExperienceCreateForm } from "@/app/(admin)/admin/work-experience/create/_components/work-experience-create-form";

export default function CreateWorkExperiencePage() {
	return (
		<AdminPageShell
			title="Create Work Experience"
			description="Add a new work experience entry to your professional timeline."
		>
			<div className="space-y-8">
				<p className="text-sm text-gray-400 max-w-2xl">
					Create your first work experience entry. You can add achievements and
					technologies now, and support for multiple entries will come later
					without changing this UI.
				</p>
				<WorkExperienceCreateForm />
			</div>
		</AdminPageShell>
	);
}
