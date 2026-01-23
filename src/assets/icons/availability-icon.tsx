import type { SVGProps } from "react";

export type AvailabilityIconProps = SVGProps<SVGSVGElement>;

export default function AvailabilityIcon(props: AvailabilityIconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<polyline
				points="12,6 12,12 16,14"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
