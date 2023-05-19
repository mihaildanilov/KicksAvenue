/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
	theme: {
		extend: {
			gridTemplateRows: {
				'[auto,auto,1fr]': 'auto auto 1fr',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms', '@tailwindcss/aspect-ratio', 'prettier-plugin-tailwindcss'),
	],
};
