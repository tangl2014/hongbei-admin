const { resolve } = require('path');
let webpack = require('webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
let isProduct = process.env.NODE_ENV === 'production';
module.exports = {
    context: resolve(__dirname),
    entry: {
        vendor: [
            'babel-polyfill',
            'whatwg-fetch',
            'react',
            'react-dom',
            'react-router-dom',
            'redux',
            'react-redux',
            'classnames/bind'
        ],
        app: [
            '../src/index.js'
            // 我们 app 的入口文件
        ]
    },
    output: {
        path: resolve(__dirname, '../__dist/'),

        publicPath: '/',
        // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)

        filename: 'js/[name].js',
        // 输出的打包文件

        chunkFilename: '[id].js'
    },
    resolve: {
        alias: {
            'react': resolve(__dirname, '../node_modules/react'),
            'react-dom': resolve(__dirname, '../node_modules/react-dom'),
            '~less': resolve(__dirname, '../src/assets/less'),
            '~util': resolve(__dirname, '../src/util'),
            '~data': resolve(__dirname, '../src/data'),
            '~components': resolve(__dirname, '../src/components')
        }
    },
    stats: "normal",
    //控制要显示的 bundle 信息

    module: {
        rules: [{
                enforce: 'pre',
                test: /\.jsx?$/,
                use: 'eslint-loader',
                include: /src/
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: isProduct ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                browsers: ['last 10 versions']
                            })]
                        }
                    }]
                }) : ['style-loader',
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                browsers: ['last 10 versions']
                            })]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: isProduct ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoader: true,
                            localIdentName: '[name]-[local]-[hash:base64:6]'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                browsers: ['last 10 versions']
                            })]
                        }
                    }, 'less-loader']
                }) : ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoader: true,
                        localIdentName: '[name]-[local]-[hash:base64:6]'
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')({
                            browsers: ['last 10 versions']
                        })]
                    }
                }, 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }
        ]
    },

    plugins: [
         new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:6].css',
            allChunks: true
        }),
        // 单独提取入口依赖的css文件

        new OptimizeCssAssetsPlugin({
            // assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            minChunks: 3,
            chunks: ['app']
        }),

        new HtmlWebpackPlugin({
            title: 'admin',
            template: '../src/template/index.html',
            filename: 'index.html'
        })
    ]
};