const webpack = require("webpack");
const path = require('path');

const SRC_DIR = path.join(__dirname, "src")
const DIST_DIR = path.join(__dirname, "dist/js")

module.exports = {
    entry: {
        content_script: path.join(SRC_DIR, 'content_script.ts'),
        background: path.join(SRC_DIR, 'background.ts')
    },
    output: {
        path: DIST_DIR,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: 'ts-loader'
        },
        {
            test: require.resolve('webextension-polyfill'),
            use: 'imports-loader?browser=>undefined'
          }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins:[
        new webpack.ProvidePlugin({
            browser: "webextension-polyfill"
        })
    ],
    devtool: "inline-source-map"
};