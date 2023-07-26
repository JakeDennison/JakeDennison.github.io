const path = require('path');

module.exports = {
  entry: './src/neo-rsfiller.js',
  mode: 'production',
  output: {
    filename: 'neo-rsfiller.js',
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