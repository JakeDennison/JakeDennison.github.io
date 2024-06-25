const path = require('path');

module.exports = {
  entry: './src/neo-cards.js',
  mode: 'production',
  output: {
    filename: 'neo-cards.js',
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};