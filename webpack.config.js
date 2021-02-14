const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: isDevelopment ? "js/[name].[chunkhash].js" : "js/[name].[chunkhash].min.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: isDevelopment ? "inline-source-map": "source-map",
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
    !isDevelopment ? new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ["**/*","!manifest.json"]
    }) : false,
    new CopyPlugin({
      patterns: [
        {from:"src/assets", to: "assets"},
        {from:"src/manifest.json", to: "manifest.json"}
      ]
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ].filter(Boolean),
};
