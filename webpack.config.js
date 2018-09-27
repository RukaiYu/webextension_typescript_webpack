const webpack = require("webpack");
const path = require('path');

const SRC_DIR = path.join(__dirname, "src");
const DIST_DIR = path.join(__dirname, "dist");

// don't forget to add asset extensions here, if you want them copied over to dist
const ASSET_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg'];

const IS_PRODUCTION = false;


module.exports = {
    // there are three entry points, for the three components of our plugin
    entry: {
        content_script: path.join(SRC_DIR, 'content/index.ts'),
        background: path.join(SRC_DIR, 'background/index.ts'),
        popup: path.join(SRC_DIR, "popup/index.ts")
    },
    // each entry point will be compiled to a correspondingly named output
    output: {
        path: DIST_DIR,
        filename: '[name].js'
    },
    // in addition to that, these rules will carry html, css, etc over to dist
    module: {
        rules: [

            // a rule for typescript code
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'ts-loader'
            },

            // a rule for html
            {
                test: /\.html$/,
                use: [
                    'file-loader',
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: IS_PRODUCTION,
                            attrs: [
                                'link:href',
                                'script:src',
                                'img:src'
                            ]
                        }
                    }
                ]
            },

            // a rule for css
            {
                test: /\.css$/,
                use: [
                    'file-loader',
                    'extract-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: IS_PRODUCTION
                        }
                    }
                ]
            },

            // a rule for assets
            {
                test: new RegExp('\.(' + ASSET_EXTENSIONS.join('|') + ')$'),
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/'
                    }
                }
            },

            // a trick to include the webext polyfill if necessary
            {
                test: require.resolve('webextension-polyfill'),
                use: 'imports-loader?browser=>undefined'
            }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            browser: "webextension-polyfill"
        })
    ],
    devtool: "inline-source-map"
};