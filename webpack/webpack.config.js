/**
 * Created by carlosriveros on 2017-03-13.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cwd = process.cwd();


module.exports = {
    entry: './index.js',
    output: {
        path: `${cwd}/dist`,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [ {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
        }, {
            test: /\.svg$/,
            loader: 'file-loader'
        } ]
    },
    devServer: {
        contentBase: path.join(cwd, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new CleanWebpackPlugin([`${cwd}/dist`], {
            root: cwd,
        }),
        new HtmlWebpackPlugin({
            title: 'Test Application',
            template: `${cwd}/index.html`
        }),
        new ExtractTextPlugin('styles.css')
    ]
};