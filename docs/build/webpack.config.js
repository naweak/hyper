const path = require('path')

module.exports = {
  mode: "production",
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: [ 'babel-loader' ] },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  }
};
