import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function PasswordSettingsPage(): ReactElement {
	return (
		<AdminPageShell
			title="Password"
			description="Control password rules and reset workflows for the admin suite."
		>
			<p className="text-base text-gray-400">
				We will layer in secure password rotation, strength indicators, and
				notification options to safeguard access.
			</p>
		</AdminPageShell>
	);
}
