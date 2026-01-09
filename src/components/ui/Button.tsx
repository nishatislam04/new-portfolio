import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "ghost" | "destructive";
	size?: "sm" | "md" | "lg" | "icon";
	children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = "primary", size = "md", children, ...props },
		ref,
	) => {
		const baseStyles =
			"inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";

		// add a destructive variant
		const variants = {
			primary:
				"bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25",
			secondary:
				"bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30",
			ghost: "text-gray-300 hover:text-white hover:bg-white/5",
			destructive: "bg-red-500 hover:bg-red-600 text-white",
		};

		const sizes = {
			sm: "px-4 py-2 text-sm",
			md: "px-6 py-3 text-base",
			lg: "px-8 py-4 text-lg",
			icon: "h-9 w-9",
		};

		return (
			<button
				className={cn(baseStyles, variants[variant], sizes[size], className)}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";

export { Button };
