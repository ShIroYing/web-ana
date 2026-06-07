import { defineConfig } from '@rsbuild/core'
import { pluginPreact } from '@rsbuild/plugin-preact'
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser'

export default defineConfig({
	plugins: [
		pluginPreact(),
		pluginHtmlMinifierTerser({
			collapseBooleanAttributes: true,
			collapseInlineTagWhitespace: true,
			collapseWhitespace: true,
			decodeEntities: true,
			keepClosingSlash: false,
			minifyCSS: true,
			minifyJS: true,
			minifyURLs: true,
			removeAttributeQuotes: true,
			removeComments: true,
			removeEmptyElements: true,
			removeOptionalTags: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			trimCustomFragments: true,
			useShortDoctype: true
		})
	],
	html: {
		mountId: '',
		title: ''
	},
	output: {
		distPath: {
			js: '',
			jsAsync: '',
			css: '',
			cssAsync: ''
		},
		filename: {
			html: 'iframe.html',
			css: 'iframe.css'
		},
		inlineScripts: true,
		polyfill: 'usage'
	},
	performance: {
		chunkSplit: {
			strategy: 'all-in-one'
		}
	}
})