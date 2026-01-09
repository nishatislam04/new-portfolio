"use cache";
import type { ReactElement } from "react";
import { getUserInfo } from "@/actions/user-info-form-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import UserInfoCreate from "./_components/user-info-create";
import UserInfoEdit from "./_components/user-info-edit";

export default async function UserInfoPage(): Promise<ReactElement> {
	// Check if user info already exists
	const userAlredyExist = await getUserInfo();

	if (userAlredyExist.success && userAlredyExist.data) {
		return (
			<AdminPageShell title="User Edit Management" description="">
				<UserInfoEdit user={userAlredyExist.data} />
			</AdminPageShell>
		);
	}

	return (
		<AdminPageShell title="User Create Management" description="">
			<UserInfoCreate />
		</AdminPageShell>
	);
}
