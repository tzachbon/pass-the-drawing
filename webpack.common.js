const { StylableWebpackPlugin } = require('@stylable/webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
        new StylableWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/404.html',
                    to: '404.html',
                },
            ],
        }),
    ],
}
