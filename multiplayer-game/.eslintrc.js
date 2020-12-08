module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  },
  globals: {
    io: true
  }
}
