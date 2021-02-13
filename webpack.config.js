const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const isDevelpment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelpment ? "development" : "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: isDevelpment ? "js/[name].[hash].js" : "js/[name].[hash].min.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: isDevelpment ? "inline-source-map": "source-map",
  devServer: {
    contentBase: "dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*","!manifest.json","!assets"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
