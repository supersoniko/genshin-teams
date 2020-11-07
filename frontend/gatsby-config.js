/* eslint-disable @typescript-eslint/camelcase */
/* eslint-env node */

module.exports = {
	siteMetadata: {
		title: process.env.TITLE
	},
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',

		// Favicons and web manifest
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: process.env.TITLE,
				short_name: process.env.TITLE,
				start_url: '/',
				background_color: '#3b3b39',
				theme_color: '#3b3b39',
				display: 'standalone',
				// This path is relative to the root of the site.
				icon: 'static/images/favicon.png'
			}
		},

		// Aliases
		{
			resolve: 'gatsby-plugin-alias-imports',
			options: {
				alias: {
					'@components': 'src/components',
					'@templates': 'src/templates',
					'@containers': 'src/containers',
					'@pages': 'src/pages',
					'@utils': 'src/utils',
					'@styles': 'src/styles',
					'@api': 'src/api'
				},
				extensions: ['ts', 'tsx']
			}
		},
		{
			resolve: 'gatsby-plugin-layout',
			options: {
				component: require.resolve('./src/layouts/top-layout.tsx')
			}
		}
	]
}
require('dotenv').config({
	path: `.env.${process.env.BUILD_ENV}`
})
