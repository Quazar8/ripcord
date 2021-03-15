const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        filename: '[name].js',
        path:path.join(__dirname, '../static')
    },
    plugins: [
        new HtmlPlugin({
            template: './client/index.html'
        })
    ]
}