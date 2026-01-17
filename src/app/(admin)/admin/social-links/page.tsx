import { getSocialLinks } from "@/actions/social-links-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import SocialLinksCreate from "./_components/social-links-create";
import SocialLinksEdit from "./_components/social-links-edit";

export default async function SocialLinksPage() {
	const result = await getSocialLinks();

	console.log(result);

	return (
		<AdminPageShell
			title="Social Links"
			description="Configure and reorder the links that drive visitors to your social profiles."
		>
			{result.success && result.data.length > 0 ? (
				<SocialLinksEdit socialLinks={result.data} />
			) : (
				<SocialLinksCreate />
			)}
		</AdminPageShell>
	);
}
