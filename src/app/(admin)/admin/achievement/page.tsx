import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function AchievementPage(): ReactElement {
	return (
		<AdminPageShell
			title="Achievement"
			description="Spotlight awards, recognitions, and highlights that build credibility."
		>
			<p className="text-base text-gray-400">
				We will plug in list editors and media attachments here so you can
				present achievements in a visually rich format.
			</p>
		</AdminPageShell>
	);
}
