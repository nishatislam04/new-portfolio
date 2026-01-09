import type { ReactElement } from "react";

import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import UserInfoCreate from "./_components/user-info-create";

export default function UserInfoPage(): ReactElement {
	return (
		<AdminPageShell title="User Info Management" description="">
			<UserInfoCreate />
		</AdminPageShell>
	);
}
