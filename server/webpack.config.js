import path from 'path'
import HtmlPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

export default {
    mode: 'development',
    entry: ['./client/index.tsx', 'webpack-hot-middleware/client'],
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve('./build/client'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: './client.tsconfig.json'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js',]
    },
    plugins: [
        new HtmlPlugin({
            template: './client/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true
    }
} 