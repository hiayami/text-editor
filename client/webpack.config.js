const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
      new WebpackPwaManifest({
        name: 'TextEddy',
        short_name: 'TextEddy',
        description: 'Text Editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      }),
      new MiniCssExtractPlugin(),
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules')
      ],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // {
        //   test: /\.(png|jpe?g|gif)$/i,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //     },
        //   ],
        // },
        // {
        //   test: /\.(js)$/,
        //   exclude: /node_modules/,
        //   use: ['babel-loader']
        // }
      ],
    },
  };
};
