import type { SVGProps } from "react";

export type SparkleIconProps = SVGProps<SVGSVGElement>;

export default function SparkleIcon(props: SparkleIconProps) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M1 12L10.1667 10.1667L12 1L13.8333 10.1667L23 12L13.8333 13.8333L12 23L10.1667 13.8333L1 12Z"
				fill="currentColor"
			/>
		</svg>
	);
}
