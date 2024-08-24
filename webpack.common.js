const path = require('path');

const webpack = require('webpack');

const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssDiscardComments = require('postcss-discard-comments');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const rootPath = path.resolve(__dirname);

const paths = {
  root: rootPath,
  src: path.join(rootPath, 'src'),
  public: path.join(rootPath, 'public'),
  build: path.join(rootPath, 'build'),
  nodeModules: path.join(rootPath, 'node_modules'),
  cache: path.join(rootPath, 'node_modules', '.cache')
};

const files = {
  eslintConfig: 'eslint.config.mjs',
  eslintCache: '.eslintcache',
  entry: 'index.tsx'
};

const filePaths = {
  eslintCache: path.join(paths.cache, files.eslintCache),
  entry: path.join(paths.src, files.entry)
};

const isDevelopmentEnv = (env = '') => {
  const { NODE_ENV } = process.env;
  const mode = 'development';
  return env === mode || NODE_ENV === mode || NODE_ENV === undefined;
};

const isProductionEnv = (env = '') => {
  const { NODE_ENV } = process.env;
  const mode = 'production';
  return env === mode || NODE_ENV === mode;
};

/**
 *
 * @param {boolean} isProduction
 * @returns {import('webpack').RuleSetUseItem[]}
 */
const createPostcssPlugins = (isProduction) => {
  return [
    postcssFlexbugsFixes(),
    postcssPresetEnv(),
    isProduction && postcssDiscardComments(),
    isProduction && cssnano()
  ].filter(Boolean);
};

/**
 * @returns {import('webpack').Configuration}
 */
const load = ({ mode }) => {
  const isDevelopment = isDevelopmentEnv(mode);
  const isProduction = isProductionEnv(mode);

  return {
    cache: (
      isProduction
        ? false
        : {
          type: isProduction ? 'memory' : 'filesystem',
          cacheDirectory: paths.cache
        }
    ),
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(paths.src)
      }
    },
    stats: {
      errorDetails: true,
      children: true
    },

    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheCompression: false,
                cacheDirectory: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.(js|ts)x?$/,
          enforce: 'pre',
          use: [
            {
              loader: 'source-map-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          exclude: /\.module.css$/,
          use: [
            {
              loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: createPostcssPlugins(isProduction)
                }
              }
            }
          ]
        },
        {
          test: /\.module.css$/,
          use: [
            {
              loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  localIdentName: isProduction ? '[hash:base64]' : '[path]-[name]__[local]--[hash:base64:5]'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: createPostcssPlugins(isProduction)
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          type: 'asset'
        },
        {
          test: /\.svg$/i,
          oneOf: [
            {
              dependency: { not: ['url'] },
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    memo: true
                  }
                },
                {
                  loader: 'url-loader'
                }
              ]
            },
            {
              type: 'asset'
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': (
          Object
            .keys(process.env)
            .reduce((acc, key) => ({
              ...acc,
              [key]: JSON.stringify(process.env[key])
            }), {})
        )
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          }
        }
      }),
      isDevelopment && new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        failOnWarning: false,
        cache: true,
        cacheLocation: filePaths.eslintCache,
        overrideConfigFile: path.resolve(paths.root, files.eslintConfig),
        configType: 'flat'
      })
    ].filter(Boolean)
  };
};

module.exports = {
  load,

  paths,
  files,
  filePaths,

  isDevelopmentEnv,
  isProductionEnv
};