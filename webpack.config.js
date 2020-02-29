const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


const clientConfig = {
  mode: "development",
  // mode: "production",
  devtool: "source-map",
  entry: "./src/public/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'index.js'
  },
  target: "web",
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader?modules']
    }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html"
    })
  ]
}

const serverConfig = {
  mode: "development", // <- 圧縮無効 早い
  // mode: "production", // <- 圧縮有効 遅い
  devtool: "production",
  entry: "./src/index.ts",
  output: {
    filename: `server.js`,
    path: `${__dirname}/dist`
  },
  target: "node",
  /* outDirはtsconfig.jsonのものが有効になる */
  node: {
    __dirname: false,
    __firename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new NodemonPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js"]
  }
}

module.exports = [clientConfig, serverConfig]