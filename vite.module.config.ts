import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

/**
 * Build all files in single file
 */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      react: 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: './src/publish/module.tsx',
      },
      output: [
        {
          entryFileNames: 'web-accessibility-plugin.min.[format].js',
          format: 'cjs',
        },
      ],
    },
  },
});
