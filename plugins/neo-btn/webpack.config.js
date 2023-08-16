const path = require('path');

module.exports = {
  entry: './src/neo-btn.js',
  mode: 'production',
  output: {
    filename: 'neo-btn.js',
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