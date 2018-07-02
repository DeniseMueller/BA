/**
 * Webpack configuration for dev environment.
 */
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		runtimeChunk: true,	
		minimizer : [new UglifyJsPlugin({
			cache : true,
			parallel : true,
			sourceMap : true
		})]
	},
	plugins: [
		new webpack.DefinePlugin({
	    	DEFAULT_URL_SERVICE: false	    	
	    }),	   
	    new webpack.optimize.OccurrenceOrderPlugin(),
//	    new BundleAnalyzerPlugin({
//	    	analyzerMode: 'static',
//	    	reportFilename: 'build/bundle.report.html'
//	    }),
	    // clean dist folder
	    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, './build/') }),
	    new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp('\\.(js|css)$'),
			threshold: 10240,
			minRatio: 0.8
	    })	     
//	    new OfflinePlugin({
//	    	caches: 'all',
//	    	AppCache: false,
//	    	ServiceWorker: {
//	    		 minify: false, 
//	    	}
//		}),
	]
});