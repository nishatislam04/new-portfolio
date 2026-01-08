import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function ProfileStatsPage(): ReactElement {
	return (
		<AdminPageShell
			title="Profile Stats"
			description="Control the snapshot metrics that introduce your expertise at a glance."
		>
			<p className="text-base text-gray-400">
				Soon you will be able to adjust achievements, project counts, and other
				key numbers with inline validation and previews.
			</p>
		</AdminPageShell>
	);
}
