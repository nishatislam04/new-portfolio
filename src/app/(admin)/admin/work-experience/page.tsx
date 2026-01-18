import { getWorkExperiences } from "@/actions/work-experience-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import WorkExperienceListings from "./_components/work-experience-listings";
import CreateWorkExperiencePage from "./create/page";

/**
 * ! we need to optimize this page for better performance
 * ! we need to optimize our create page and form for better performance
 * ! we need to optimize our edit page and form for better performance
 *
 * ! THERE ARE TOO MANY RE-RENDERINGS HAPPENING
 */
export default async function WorkExperiencePage() {
	const result = await getWorkExperiences();
	const experiences = result.success ? result.data : [];

	if (experiences.length === 0) return <CreateWorkExperiencePage />;

	return (
		<AdminPageShell
			title="Work Experience"
			description="Curate your professional timeline and highlight key accomplishments."
		>
			<WorkExperienceListings experiences={experiences} />
		</AdminPageShell>
	);
}
