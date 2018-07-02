// webpack.config.js
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	// This is the "main" file which should include all other modules
	entry : [		
    	'./src/js/bootstrap.js'
	],
	// Where should the compiled file go?
	output : {
		filename : 'bundle.js',
		path: path.resolve(__dirname, 'build/dist'),
//		roadImage : 'src/img/'
	},
	resolve : {
		alias : {
			controller: path.resolve(__dirname, 'src/js/controller/'),
			components: path.resolve(__dirname, 'src/js/components/'),
			css: path.resolve(__dirname, 'src/css/'),
			img: path.resolve(__dirname, 'src/img/'),
			js: path.resolve(__dirname, 'src/js/'),			
			template: path.resolve(__dirname, 'src/template/'),
			vue: 'vue/dist/vue.js',
			paper: 'paper/dist/paper-full.js'
		},
		extensions : ['.js', '.jsx', '.json', '.node']
	},
	node : {
		fs : 'empty'
	},
	module : {
		// Special compilation rules
		rules : [
				{
			        test: /\.node$/,
			        use: "node-loader",
			    },
				{
					test: require.resolve('moment'),
				    use: [{
				        loader: 'expose-loader',
				        options: 'moment'
				    }]
				},
				{
			        test: /\.paper.js$/,
			        use: "paper-loader",
			        exclude : /node-loader/
			    },
				{
					test: /\.html/, 
					loader: 'file-loader?name=[name].[ext]',
					exclude: /index.template.html/
				},
				{
					test : /\.js$/,
					use : 'babel-loader?cacheDirectory',
					exclude : /node_modules/
				},
				{
					test : /\.vue$/,
					loader : 'vue-loader'					
				},
				{
					test: /\.(s*)css$/, 
					use: [
						MiniCSSExtractPlugin.loader,
						{
			        		loader: 'css-loader', 
			        		options: {
			        			minimize: true,
			                    sourceMap: true				                      
			        		}				        		   
						},
			        	{
			        		loader: 'sass-loader',
			        		options: {
			                	sourceMap: true
			        		}
			        	}
					]		
				},		       
				{
	                test: /\.(eot|jpg|gif|png|svg|ttf|woff|woff2)$/,
	                use: 'file-loader'
	            }
		]		
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
		  	jQuery: 'jquery',
		  	App: 'controller/uiapp.js'
		}),
		new MiniCSSExtractPlugin({
	      // Options similar to the same options in webpackOptions.output
	      // both options are optional
	      filename: "[name].css",
	      chunkFilename: "[id].css"
	    }),
		new HtmlWebpackPlugin({			
	    	template: './src/index.template.html',
	    	filename:  'index.html',
	      	favicon: './src/img/favicon.ico',
	      	hash: true,
	      	inject: true,
	      	sourceMap: true,
	      	chunksSortMode: 'dependency',
	      	title: 'C.A.M. - Ceiling Auto Monitoring'
	    }),
	    new ProgressBarPlugin({
			format : 'Build [:bar] :percent (:elapsed seconds)',
			clear : false,
		})		
	]
}