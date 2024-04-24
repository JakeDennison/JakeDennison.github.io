const path = require('path');

module.exports = {
  entry: './src/neo-datatables.js',
  mode: 'production',
  output: {
    filename: 'neo-datatables.js',
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