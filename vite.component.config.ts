import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

/**
 * Build a component lib
 */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    cssInjectedByJsPlugin(),
    dts({ rollupTypes: true, tsconfigPath: "./tsconfig.app.json" })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/publish/component.ts'),
      name: 'react-web-accessibility-plugin',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom'
      ],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'Reactjsx',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
  },
});
