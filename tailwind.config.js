// @ts-check

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx,css,md,mdx,js,jsx}'],
	theme: {
		fontFamily: {
			sans: [
				"'Segoe UI'",
				'Frutiger',
				"'Frutiger Linotype'",
				"'Dejavu Sans'",
				"'Helvetica Neue'",
				'Arial',
				'sans-serif',
			],
		},

		colors: {
			white: '#ffffff',
			black: '#000000',
			transparent: 'transparent',
			ts: {
				DEFAULT: '#3178c6',
				50: '#f5f8fc',
				100: '#eaf2f9',
				200: '#ccddf1',
				300: '#adc9e8',
				400: '#6fa1d7',
				500: '#3178c6',
				600: '#2c6cb2',
				700: '#255a95',
				800: '#1d4877',
				900: '#183b61',
			},
		},
	},
	plugins: [],
};
