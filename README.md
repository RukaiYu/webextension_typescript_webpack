## A minimal webextension template

This is a minimal template to get a webextension based on webpack and typescript. \
I have installed only the bare minimum of required packages and tried to keep the layout intuitive.

### Getting started
 - `git clone https://github.com/lhk/webextension_typescript_webpack.git`
 - `npm install -d`
 - `webpack`
 
Now you can load the extension into your Browser. Tested on Firefox and Chrome.

### Customizing
Just edit `package.json` and `manifest.json`, then you should be good to go :)

### Please note
To support chrome, I have used webextension-polyfill. Getting this to work with webpack.ProvidePlugin is not trivial.
Don't worry, it should work out of the box. Thanks to this great reference: https://github.com/fstanis/webextensions-webpack-boilerplate

If you want to read up on it: https://github.com/mozilla/webextension-polyfill/pull/86
