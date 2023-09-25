const path = require('path');

module.exports = {
  entry: './src/neo-listviewer.ts',  // Change this to .ts
  mode: 'production',
  output: {
    filename: 'neo-listviewer.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,       // New rule for .ts files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
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
  resolve: {
    extensions: ['.ts', '.js'],  // Recognize .ts files
  },
};
