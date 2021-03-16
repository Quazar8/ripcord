import path from 'path'
import HtmlPlugin from 'html-webpack-plugin'

export default {
    mode: 'development',
    entry: './client/index.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve('./build/client')
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