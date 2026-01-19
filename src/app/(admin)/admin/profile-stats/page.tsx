import { getProfileStats } from "@/actions/profile-stats-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import ProfileStatsForm from "./_components/profile-stats-form";

export default async function ProfileStatsPage() {
	const result = await getProfileStats();
	const stats = result.success ? result.data : [];

	return (
		<AdminPageShell
			title="Profile Stats"
			description="Control the snapshot metrics that introduce your expertise at a glance."
		>
			<p className="text-base text-gray-400 mb-6">
				These labels power the quick stats section on your public portfolio. Use
				flexible strings like "1+", "10+", or "100%" instead of hard numbers.
			</p>
			<ProfileStatsForm stats={stats} />
		</AdminPageShell>
	);
}
