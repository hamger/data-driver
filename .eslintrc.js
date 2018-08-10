const ERROR = 2;
const WARNING = 1;
const IGNORE = 0;

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: ['standard', 'standard-jsx'],
  rules: {
    'no-new': IGNORE,
    'no-useless-constructor': IGNORE,
    'operator-linebreak': [ERROR, 'after'],
    'no-proto': IGNORE,
    'new-cap': IGNORE,
    'no-useless-call': IGNORE,
    'comma-dangle': IGNORE
  }
}