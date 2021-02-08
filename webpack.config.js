const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
  mode: "production",
  watch: false,
  entry: path.join(__dirname, "_webpack", "js/main.js"),
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "bower_components"),
        ],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-syntax-class-properties", "@babel/plugin-proposal-class-properties"]
        },
      },
      {
         test:/\.(s*)css$/,
         use:[MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [new MiniCssExtractPlugin({filename: "[name].css"})],
};