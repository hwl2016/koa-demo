const path = require('path');

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
            alias: {

            }
        },
        devtool: 'source-map',
        target: 'node',
        // externals: [
        //     nodeExternals({
        //         whitelist: [ 
        //             IGNORE_HYSDK, 
        //             IGNORE_PAYGA, 
        //             IGNORE_HYSDK_FUSION
        //         ]
        //     })
        // ],
        // plugins: (function () {
        //     var plugins = [
        //         new webpack.NormalModuleReplacementPlugin(
        //             new RegExp(IGNORE_HYSDK), NOOP_MODULE
        //         ),
        //         new webpack.NormalModuleReplacementPlugin(
        //             new RegExp(IGNORE_PAYGA), NOOP_MODULE
        //         ),
        //         new CopyWebpackPlugin([{
        //                 from: path.resolve(__dirname, '../src/favicon.ico'),
        //                 to:path.resolve(__dirname, '../bin/favicon.ico')
        //             },{
        //                 from: path.resolve(__dirname, '../src/config.js'),
        //                 to:path.resolve(__dirname, '../bin/config.js')
        //             },{
        //                 from: path.resolve(__dirname, '../src/views'),
        //                 to:path.resolve(__dirname, '../bin/views')
        //             }
        //         ]),
        //         new PostPlugins({
        //             onDone: config.nodePlugins.onDone
        //         })
        //     ].concat(config.plugins);
        //     return plugins;
        // })()
    }
]