import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";

export default function SettingsPage(): ReactElement {
	return (
		<AdminPageShell
			title="Settings"
			description="Centralize admin preferences, theme options, and environment toggles."
		>
			<p className="text-base text-gray-400">
				General settings will land here, including theme presets, draft mode
				controls, and audit logs for administrative activity.
			</p>
		</AdminPageShell>
	);
}
