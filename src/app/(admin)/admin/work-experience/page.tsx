import { redirect } from "next/navigation";

import { getWorkExperiences } from "@/actions/work-experience-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import WorkExperienceListings from "./_components/work-experience-listings";

/**
 * ! TODO: when we create a new work experience, we should redirect to the listings page. but it does not for the very first time. the listings component render when we have a item already. but it does not render, when we dont have a item.
 * @returns
 */
export default async function WorkExperiencePage() {
	const result = await getWorkExperiences();
	const experiences = result.success ? result.data : [];

	if (experiences.length === 0) redirect("/admin/work-experience/create");

	return (
		<AdminPageShell
			title="Work Experience"
			description="Curate your professional timeline and highlight key accomplishments."
		>
			<WorkExperienceListings experiences={experiences} />
		</AdminPageShell>
	);
}
