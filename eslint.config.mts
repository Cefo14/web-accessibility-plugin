import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default [
  // ========================================
  // IGNORE PATTERNS
  // ========================================
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.cache/**',
      '**/*.min.js',
      '**/public/**',
    ],
  },

  // ========================================
  // BASE CONFIGURATION
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // Recommended configurations
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  
  // ========================================
  // JAVASCRIPT/TYPESCRIPT RULES
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      // ==========================================
      // 1. CODE QUALITY (Best Practices)
      // Detect potential errors and bad practices
      // ==========================================
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'no-useless-return': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'no-unneeded-ternary': 'error',
      'no-nested-ternary': 'warn',
      
      // ==========================================
      // 2. FORMAT AND STYLE
      // Keep code uniform across the team
      // ==========================================
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'block-spacing': 'error',
      'comma-spacing': 'error',
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',
      
      // ==========================================
      // 3. COMPLEXITY AND MAINTAINABILITY
      // Prevent hard-to-maintain code
      // ==========================================
      'max-depth': ['warn', 2],
      'complexity': ['warn', 25],

      // ==========================================
      // 4. ADDITIONAL VALIDATIONS
      // Extra safety for common mistakes
      // ==========================================
      'no-fallthrough': 'error',
      'no-constant-binary-expression': 'error',
      'constructor-super': 'error',
      'no-this-before-super': 'error',
    },
  },

  // ========================================
  // TYPESCRIPT SPECIFIC RULES
  // ========================================
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      // ==========================================
      // 5. TYPESCRIPT - IMPORTS
      // Organize imports and improve tree-shaking
      // ==========================================
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',

      // ==========================================
      // 6. TYPESCRIPT - VARIABLES
      // Delegated to tsconfig (noUnusedLocals, noUnusedParameters)
      // ==========================================
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      // ==========================================
      // 7. TYPESCRIPT - TYPE SYSTEM
      // Keep code strongly typed
      // ==========================================
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      
      // Delegated to tsconfig (strict mode)
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      
      // Delegated to tsconfig (isolatedModules)
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      
      // ==========================================
      // 8. TYPESCRIPT - FUNCTIONS
      // Inferred return types (especially for React)
      // ==========================================
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      
      // ==========================================
      // 9. TYPESCRIPT - NAMING CONVENTIONS
      // Consistency in type and enum names
      // ==========================================
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE', 'PascalCase'],
        },
      ],
    },
  },

  // ========================================
  // REACT AND JSX RULES
  // ========================================
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ==========================================
      // 10. REACT - CORE
      // Base React configuration
      // ==========================================
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+

      // ==========================================
      // 11. REACT - JSX BEST PRACTICES
      // Make JSX cleaner and more consistent
      // ==========================================
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      
      // ==========================================
      // 12. REACT - HOOKS
      // Critical React Hooks rules
      // ==========================================
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      
      // ==========================================
      // 13. REACT - PERFORMANCE & SAFETY
      // Prevent common performance bugs
      // ==========================================
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      
      // ==========================================
      // 14. REACT - COMPONENT DEFINITION
      // Consistency in component definitions
      // ==========================================
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      
      // ==========================================
      // 15. ACCESSIBILITY (A11Y)
      // Make the app usable for everyone
      // ==========================================
      ...jsxA11yPlugin.configs.recommended.rules,
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
  },

  // ========================================
  // TEST FILES - RELAXED RULES
  // ========================================
  {
    files: [
      '**/*.{test,spec}.{ts,tsx,js,jsx}',
      '**/__tests__/**/*.{ts,tsx,js,jsx}',
    ],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'max-lines-per-function': 'off',
      'react/display-name': 'off',
      'no-console': 'off',
    },
  },

  // ========================================
  // CONFIG FILES - RELAXED RULES
  // ========================================
  {
    files: ['*.config.{js,ts,mjs,mts}', 'vite.config.{js,ts}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
