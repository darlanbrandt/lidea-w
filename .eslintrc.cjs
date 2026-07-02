module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // O projeto usa o novo JSX transform — import React não é obrigatório
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.test.js'],
      env: {
        node: true,
      },
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
    },
    {
      files: ['vite.config.js', '.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    // Iterações anteriores do parser mantidas como referência (não são
    // importadas pelo código em produção — a lógica atual vive em
    // commandParser.js). Fora do lint para não travar o CI.
    'src/helpers/componentsActions/actionsHelper.js',
    'src/helpers/dictionaryBlockHelper.js',
    'src/helpers/parser/blocks/blocksParserDictionary.js',
    'src/helpers/parser/blocks/mathCommandsParser.js',
    'src/helpers/parser/blocks/operatorsParser.js',
    'src/helpers/parser/blocks/proceduresParser.js',
    'src/components/ai_components/helpers/commandsToExecuteHelper.js',
  ],
};
