import type { ReactElement } from "react";

import { getWorkExperiences } from "@/actions/work-experience-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import WorkExperienceManager from "./_components/work-experience-manager";

export default async function WorkExperiencePage(): Promise<ReactElement> {
	const result = await getWorkExperiences();
	const experiences = result.success ? result.data : [];

	return (
		<AdminPageShell
			title="Work Experience"
			description="Curate your professional timeline and highlight key accomplishments."
		>
			<WorkExperienceManager experiences={experiences} />
		</AdminPageShell>
	);
}
