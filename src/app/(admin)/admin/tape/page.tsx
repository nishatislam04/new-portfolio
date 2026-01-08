import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function TapePage(): ReactElement {
	return (
		<AdminPageShell
			title="Tape"
			description="Manage the marquee tape content that delivers ambient brand messaging."
		>
			<p className="text-base text-gray-400">
				Expect controls for phrasing, emoji accents, and animation cadence so
				you can refresh the tape without touching code.
			</p>
		</AdminPageShell>
	);
}
