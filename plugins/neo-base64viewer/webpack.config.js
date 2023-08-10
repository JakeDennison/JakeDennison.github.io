const path = require('path');

module.exports = {
  entry: './src/neo-base64viewer.js',
  mode: 'production',
  output: {
    filename: 'neo-base64viewer.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
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