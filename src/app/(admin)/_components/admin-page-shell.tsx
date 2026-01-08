import type { ReactElement, ReactNode } from "react";

interface AdminPageShellProps {
	title: string;
	description?: string;
	children?: ReactNode;
}

export function AdminPageShell({
	title,
	description,
	children,
}: AdminPageShellProps): ReactElement {
	return (
		<div className="space-y-6">
			<div className="space-y-3">
				<p className="text-xs uppercase tracking-[0.35em] text-emerald-300/90">
					Admin Module
				</p>
				<h2 className="text-3xl font-semibold text-white">{title}</h2>
				{description ? (
					<p className="text-base text-gray-400">{description}</p>
				) : null}
			</div>
			{children ? <div className="space-y-4">{children}</div> : null}
		</div>
	);
}
