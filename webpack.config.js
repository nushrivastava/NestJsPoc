const path = require('path');
const webpack = require('webpack');
var nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const isProduction = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const NODE_ENV = isProduction ? 'production' : 'development';

console.log(`-- Webpack <${NODE_ENV}> build --`);

module.exports = {
  entry: './src/main.ts',
  mode: NODE_ENV,
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new webpack.IgnorePlugin({
      /**
       * There is a small problem with Nest's idea of lazy require() calls,
       * Webpack tries to load these lazy imports that you may not be using,
       * so we must explicitly handle the issue.
       * Refer to: https://github.com/nestjs/nest/issues/1706
       */
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/platform-express',
          '@nestjs/mongoose',
          'mongoose',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    /**Once webpack builds the source code into JS files it will replace the config values in code as per environement set in code i.e. production or development */
    new webpack.DefinePlugin({
    //   CONFIG: JSON.stringify(require("config"))
    }),
    /** run TSLint at build time */
    new ForkTsCheckerWebpackPlugin({
    //   tslint: true
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        /*options: {
          transpileOnly: true
        },*/
        exclude: /node_modules/
      }
    ],
  },
  stats: {
    // This is optional, but it hides noisey warnings
    warningsFilter: [
      'node_modules/express/lib/view.js',
      'node_modules/@nestjs/common/utils/load-package.util.js',
      'node_modules/@nestjs/core/helpers/load-adapter.js',
      'node_modules/optional/optional.js',
      warning => false,
    ],
  },
};
