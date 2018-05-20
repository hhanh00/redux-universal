var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: [
    'babel-polyfill',
    './server.js'
  ],
  output: {
    filename: './app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
}
