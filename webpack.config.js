const webpack = require("webpack");
const path = require('path');

const SRC_DIR = path.join(__dirname, "src");
const DIST_DIR = path.join(__dirname, "dist");
const MANIFEST_FILE = "manifest.json";
const MANIFEST_PATH = path.join(SRC_DIR, MANIFEST_FILE);

// don't forget to add asset extensions here, if you want them copied over to dist
const ASSET_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg'];


module.exports = {
  entry: {
      manifest: MANIFEST_PATH,
      content_script: path.join(SRC_DIR, "content/index.ts"),
      background_script: path.join(SRC_DIR, "background/index.ts"),
      popup_script: path.join(SRC_DIR, "popup/index.ts")
    },
  output: {
      path: DIST_DIR,
      filename: "[name]"
  },
  module: {
    rules: [
      { 
        test: /\.json$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
          { loader: 'extricate-loader' },
          { loader: 'interpolate-loader' }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'ts-loader'
      },
      {
        test: /\.html$/,
        use: [
          'file-loader',
          'extract-loader', {
            loader: 'html-loader',
            options: {
              attrs: [
                'link:href',
                'script:src',
                'img:src'
              ]
            }}]
      },
      {
        test: /\.css$/,
        use: [
          'file-loader',
          'extricate-loader',
          'css-loader'
        ]
      },
      {
        test: new RegExp('\.(' + ASSET_EXTENSIONS.join('|') + ')$'),
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }
      },
      {
        test: require.resolve('webextension-polyfill'),
        use: 'imports-loader?browser=>undefined'
      }
    ]
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