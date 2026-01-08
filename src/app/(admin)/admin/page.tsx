import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function OverviewPage(): ReactElement {
	return (
		<AdminPageShell
			title="Overview"
			description="This dashboard will summarize portfolio activity and highlight areas that need attention."
		>
			<p className="text-base text-gray-400">
				We will expand this overview with analytics, release notes, and quick
				links to help you iterate faster.
			</p>
		</AdminPageShell>
	);
}
