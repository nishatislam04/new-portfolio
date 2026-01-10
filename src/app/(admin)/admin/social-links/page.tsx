import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import SocialLinksCreate from "./_components/social-links-create";

export default function SocialLinksPage(): ReactElement {
	return (
		<AdminPageShell
			title="Social Links"
			description="Configure and reorder the links that drive visitors to your social profiles."
		>
			<SocialLinksCreate />
		</AdminPageShell>
	);
}
