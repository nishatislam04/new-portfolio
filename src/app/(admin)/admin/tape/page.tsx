import type { ReactElement } from "react";

import { getTapeWords } from "@/actions/tape-word-actions";
import { AdminPageShell } from "@/app/(admin)/_components/admin-page-shell";
import TapeWordForm from "./_components/tape-word-form";

export default async function TapePage(): Promise<ReactElement> {
	const result = await getTapeWords();
	const items = result.success ? result.data : [];

	return (
		<AdminPageShell
			title="Tape"
			description="Manage the marquee tape content that delivers ambient brand messaging."
		>
			<p className="text-base text-gray-400 mb-6 max-w-2xl">
				These words power the scrolling tape in your hero section. Keep them
				short, impactful, and brand-aligned.
			</p>
			<TapeWordForm items={items} />
		</AdminPageShell>
	);
}
