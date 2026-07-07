import { defineConfig } from '@rsbuild/core'

export default defineConfig({
	source: {
		entry: {
			'🍥': {
				import: './src/entry.ts',
				html: false
			},
			'🆑': {
				import: './src/clarity.ts',
				html: false
			}
		}
	},
	output: {
		distPath: { js: '' },
		filename: { js: '[name].js' },
		legalComments: 'none'
	},
	performance: {
		chunkSplit: {
			strategy: 'all-in-one'
		}
	}
})