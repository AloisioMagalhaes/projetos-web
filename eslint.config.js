module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: 'plugin:@typescript-eslint/parser', // Parser moved here
    },
    parserOptions: {
      project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      // Regras personalizadas aqui
    },
  },
];
