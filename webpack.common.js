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
                options: { transpileOnly: true },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
            },
        ],
    },
    resolve: {
        alias: {
            '@api': require('path').resolve('src', 'api'),
            '@components': require('path').resolve('src', 'components'),
            '@screens': require('path').resolve('src', 'screens'),
            '@utils': require('path').resolve('src', 'utils'),
            '@pages': require('path').resolve('src', 'pages'),
            '@hooks': require('path').resolve('src', 'hooks'),
            '@types': require('path').resolve('src', 'types'),
            '@constants': require('path').resolve('src', 'constants'),
            '@styles': require('path').resolve('src', 'styles'),
        },
        extensions: [ '.ts', '.tsx', '.js', '.json' ],
    },
    plugins: [
        new StylableWebpackPlugin(),
        new HtmlWebpackPlugin({ template: 'public/index.html' }),
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
