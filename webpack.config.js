const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/app.jsx",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
      }
    ]
  },
  devtool: 'source-map',
  externals: {
    react: 'React',
    'react-dom':  'ReactDOM'
  },
  resolve: {
    alias: {
      "ag-grid-root" : "../node_modules/ag-grid"
    },
    extensions: [".js", ".jsx"],

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: './dist'
  }
};
