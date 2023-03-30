const path = require('path');

module.exports = {
  entry: './src/neo-anno.js',
  mode: 'production',
  output: {
    filename: 'neo-anno.js',
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