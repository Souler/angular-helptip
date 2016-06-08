'use strict'

const pkg = JSON.parse(require('fs').readFileSync('package.json'))
  ,   webpack = require('webpack')
  ,   ExtractTextPlugin = require('extract-text-webpack-plugin')

let  moduleName = pkg.name
if (process.argv.indexOf('-p') >= 0 || process.argv.indexOf('--optimize-minimize') >= 0)
    moduleName +='.min'

module.exports = {
	entry: {
        [ moduleName ]: './src/entry.js'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    resolve: {
        modulesDirectories: [ 'bower_components' ]
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: ExtractTextPlugin.extract(['css', 'less']) },
            { test: /index\.html$/, loader: 'file-loader?name=index.html' },
            { test: /bower_components/, loader: 'file-loader?name=assets/[name].[ext]' }
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
        ),
        new ExtractTextPlugin('[name].css'),
        new webpack.BannerPlugin(`Helptip v${ pkg.version } - © Upplication ${ (new Date()).getFullYear() }`, { entryOnly: true })

    ],
    externals: {
        'angular': 'angular',
    }
}
