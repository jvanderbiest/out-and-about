const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const JavaScriptObfuscator = require('webpack-obfuscator');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const prod = {
  mode: 'production',
  output: {
    filename: 'app.[contenthash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          filename: '[name].[contenthash].js'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({ root: path.resolve(__dirname, '../') }),
    new JavaScriptObfuscator(
      {
        rotateStringArray: true,
        stringArray: true,
        // stringArrayEncoding: 'base64', // disabled by default
        stringArrayThreshold: 0.75
      },
      ['vendors.*.js']
    ),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, '../src/pwa/sw.js'),
      swDest: 'sw.js',
      exclude: [/\/spine\/raw\/*/]
    })
  ]
}

module.exports = merge(common, prod);