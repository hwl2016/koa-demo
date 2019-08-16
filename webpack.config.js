const path = require('path');
const IS_PRD = false;

const ExtTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HappyPack = require('happypack')
const webpack = require('webpack')

const resolveAlias = {
    $pages: path.resolve(__dirname, './src/pages'),
    $utils: path.resolve(__dirname, './src/utils'),
    $apis: path.resolve(__dirname, './src/apis'),
    $coms: path.resolve(__dirname, './src/coms'),
    $router: path.resolve(__dirname, './src/router')
}

module.exports = [
    {
        node: {
            __dirname: false,
            __filename: true,
            setImmediate: true,
            console: true,
            global: true,
            process: true,
            Buffer: true
        },
        name: 'node',
        entry: {
            "app": path.resolve(__dirname, "./app.js")
        },
        output: {
            path: path.resolve(__dirname, "./bin"),
            filename: "[name].js",
            libraryTarget: "commonjs2",
            devtoolModuleFilenameTemplate: "[absolute-resource-path]",
            devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            extensions: [
                '.ts', '.tsx', '.js'
            ],
            alias: resolveAlias
        },
        devtool: 'source-map',
        target: 'node'
    },
    {
        name: 'browser',
        entry: {
            home: './src/pages/home/index.js'
        },
        output: {
            path: path.resolve(__dirname, `./${IS_PRD ? "prd" : "dev"}`), 
            filename: IS_PRD ? "[name]@[hash].js" : "[name]@null.js",
            libraryTarget: "umd"
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtTextPlugin.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: !IS_PRD
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(sass|scss)$/,
                    loader: ExtTextPlugin.extract('happypack/loader?id=css')
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=8192'
                },
                {
                    test: /\.(js|jsx)/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            alias: resolveAlias,
            extensions: [
                '.ts',
                '.tsx',
                '.css',
                '.scss',
                '.js'
            ]
        },
        plugins: [
            new HappyPack({
                id: "jsFront",
                loaders: [
                    'cache-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                'babel-preset-preact'
                            ],
                            compact: true
                        }
                    }
                ]
            }),
            new HappyPack({
                id: "css",
                loaders: [
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: !IS_PRD
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: !IS_PRD
                        }
                    }
                ]
            }),
            new ExtTextPlugin({
                filename: IS_PRD ? "[name]@[hash].css" : "[name]@null.css"
            }),
            new OptimizeCssAssetsPlugin(),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('postcss-cssnext'), //default
                cssProcessorOptions: {
                    warnForDuplicates: false,
                    browsers: ["> 0.1% in CN", "last 2 versions"]
                }
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: "vendor",
            //     minChunks: function (module) {
            //         return module.context && module.context.indexOf('node_modules') !== -1;
            //     }
            // }),
            new webpack.ProvidePlugin({ 'Promise': 'promise-polyfill' }),
            new UglifyJSPlugin({
                parallel: true,
                cache: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        comments: false,
                        ascii_only: true
                    },
                    sourceMap: false
                }
            })
        ],
        devtool: 'source-map'
    }
]