import type { SVGProps } from "react";

export type LocationIconProps = SVGProps<SVGSVGElement>;

export default function LocationIcon(props: LocationIconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="12"
				cy="10"
				r="3"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
