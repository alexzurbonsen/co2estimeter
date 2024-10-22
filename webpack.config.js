// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
// SPDX-FileCopyrightText: Copyright (c) Abhijith Vijayan <email@abhijithvijayan.in> (https://abhijithvijayan.in)
//
// SPDX-License-Identifier: MIT AND Apache-2.0
const {
  WebextensionPlugin,
} = require('@webextension-toolbox/webpack-webextension-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const JSON5 = require('json5');
const fs = require('fs');
const packageJSON = require('./package.json');

const tsConfigString = fs.readFileSync('./tsconfig.json', 'utf8');
const tsConfig = JSON5.parse(tsConfigString);

const sourcePath = path.join(__dirname, tsConfig.compilerOptions.rootDir);
const outputPath = path.join(__dirname, tsConfig.compilerOptions.outDir);
const description = packageJSON.description;
const version = packageJSON.version;

function getZipFileName(browser) {
  return `${packageJSON.name}_${browser}.zip`;
}

module.exports = (env) => {
  return {
    mode: env.mode,
    // WebextensionPlugin assumes that manifest.json is top level in context
    // https://github.com/webextension-toolbox/webpack-webextension-plugin/blob/ff770e789f9d4e8ad20009ab244ff466905ea92b/src/plugin/index.ts#L373
    context: sourcePath,
    entry: {
      background: path.join(sourcePath, 'background-script', 'main.ts'),
      content: path.join(sourcePath, 'content-script', 'main.ts'),
      popup: path.join(sourcePath, 'popup', 'index.tsx'),
    },
    output: {
      path: path.join(outputPath, env.browser),
      filename: 'js/[name].bundle.js',
    },
    // TODO I saw examples were node modules were excluded, need to understand why
    module: {
      rules: [
        // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
      ],
    },
    resolve: {
      // resolve extensions in order, enables users to leave off the extension when importing
      // webpack will resolve the one with the extension listed first in the array and skip the rest
      extensions: ['.tsx', '.ts', '.js', '.json'],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        '.js': ['.js', '.ts'],
        '.cjs': ['.cjs', '.cts'],
        '.mjs': ['.mjs', '.mts'],
      },
    },
    // include source maps in bundle
    // "Even if it is not the best recommendation from the Webpack documentation, only the “inline” type works on Firefox."
    // https://medium.com/@Morikko/developing-your-web-extension-with-the-best-tools-213207c2b6b5
    devtool: 'inline-source-map',
    plugins: [
      new WebextensionPlugin({
        vendor: env.browser,
        manifestDefaults: {
          description,
          version,
        },
        autoreload: env.mode === 'development' ? true : false,
      }),
      // following plugins are adapted from
      // https://github.com/abhijithvijayan/web-extension-starter/blob/react-typescript/webpack.config.js
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(`${outputPath}`, `${env.browser}`),
          path.join(`${outputPath}`, `${getZipFileName(env.browser)}`),
        ],
        cleanStaleWebpackAssets: false,
        verbose: true,
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: `${sourcePath}/assets`, to: 'assets' }],
      }),
      // TODO not sure about this config yet
      new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'popup', 'popup.html'),
        inject: 'body',
        chunks: ['popup'],
        hash: true,
        filename: 'popup.html',
      }),
    ],

    // mostly copied from https://github.com/abhijithvijayan/web-extension-starter/blob/react-typescript/webpack.config.js
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 1500000, // Mozilla Add On platform allows for file size of max. 4MB, this combination gave me chunks within size limits (note that maxSize is a hint, not a guarantee, see https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksmaxsize)
        minSize: 500000,
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
        new FileManagerPlugin({
          events: {
            onEnd: {
              archive: [
                {
                  format: 'zip',
                  source: path.join(outputPath, env.browser),
                  destination: `${path.join(outputPath, getZipFileName(env.browser))}`,
                  options: { zlib: { level: 6 } },
                },
              ],
            },
          },
        }),
      ],
    },
  };
};
