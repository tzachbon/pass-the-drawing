const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

/** @type {import('webpack').Configuration} */
module.exports = merge(
    common,
    {
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            open: true,
            historyApiFallback: true,
        },
    },
)
