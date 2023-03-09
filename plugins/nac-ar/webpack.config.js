const path = require('path');

module.exports = {
  entry: './src/nac-ar.js',
  mode: 'production',
  output: {
    filename: 'nac-ar.js',
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