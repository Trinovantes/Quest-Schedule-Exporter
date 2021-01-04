import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import templateConfig from './src/js/config.json'

const isDev = (process.env.NODE_ENV === 'development')

module.exports = {
    target: 'web',
    mode: process.env.NODE_ENV,
    devtool: isDev
        ? 'inline-source-map'
        : false,

    entry: path.resolve(__dirname, './src/js/main.ts'),
    output: {
        publicPath: '/',
        filename: isDev
            ? '[name].js'
            : '[name].[contenthash].js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.less'],
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules',
        ],
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
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: 'file-loader',
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader',
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
            template: path.resolve(__dirname, './src/index.hbs'),
            templateParameters: templateConfig,
            favicon: path.resolve(__dirname, './src/img/favicon.ico'),
        }),
    ],
}
