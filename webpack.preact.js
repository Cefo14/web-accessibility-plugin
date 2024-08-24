/**
 * @returns {import('webpack').Configuration}
 */
const load = () => ({
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    }
  }
});

module.exports = {
  load
};
