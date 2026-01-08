import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function ProjectsPage(): ReactElement {
	return (
		<AdminPageShell
			title="Projects"
			description="Edit project entries, hero media, and tech stacks spotlighted on the portfolio."
		>
			<p className="text-base text-gray-400">
				We will incorporate sortable cards, deployment links, and case study
				summaries to keep your project lineup polished.
			</p>
		</AdminPageShell>
	);
}
