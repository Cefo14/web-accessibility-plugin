const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const CompressionPlugin = require('compression-webpack-plugin');

const {
  paths,
  filePaths
} = require('./webpack.common');

/**
 * @returns {import('webpack').Configuration}
 */
const load = ({ ANALYZE_BUNDLE, UGLIFY }) => ({
  mode: 'production',
  devtool: false,

  entry: filePaths.entry,
  output: {
    path: paths.build,
    filename: '[name].[contenthash].min.js',
    clean: true
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      UGLIFY
        ? new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false
            }
          }})
        : new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false
            },
            compress: true
          }
        })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].min.css'
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress'
    }),
    ANALYZE_BUNDLE && new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  ].filter(Boolean)
});

module.exports = {
  load
};
