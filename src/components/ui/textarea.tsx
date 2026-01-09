import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"flex min-h-[200px] w-full rounded-xl border border-input bg-gray-800/50 px-4 py-3 text-base text-white/80 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-lg transition-all duration-200",
				className,
			)}
			ref={ref}
			suppressHydrationWarning
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
