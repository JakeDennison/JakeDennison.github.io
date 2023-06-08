const path = require('path');

module.exports = {
  entry: './src/neo-multi.js',
  mode: 'production',
  output: {
    filename: 'neo-multi.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};