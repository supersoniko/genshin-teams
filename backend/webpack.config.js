const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
	entry: slsw.lib.entries,
	externals: [
		nodeExternals({
			allowlist: ['webpack/hot/poll?100']
		})
	],
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx']
	},
	output: {
		libraryTarget: 'commonjs',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js'
	},
	target: 'node',
	// devtool: 'source-map',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts(x?)$/,
				use: [
					{
						loader: 'ts-loader',
						options: {transpileOnly: true}
					}
				]
			}
		]
	}
}
