const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './client/index.ts',
    output: {
        filename: '[name].js',
        path:path.join(__dirname, '../build/client')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlPlugin({
            template: './client/index.html'
        })
    ]
}