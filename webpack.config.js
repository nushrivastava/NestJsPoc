const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const config = require('config');
const isProduction = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

module.exports = {
    entry: [
      'webpack/hot/poll?100',
      './src/main.ts',
    ],
    optimization: {
        minimize: false,
    },
    target: 'node',
    mode,
    externals: [
      nodeExternals({
          allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                },
                exclude: /node_modules/,
              }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),        
        new webpack.DefinePlugin(
            { 
                // CONFIG: JSON.stringify(config) 
            }
        ),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js',
    },
};