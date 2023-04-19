const path = require('path');

module.exports = {
  entry: './src/neo-carousel.js',
  mode: 'production',
  output: {
    filename: 'neo-carousel.js',
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
        use: ['style-loader', 'css-loader']
      }
    ],
  },
};
