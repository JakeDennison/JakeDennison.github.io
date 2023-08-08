const path = require('path');

module.exports = {
  entry: './src/neo-gsl.js',
  mode: 'production',
  output: {
    filename: 'neo-gsl.js',
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