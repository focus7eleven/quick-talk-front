const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const path = require('path')

// plugins
plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'main',
		children: true,
		minChunks: 2
	}),

	// Cleanup the builds/ folder before
	// compiling our final assets
	new CleanPlugin('builds'),

	// This plugin looks for similar chunks and files
	// and merges them for better caching by the user
	new webpack.optimize.DedupePlugin(),

	// This plugin prevents Webpack from creating chunks
	// that would be too small to be worth loading separately
	new webpack.optimize.MinChunkSizePlugin({
		minChunkSize: 51200, // ~50kb
	}),

	// This plugin minifies all the Javascript code of the final bundle
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false
	}),

	// This plugins defines various variables that we can set to false
	// in production to avoid code related to them from being compiled
	// in our final bundle
	new webpack.DefinePlugin({
		__SERVER__: false,
		__DEVELOPMENT__: false,
		__DEVTOOLS__: false,
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
]

module.exports = {
	debug: false,
	entry: [
		'./src/client.jsx',
	],
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loaders: ['babel-loader']
		}, {
			test: /\.scss$/,
			loaders: ["style", "css", "sass", "postcss"]
		}, {
			test: /\.(jpe?g|png|gif)$/i,
			loaders: [
				'file?hash=sha512&digest=hex&name=[hash].[ext]',
				'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
			]
		}, {
			test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			loader: 'file-loader'
		}],
	},
	postcss: function() {
		return [autoprefixer, precss]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		modules: [
			path.resolve('./less_modules/'),
			path.resolve('./node_modules/'),
			path.resolve('./src/utils/'),
			path.resolve('./src/react-canvas/'),
			path.resolve('./src/public/'),
		]
	},
	output: {
		path: __dirname + '/dist/build',
		publicPath: '/build/',
		filename: 'bundle.js'
	},
	plugins: plugins,
	devtool: false,
}
