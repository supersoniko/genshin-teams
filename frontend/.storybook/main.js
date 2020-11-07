const path = require('path')

module.exports = {
	stories: ['../src/**/*.stories.tsx'],
	addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-docs'],
	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('ts-loader')
				},
				// Optional
				{
					loader: require.resolve('react-docgen-typescript-loader')
				}
			]
		})
		config.resolve.alias = {
			'@mocks': path.resolve(__dirname, '../mocks/'),
			'@utils': path.resolve(__dirname, '../src/utils/'),
			'@components': path.resolve(__dirname, '../src/components/'),
			'@containers': path.resolve(__dirname, '../src/containers/'),
			'@i18n': path.resolve(__dirname, '../src/i18n/')
		}
		config.resolve.extensions.push('.ts', '.tsx')
		return config
	}
}
