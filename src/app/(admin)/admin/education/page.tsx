import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function EducationPage(): ReactElement {
	return (
		<AdminPageShell
			title="Education"
			description="Maintain academic milestones and certifications showcased on the portfolio."
		>
			<p className="text-base text-gray-400">
				This section will gain editable entries for institutions, programs, and
				highlights so you can track your learning journey.
			</p>
		</AdminPageShell>
	);
}
