const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.ts',
    vendors: ['phaser']
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
    extensions: [ '.ts', '.tsx', '.js' ]
  },

  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../dist')
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/index.html'),
        to: path.resolve(__dirname, '../dist')
      },
      {
        from: path.resolve(__dirname, '../assets/icons'),
        to: path.resolve(__dirname, '../dist')
      },
      {
        from: path.resolve(__dirname, '../assets', '**', '*'),
        to: path.resolve(__dirname, '../dist')
      },
      // {
      //   from: path.resolve(__dirname, '../assets', '**', '*'),
      //   to: path.resolve(__dirname, '../dist', '[path]/[name].[hash:4].[ext]')
      // },
      // {
      //   from: path.resolve(__dirname, '../css/fonts', '**', '*'),
      //   to: path.resolve(__dirname, '../dist')
      {
        from: path.resolve(__dirname, '../src/pwa'),
        to: ''
      }
    ]),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};