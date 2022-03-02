module.exports = {
    parserOptions: {
        sourceType: 'module'
    },
    parser: 'babel-eslint',
    env: {
        node: true
    },
    extends: [
        'standard',
        'prettier',
    ],
    plugins: ['prettier', 'babel-plugin-add-import-extension'],
    rules: {
        'promise/catch-or-return': 'error',
        'prettier/prettier': [
            'error',
            {
                'singleQuote': true,
                'semi': false
            }
        ]
    }
}
