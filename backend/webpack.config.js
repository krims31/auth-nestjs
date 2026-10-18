const webpack = require('webpack');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: options.entry,
    output: {
      filename: 'main.js',
      path: __dirname,
    },
    externals: [],
  };
};
