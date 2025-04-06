// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    // '@typescript-eslint/await-thenable': 'error',
    quotes: ['error', 'single'],
    'object-shorthand': ['error', 'always'],
    // '@typescript-eslint/no-unnecessary-condition': 'error',
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prettier/prettier': 'error',
  },
  globals: {
    React: 'writable',
  },
  ignorePatterns: ['/dist/*'],
};

