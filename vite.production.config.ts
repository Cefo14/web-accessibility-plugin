import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    cssInjectedByJsPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react:'preact/compat',
      'react-dom/test-utils':'preact/test-utils',
      'react-dom':'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime'
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: './src/main.tsx',
      },
      output: [
        {
          entryFileNames: "web-accessibility-plugin.min.[format].js",
          format: 'es'
        },
      ]
    },
  },
});