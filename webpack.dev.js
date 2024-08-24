const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const {
  paths,
  filePaths
} = require('./webpack.common');

const publicHTML = 'index.html';

/**
 * @returns {import('webpack').Configuration}
 */
const load = () => ({
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: filePaths.entry,
  output: {
    path: paths.build,
    filename: 'js/[name].js'
  },

  experiments: {
    lazyCompilation: false
  },

  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: paths.public
    }
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: publicHTML,
      template: path.join(paths.public, publicHTML),
      favicon: false,
      inject: true,
      hash: true,
      scriptLoading: 'defer'
    })
  ]
});

module.exports = {
  load
};