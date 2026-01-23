import type { SVGProps } from "react";

export type MessengerIconProps = SVGProps<SVGSVGElement>;

export default function MessengerIcon(props: MessengerIconProps) {
	return (
		<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
			<radialGradient
				id="messenger-gradient"
				cx="-1341.3"
				cy="6883.8"
				r={0.7}
				gradientTransform="matrix(800 0 0 -800 1073169 5507509)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset={0} stopColor="#09f" />
				<stop offset={0.6} stopColor="#a033ff" />
				<stop offset={0.9} stopColor="#ff5280" />
				<stop offset={1} stopColor="#ff7061" />
			</radialGradient>
			<g fillRule="evenodd" clipRule="evenodd">
				<path
					fill="url(#messenger-gradient)"
					d="M256 0A247 247 0 0 0 0 248c0 75 31 139 80 184 5 4 7 9 7 15l2 45c0 15 15 24 28 18l51-22c5-2 9-2 14-1 23 6 48 10 74 10 144 0 256-106 256-249S400 0 256 0z"
				/>
				<path
					fill="#fff"
					d="m102 321 75-119c12-19 38-24 56-11l60 45c5 4 13 4 18 0l81-61c11-8 25 5 18 16l-75 119a38 38 0 0 1-56 11l-60-45c-5-4-13-4-18 0l-81 61c-11 8-25-5-18-16z"
				/>
			</g>
		</svg>
	);
}
