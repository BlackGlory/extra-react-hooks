module.exports = {
  root: true
, parser: '@typescript-eslint/parser'
, plugins: [
    '@typescript-eslint'
  , 'react-hooks'
  ]
, extends: [
    'eslint:recommended'
  , 'plugin:@typescript-eslint/recommended'
  , 'plugin:react-hooks/recommended'
  ]
, rules: {
    '@typescript-eslint/ban-types': 'off'
  , '@typescript-eslint/ban-ts-comment': 'off'
  , '@typescript-eslint/no-extra-semi': 'off'
  , '@typescript-eslint/no-inferrable-types': 'off'
  }
}
