const path = require('path');


module.exports = {
    mode: 'production',
    optimization: {
        minimize: false
    },
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};
