const path = require('path')
const pkg = JSON.parse(require('fs').readFileSync('package.json'))
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let  moduleName = pkg.name
if (process.argv.indexOf('-p') >= 0 || process.argv.indexOf('--optimize-minimize') >= 0)
    moduleName +='.min'

module.exports = {
	entry: {
        [ moduleName ]: './src/module.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `Helptip v${ pkg.version } - © Upplication ${ (new Date()).getFullYear() }`,
            entryOnly: true,
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            template: './src/index.html',
        }),
    ],
    externals: {
        'angular': 'angular',
    }
}
