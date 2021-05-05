import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { Configuration } from 'webpack'
import Handlebars from 'handlebars'
import templateConfig from './src/js/config.json'

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

// Assume we are running webpack from the project root (../)
const isDev = (process.env.NODE_ENV === 'development')

const rootDir = path.resolve()
const srcDir = path.resolve(rootDir, 'src')

// ----------------------------------------------------------------------------
// Base
// ----------------------------------------------------------------------------

const commonConfig: Configuration = {
    target: 'web',

    mode: isDev
        ? 'development'
        : 'production',
    devtool: isDev
        ? 'source-map'
        : false,

    entry: path.resolve(srcDir, 'main.ts'),
    output: {
        filename: isDev
            ? '[name].js'
            : '[name].[contenthash].js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', 'scss', '.css'],
    },

    externals: {
        jquery: 'jQuery',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: 'asset',
            },
            {
                test: /\.hbs$/i,
                loader: 'html-loader',
                options: {
                    preprocessor: (input: string): string => {
                        const template = Handlebars.compile(input)
                        return template(templateConfig)
                    },
                },
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev
                ? '[name].css'
                : '[name].[contenthash].css',
            chunkFilename: isDev
                ? '[id].css'
                : '[id].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDir, 'index.hbs'),
            favicon: path.resolve(srcDir, 'img/favicon.ico'),
        }),
    ],
}

export default commonConfig
