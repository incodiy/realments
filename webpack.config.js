const path = require('path');

module.exports = {
  entry: './resources/js/Index.js',
  output: {
    filename: 'realments.js',
    path: path.resolve(__dirname, 'public/vendor/realments/js'),
    library: 'Realments',
    libraryTarget: 'umd',
    globalObject: 'this',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
