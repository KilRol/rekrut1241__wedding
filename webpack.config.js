const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let isDev = process.env.NODE_ENV === 'development'
let isProd = process.env.NODE_ENV === 'production'

const filename = ext => isDev ? `[name].${ext}` :`[name].[contenthash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: './index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        open: true,
        port: 9000,
        writeToDisk: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "Сергей и Анастасия",
            template: "./index.html",
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                },
            ],
            options: {
                concurrency: 100
            }
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],

            },
            {
                test: /\.(png|svg|gif|jpg|jpeg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/i,
                type: "asset/resource"
            },
        ]
    },
    optimization: {
        minimize: isProd,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    }
}