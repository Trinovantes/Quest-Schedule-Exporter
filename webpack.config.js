const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    target: 'web',
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, './src/js/main.ts'),

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css'],
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules',
        ],
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
                    'style-loader',
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
                use: "handlebars-loader",
            },
        ],
    },

    externals: {
        jquery: 'jQuery'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.hbs'),
            templateParameters: require('./src/js/config.json'),
            favicon: path.resolve(__dirname, './src/img/favicon.ico'),
        }),
    ],
};
  