const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    port: process.env.PORT || 3000,
    historyApiFallback: true,
  },
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        workorder: 'workorder@http://localhost:3001/remoteEntry.js',
        asset: 'asset@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          eager: true,
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.8.1',
        },
        '@mui/material': {
          singleton: true,
          requiredVersion: '^5.11.10',
        },
        '@emotion/react': {
          singleton: true,
          requiredVersion: '^11.10.5',
        },
        '@emotion/styled': {
          singleton: true,
          requiredVersion: '^11.10.5',
        },
        'i18next': {
          singleton: true,
          requiredVersion: '^23.7.6',
        },
        'react-i18next': {
          singleton: true,
          requiredVersion: '^13.5.0',
        },
        'i18next-browser-languagedetector': {
          singleton: true,
          requiredVersion: '^7.2.0',
        },
        'shared': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/locales'),
          to: path.resolve(__dirname, 'dist/locales'),
        },
      ],
    }),
  ],
};
