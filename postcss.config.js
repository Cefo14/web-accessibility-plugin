/** @return {import('postcss-load-config').Config} */
module.exports = ({ env }) => ({
  plugins: {
    "postcss-url": { url: 'inline' },
    "postcss-discard-comments": {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {},
    cssnano: env === 'production' ? {} : false,
  },
});
