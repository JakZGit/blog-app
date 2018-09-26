const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	module: {
		rules: [
			{
				test:/\.(js|jsx)$/, //transform es6, jsx
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['env'] }
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
  	plugins: [
	new webpack.HotModuleReplacementPlugin(),
	new CopyWebpackPlugin([{ from: 'public' }]),
 	new CleanWebpackPlugin(['dist'])
	],
  	output: {
	    path: path.resolve(__dirname, "dist/"),
	    publicPath: "/dist/", //where to server files
	    filename: "bundle.js"
  	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "http://localhost:3000/dist/",
		hotOnly: true
	}
};