let path                = require("path"),
    webpack             = require("webpack"),
    CleanWebpackPlugin  = require("clean-webpack-plugin"),
    VirtualModulePlugin = require("virtual-module-webpack-plugin"),
    FlowtypePlugin      = require("flowtype-loader/plugin"),
    appConfig           = require("common-config")

module.exports = {
    entry: {
        bundle: "./src/index.js",
        vendor: [
            "babel-polyfill",
            "react",
            "react-dom",
            "react-redux",
            "react-router-dom",
            "lodash",
            "moment",
            "uikit"
        ]
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "./dist",
        chunkFilename: "[chunkhash].js",
        filename: "[name].js"
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, "../dist")
        ]),

        new VirtualModulePlugin({
            moduleName: "config.json",
            contents: appConfig
        }),

        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ]),

        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"],
            filename: "vendor.js",
            minChunks: Infinity
        }),

        new FlowtypePlugin()
    ],
    module: {
        rules: [
            // JS loader via babel
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["flow","env","react"],
                        plugins: [
                            "autobind-class-methods",
                            "transform-class-properties",
                            "transform-export-extensions",
                            "add-module-exports"
                        ]
                    }
                }
            },

            // CSS loader
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },

            // Stylus loader with CSS Modules
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    {loader: "css-loader", options: {
                        modules: true,
                        sourceMap: true,
                        camelCase: true,
                        localIdentName: "[hash:base64:5]"
                    }},
                    {loader: "stylus-loader", options: {
                        preferPathResolver: "webpack"
                    }}
                ]
            },

            // Image file loader
            {
                test: /\.(png|jpg)$/,
                use: [
                    {loader: "url-loader", options: {
                        limit: 8192,
                        name: "images/[name].[ext]",
                        publicPath: "/assets/"
                    }}
                ]
            },

            {
                test: /\.js$/, 
                loader: "flowtype-loader", 
                enforce: "pre", 
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        modules: [
            path.resolve(__dirname, ".."),
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../node_modules")
        ],
        extensions: [".js",".json",".styl",".png",".jpg"],
    }
}