module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-refresh',
    '@typescript-eslint',
    '@stylistic'
  ],
  rules: {
    'no-unused-vars': 'off', // @typescript-eslint/no-unused-vars is more accurate
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/member-delimiter-style': [
      'error', {
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'comma' }
      }
    ],
    '@stylistic/jsx-equals-spacing': ['error', 'never'],
    '@stylistic/jsx-curly-spacing': ['error', 'never'],
    '@stylistic/jsx-equals-spacing': ['error', 'never'],
    '@stylistic/jsx-first-prop-new-line': ['error', 'multiline'],
    '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
    '@stylistic/max-len': ['error', {
      code: 110,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true
    }],
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/indent': ['error', 2],
    'jsx-quotes': ['error', 'prefer-single'],
    'eol-last': ['error', 'always'],
    '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
    '@stylistic/block-spacing': ['error', 'always'],
    '@stylistic/jsx-pascal-case': ['error', { allowAllCaps: false }],
    '@stylistic/jsx-wrap-multilines': ['error', { declaration: 'parens-new-line' }],
    '@stylistic/jsx-sort-props': ['error', { ignoreCase: true }],
    '@stylistic/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never'
    }],
    '@stylistic/jsx-newline': ['error', { prevent: true }],
    '@stylistic/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'none' }],
    '@stylistic/jsx-indent': ['error', 2],
    '@stylistic/jsx-indent-props': ['error', 2]
  }
}
