import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { getWorkExperiences } from "@/actions/work-experience-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import { WorkExperienceEditForm } from "@/app/(admin)/admin/work-experience/[id]/edit/_components/work-experience-edit-form";

interface EditWorkExperiencePageProps {
	params: Promise<{ id: string }>;
}

export default async function EditWorkExperiencePage({
	params,
}: EditWorkExperiencePageProps): Promise<ReactElement> {
	const { id } = await params;
	const result = await getWorkExperiences();

	if (!result.success && result.data.length === 0) notFound();

	const experience = result.data.find((exp) => exp.id === id);

	if (!experience) notFound();

	return (
		<AdminPageShell
			title="Edit Work Experience"
			description="Update your professional timeline and highlight key accomplishments."
		>
			<WorkExperienceEditForm experience={experience} />
		</AdminPageShell>
	);
}
