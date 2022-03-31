
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


const environment = require('./environment');

module.exports = {
    entry: {
        app: path.resolve(environment.paths.source, 'js', 'app.js'),
      },
      output: {
        filename: 'js/[name].js',
        path: environment.paths.output,
      },
    module: {
        rules:[
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                  // Disables attributes processing
                  sources: false,
                },
              },
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: environment.server.host,
            port: environment.server.port,
            server: { baseDir: ['dist/'] }
            
        }),
        new MiniCssExtractPlugin({
            filename: 'css/app.css'
        }),
        new CopyPlugin({
            patterns: [
                {
                  from: "src/",
                  globOptions: {
                    dot: true,
                    gitignore: true,
                    ignore: [ "**/js/**", "**/scss/**"],
                  },
                },
              ],
          }),
    ],
}