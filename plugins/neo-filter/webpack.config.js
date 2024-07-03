const path = require('path');

module.exports = {
  entry: './src/neo-filter.js',
  mode: 'production',
  output: {
    filename: 'neo-filter.js',
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
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add more extensions as needed
    alias: {
      '@mui/lab': '@mui/lab/esm', // Use the esm (ES modules) path
    },
  },
};