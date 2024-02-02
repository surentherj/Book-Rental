module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    plugins: ['react', 'react-hooks'],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      // Disable unused imports warning
      'no-unused-vars': 'off',
      'react/jsx-uses-vars': 'off',
      'react-hooks/exhaustive-deps': 'warn',
    },
  };
  