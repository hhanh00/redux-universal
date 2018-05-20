var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx'
  ],
  output: {
    filename: './dist/build.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      "/api": {
        target: "http://localhost:8502",
        pathRewrite: {'^/api': ''},
        ws: true
      }
    }
  },
  devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
