import type { ReactElement, ReactNode } from "react";

interface AdminPageShellProps {
	title: string;
	description?: string;
	className?: string;
	children?: ReactNode;
}

export function AdminPageShell({
	title,
	description,
	className,
	children,
}: AdminPageShellProps): ReactElement {
	return (
		<div className="space-y-6">
			<div className="space-y-1">
				<h2 className="text-3xl font-semibold text-emerald-300/90 mb-8 capitalize">
					{title}
				</h2>
				{description ? (
					<p className="text-sm text-gray-400">{description}</p>
				) : null}
			</div>
			{children ? <div className={className}>{children}</div> : null}
		</div>
	);
}
