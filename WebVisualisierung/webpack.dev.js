/**
 * Webpack configuration for dev environment.
 * 		//host : '0.0.0.0',
 */
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer : {
		contentBase: './build/dist',
		publicPath: '/',
//		host : '10.150.80.123',
		port: 8080		
	},
	plugins: [
		new webpack.DefinePlugin({
			// Set default service URL here to overwrite the auto detection on UI. e.g. JSON.stringify('http://localhost:8180/myservice')
			DEFAULT_URL_SERVICE: false			
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
});