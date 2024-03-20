const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfills for missing modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    querystring: require.resolve('querystring-es3'),
    crypto: require.resolve('crypto-browserify'),
    fs: false,
    path: require.resolve('path-browserify'),
    buffer: require.resolve('buffer/'),
    vm: require.resolve('vm-browserify'),
    // Add polyfill for process
    process: require.resolve('process/browser'),
  };

  // Provide process global
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};
