const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.jsx",
  resolve: {
    extensions: ["", ".js", ".jsx", ".css"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify"),
      url: require.resolve("url"),
      "process/browser": require.resolve("process/browser"),
      fs: false,
      path: false,
      zlib: false,
      net: false,
      tls: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new CleanWebpackPlugin(),
    new Dotenv(),
  ],
  ignoreWarnings: [/xhr2-cookies/],
};
