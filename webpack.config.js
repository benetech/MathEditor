const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    var debug = (env && env.debug);
    var plugins = [
        htmlWebpackPlugin,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({
            DEBUG_MODE: debug
        }),
        new MiniCssExtractPlugin({
            filename: debug ? '[name].css' : '[name].[hash].css',
            chunkFilename: debug ? '[id].css' : '[id].[hash].css'
        }),
        new CopyWebpackPlugin([{
            from: 'node_modules/speech-rule-engine/lib/sre_browser.js',
            to: 'libs/speech-rule-engine/lib/sre_browser.js'
        }]),
    ];
    var path = require('path');
    if (!debug) {
        plugins.push(new webpack.IgnorePlugin(/mathlive\/src\/mathlive.js/));
    }
    return {
        resolveLoader: {
            modules: [path.join(__dirname, 'node_modules')]
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /node_modules/,
                    loader: [
                        debug ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                camelCase: true,
                                sourceMap: debug
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: debug
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    include: [
                        /src(\/|\\)components/
                    ],
                    use: [{
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: "[name]_[local]_[hash:base64]",
                                sourceMap: true,
                                minimize: true
                            }
                        },
                    ]
                },
                {
                    test: /\.(jpg|png|gif|pdf|ico)$/,
                    include: /images/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        },
                    }, ]
                },
                {
                    test: /\.css$/,
                    include: [
                        /node_modules(\/|\\)react-notifications/,
                        /node_modules(\/|\\)bootstrap/,
                        /src(\/|\\)lib/,
                        /src(\/|\\)styles/
                    ],
                    use: [{
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
                    loader: 'file-loader?publicPath=/&name=fonts/[name].[ext]'
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: [/node_modules/, /dist/, /src(\/|\\)lib/],
                    loaders: ['eslint-loader']
                }
            ]
        },
        devServer: {
            port: 3000
        },
        plugins: plugins,
        resolve: {
            extensions: ['.js', '.css', '.scss']
        }
    }
};
