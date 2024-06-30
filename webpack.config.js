import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';

const dist = path.resolve(__dirname, "dist");

export default {
  mode: "production",
  entry: {
    index: "./app/index.tsx"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    static: {
      directory: dist
    }
  },
  experiments: {asyncWebAssembly: true},

  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname,"wave-parser"),
      outDir: path.resolve(__dirname,"pkg"),
      outName: "musica"
      
    }),
    new HtmlWebpackPlugin()
  ]
};