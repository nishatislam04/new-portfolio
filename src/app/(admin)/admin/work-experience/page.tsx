import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function WorkExperiencePage(): ReactElement {
	return (
		<AdminPageShell
			title="Work Experience"
			description="Curate your professional timeline and highlight key accomplishments."
		>
			<p className="text-base text-gray-400">
				We will add structured inputs for roles, responsibilities, and featured
				achievements so you can keep your experience current.
			</p>
		</AdminPageShell>
	);
}
