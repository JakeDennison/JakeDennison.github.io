const path = require('path');

module.exports = {
  entry: './src/neo-pagehold.js',
  mode: 'production',
  output: {
    filename: 'neo-pagehold.js',
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