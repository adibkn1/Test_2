const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/main.js',
  output: {
    filename: 'packed.js',
    path: path.resolve(__dirname, 'docs'),
  },
  optimization: {
    minimize: true, // Enable minimization for production
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    client: {
      overlay: false
    },
    compress: true,
    port: 9000,
  },
};