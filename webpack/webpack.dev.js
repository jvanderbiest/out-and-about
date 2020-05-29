const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    https: true
  }
}

module.exports = merge(common, dev);