import { getAchievements } from "@/actions/achievement-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import AchievementForm from "./_components/achievement-form";

export default async function AchievementPage() {
	const result = await getAchievements();
	const items = result.success ? result.data : [];

	return (
		<AdminPageShell
			title="Achievements"
			description="Configure the metric-style achievements that highlight your impact."
		>
			<p className="text-base text-gray-400 mb-6 max-w-2xl">
				Each achievement card is made of an info label, a number, and a short
				text description. Use this section to power the public achievements
				grid instead of hardcoded constants.
			</p>
			<AchievementForm items={items} />
		</AdminPageShell>
	);
}
