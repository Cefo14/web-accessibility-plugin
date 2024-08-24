const { merge } = require('webpack-merge');

const webpackCommonConfig = require('./webpack.common');
const webpackDevConfig = require('./webpack.dev');
const webpackProdConfig = require('./webpack.prod');
const webpackPreactConfig = require('./webpack.preact');

const devConfig = (env, mode) => {
  const { USE_PREACT = false } = env;

  const baseConfig = webpackCommonConfig.load({ mode });
  const devConfig = webpackDevConfig.load();

  if (USE_PREACT) return merge(baseConfig, devConfig,  webpackPreactConfig.load());
  return merge(baseConfig, devConfig);
};

const prodConfig = (env, mode) => {
  const {
    USE_PREACT = false,
    ANALYZE_BUNDLE = false,
    UGLIFY = false
  } = env;

  const baseConfig = webpackCommonConfig.load({ mode });
  const prodConfig = webpackProdConfig.load({ ANALYZE_BUNDLE, UGLIFY });

  if (USE_PREACT) return merge(baseConfig, prodConfig,  webpackPreactConfig.load());
  return merge(baseConfig, prodConfig);
};


module.exports = (env, args) => {
  const { mode } = args;

  switch(mode) {
    case 'development':
      return devConfig(env, mode);
    case 'production':
      return prodConfig(env, mode);
    default:
      throw new Error(`Mode: ${mode} not found`);
  }
};
