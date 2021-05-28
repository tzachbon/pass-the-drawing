const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'production',
})
