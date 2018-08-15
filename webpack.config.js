const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./calculator.js",
  output: {
    path: path.resolve(__dirname, "/public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "react",
              "stage-0",
              ["env", { targets: { browsers: ["last 2 versions"] } }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]_[local]--[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./public"
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
