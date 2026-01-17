import { getEducation } from "@/actions/education-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import EducationCreateForm from "./_components/education-create-form";
import EducationEditForm from "./_components/education-edit-form";

export default async function EducationPage() {
	const result = await getEducation();

	return (
		<AdminPageShell
			title="Education"
			description="Maintain academic milestones and certifications showcased on the portfolio."
		>
			<p className="text-base text-gray-400">
				This section will gain editable entries for institutions, programs, and
				highlights so you can track your learning journey.
			</p>
			{result.data === null ? (
				<EducationCreateForm />
			) : (
				<EducationEditForm education={result.data} />
			)}
		</AdminPageShell>
	);
}
