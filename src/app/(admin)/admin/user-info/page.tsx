// "use cache";
import type { ReactElement } from "react";
import { getUserInfo } from "@/actions/user-info-form-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import UserInfoCreate from "./_components/user-info-create";
import UserInfoEdit from "./_components/user-info-edit";

export default async function UserInfoPage(): Promise<ReactElement> {
	const userAlredyExist = await getUserInfo();

	if (userAlredyExist.success && userAlredyExist.data)
		return <UserInfoEdit user={userAlredyExist.data} />;

	return (
		<AdminPageShell title="User Create Management" description="">
			<UserInfoCreate />
		</AdminPageShell>
	);
}
