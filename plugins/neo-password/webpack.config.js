const path = require('path');

module.exports = {
  entry: './src/neo-password.js',
  mode: 'production',
  output: {
    filename: 'neo-password.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};