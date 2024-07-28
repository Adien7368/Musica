const path = require("path");

const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  entry: {
    index: "./app/index.tsx",
  },
  output: {
    path: dist,
    filename: "[name].js",
  },
  devServer: {
    static: {
      directory: dist,
    },
  },
  experiments: { asyncWebAssembly: true },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "wave-parser"),
      outDir: path.resolve(__dirname, "pkg"),
      outName: "musica",
    }),
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
  ],
};
