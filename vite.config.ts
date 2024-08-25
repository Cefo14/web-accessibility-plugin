import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [
      react(),
      svgr(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        react: command === 'build' ? 'preact/compat' : 'react',
        'react-dom/test-utils': command === 'build' ? 'preact/test-utils' : 'react-dom/test-utils',
        'react-dom': command === 'build' ? 'preact/compat' : 'react-dom',
        'react/jsx-runtime': command === 'build' ? 'preact/jsx-runtime' : 'react/jsx-runtime'
      },
    },
}));

