import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';


export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser, ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      semi: ['error', 'always'],             // Requiere punto y coma al final de las declaraciones
      quotes: ['error', 'single'],           // Prefiere comillas simples
      'no-console': 'warn',                  // Muestra advertencias por console.log
      'react/prop-types': 'off',             // Desactiva la validación de tipos de propiedades en React
      'eqeqeq': ['error', 'always'],         // Requiere el uso de === y !== en lugar de == y !=
      'comma-dangle': ['error', 'never'],    // No permite comas finales en objetos y arrays
      'indent': [                            // Requiere una indentación de 2 espacios
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],
      'linebreak-style': ['error', 'unix'],  // Enforce Unix line endings
      'no-trailing-spaces': 'error',          // Prohíbe espacios en blanco al final de las líneas
      '@typescript-eslint/no-require-imports': 'off', // Desactiva la regla que prohíbe require en TypeScript
      'no-constant-binary-expression': 'off',
      'no-restricted-exports': ['error', { restrictedNamedExports: ['default'] }],
      'react/react-in-jsx-scope': 'off',
      // allow jsx syntax in js files (for next.js project)
      'react/jsx-filename-extension': [1, { 'extensions': ['.jsx', '.tsx'] }]
    }
  },
  {
    ignores: [
      'node_modules/*',
      'dist/*',
      'build/*'
    ]
  }
];