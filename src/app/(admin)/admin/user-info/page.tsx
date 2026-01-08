import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function UserInfoPage(): ReactElement {
	return (
		<AdminPageShell
			title="User Info"
			description="Manage core profile details that surface across the public portfolio."
		>
			<p className="text-base text-gray-400">
				We will add forms here to update your headline, bio, location, and other
				personal data shown throughout the site.
			</p>
		</AdminPageShell>
	);
}
