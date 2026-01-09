import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-14 w-full rounded-xl border border-input bg-gray-800/50 px-4 py-3 text-base text-white/80 shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-lg",
					className,
				)}
				ref={ref}
				suppressHydrationWarning
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
