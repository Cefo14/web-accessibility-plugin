/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env'),
    require('postcss-discard-comments'),
    require('cssnano')
  ]
}

module.exports = config
