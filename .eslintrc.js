module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'standard'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'no-new': 0,
    'no-useless-constructor': 0,
    indent: [2, 2],
    'no-tabs': 2,
    'operator-linebreak': ["error", "after"],
    'no-proto': 0,
    'new-cap': 0,
    'no-useless-call': 0
  }
}
