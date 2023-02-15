const path = require('path');

module.exports = {
  entry: './src/nac-anno.js',
  mode: 'development',
  output: {
    filename: 'nac-anno.js',
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