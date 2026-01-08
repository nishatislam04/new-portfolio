import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function SocialLinksPage(): ReactElement {
	return (
		<AdminPageShell
			title="Social Links"
			description="Configure and reorder the links that drive visitors to your social profiles."
		>
			<p className="text-base text-gray-400">
				Future updates will let you add new platforms, mark featured channels,
				and preview how each link appears on the public site.
			</p>
		</AdminPageShell>
	);
}
