import { defineConfig } from '@pandacss/dev';

export default defineConfig({
	utilities: {
		extend: {
			// NOTE: webkitBoxOrientがサポートされていなかったので追加
			// 参考リンク: https://github.com/chakra-ui/panda/issues/2213
			WebkitBoxOrient: {
				values: { type: 'string' },
				className: 'webkitBoxOrient',
			},
		},
	},

	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			semanticTokens: {
				colors: {
					primary: {
						50: { value: '{colors.amber.50}' },
						100: { value: '{colors.amber.100}' },
						200: { value: '{colors.amber.200}' },
						300: { value: '{colors.amber.300}' },
						400: { value: '{colors.amber.400}' },
						500: { value: '{colors.amber.500}' },
						600: { value: '{colors.amber.600}' },
						700: { value: '{colors.amber.700}' },
						800: { value: '{colors.amber.800}' },
						900: { value: '{colors.amber.900}' },
						950: { value: '{colors.amber.950}' },
					},
					secondary: {
						50: { value: '{colors.indigo.50}' },
						100: { value: '{colors.indigo.100}' },
						200: { value: '{colors.indigo.200}' },
						300: { value: '{colors.indigo.300}' },
						400: { value: '{colors.indigo.400}' },
						500: { value: '{colors.indigo.500}' },
						600: { value: '{colors.indigo.600}' },
						700: { value: '{colors.indigo.700}' },
						800: { value: '{colors.indigo.800}' },
						900: { value: '{colors.indigo.900}' },
						950: { value: '{colors.indigo.950}' },
					},
					state: {
						error: { value: '#ff4d4f' },
						info: { value: '#1677ff' },
						link: { value: '#1677ff' },
						success: { value: '#52c41a' },
						warning: { value: '#faad14' },
					},
					text: {
						base: { value: '#333' },
						white: { value: '#fff' },
					},
					bg: {
						base: { value: '#faf9f7' },
						white: { value: '#fff' },
					},
					border: {
						base: { value: '#eeebe4' },
						white: { value: '#fff' },
					},
				},
			},
		},
	},

	// The output directory for your css system
	outdir: 'lib/styled-system',

	jsxFramework: 'react',
});
