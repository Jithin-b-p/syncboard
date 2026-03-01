import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  // 1. Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/*.config.mjs',
      'eslint.config.mjs',
    ],
  },

  // 2. TypeScript source files (with type-aware linting)
  ...tseslint.config({
    files: ['apps/**/src/**/*.ts', 'apps/**/src/**/*.tsx'],
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: ['./apps/api/tsconfig.json', './apps/web/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname, // or process.cwd() if using CommonJS
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  }),

  // 3. Test files (no type-aware linting)
  ...tseslint.config({
    files: ['**/*.spec.ts', '**/*.test.ts', 'apps/**/test/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  }),

  // 4. Prettier (must be last to disable conflicting rules)
  prettier,
];
