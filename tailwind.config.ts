import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/sections/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		screens: {
			sm: "375px",
			md: "768px",
			lg: "1200px",
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				md: "2rem",
			},
		},
		extend: {
			colors: {
				gray: {
					50: "rgb(var(--color-gray-50) / <alpha-value>)",
					100: "rgb(var(--color-gray-100) / <alpha-value>)",
					200: "rgb(var(--color-gray-200) / <alpha-value>)",
					300: "rgb(var(--color-gray-300) / <alpha-value>)",
					400: "rgb(var(--color-gray-400) / <alpha-value>)",
					500: "rgb(var(--color-gray-500) / <alpha-value>)",
					600: "rgb(var(--color-gray-600) / <alpha-value>)",
					700: "rgb(var(--color-gray-700) / <alpha-value>)",
					800: "rgb(var(--color-gray-800) / <alpha-value>)",
					900: "rgb(var(--color-gray-900) / <alpha-value>)",
				},
				emerald: {
					300: "rgb(var(--color-emerald-300) / <alpha-value>)",
					400: "rgb(var(--color-emerald-400) / <alpha-value>)",
					500: "rgb(var(--color-emerald-500) / <alpha-value>)",
				},
				sky: {
					300: "rgb(var(--color-sky-300) / <alpha-value>)",
					400: "rgb(var(--color-sky-400) / <alpha-value>)",
					500: "rgb(var(--color-sky-500) / <alpha-value>)",
				},
			},
			fontFamily: {
				sans: "var(--font-sans)",
				serif: "var(--font-serif)",
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-in-out",
				"slide-up": "slideUp 0.5s ease-out",
				"slide-down": "slideDown 0.5s ease-out",
				"scale-in": "scaleIn 0.3s ease-out",
				"bounce-slow": "bounce 2s infinite",
				"spin-slow": "spin 3s linear infinite",
				"pulse-slow": "pulse 3s infinite",
				"move-left": "moveLeft 1s linear infinite",
				"move-right": "moveRight 1s linear infinite",
				"ping-large": "pingLarge 1s ease-in-out infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				slideDown: {
					"0%": { transform: "translateY(-20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				scaleIn: {
					"0%": { transform: "scale(0.9)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" },
				},
				moveLeft: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
				moveRight: {
					"0%": { transform: "translateX(-50%)" },
					"100%": { transform: "translateX(0%)" },
				},
				pingLarge: {
					"75%, 100%": {
						transform: "scale(3)",
						opacity: "0",
					},
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
