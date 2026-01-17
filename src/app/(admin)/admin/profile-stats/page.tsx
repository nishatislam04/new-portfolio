import { getProfileStats } from "@/actions/profile-stats-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import ProfileStatsCreateForm from "./_components/profile-stats-create-form";
import ProfileStatsEditForm from "./_components/profile-stats-edit-form";

export default async function ProfileStatsPage() {
	const result = await getProfileStats();
	const stats = result.success ? result.data : null;

	return (
		<AdminPageShell
			title="Profile Stats"
			description="Control the snapshot metrics that introduce your expertise at a glance."
		>
			<p className="text-base text-gray-400 mb-6">
				These labels power the quick stats section on your public portfolio. Use
				flexible strings like "1+", "10+", or "100%" instead of hard numbers.
			</p>
			{stats === null ? (
				<ProfileStatsCreateForm />
			) : (
				<ProfileStatsEditForm stats={stats} />
			)}
		</AdminPageShell>
	);
}
