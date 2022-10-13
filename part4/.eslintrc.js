module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: 'airbnb',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'never',
        ],
    },
}
