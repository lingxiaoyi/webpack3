const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');


module.exports = {
    entry: {
        index:'./src/pages/index/index_tt.js'/*,
        data:'./src/pages/data/data_all.js'*/
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: [ '.js', '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",// 将 CSS 转化成 CommonJS 模块
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        } // 将 Sass 编译成 CSS
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: './static/img/[hash].[ext]',
                },
            },
            /*,
            {
                test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
                loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
            }*/
        ]
    },

    plugins: [
        //new ForkCheckerPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        new HtmlWebpackPlugin({
            template: './src/pages/index/index.html',
            chunksSortMode: 'dependency'
        }),
        /*,
        new HtmlWebpackPlugin({
            template: './src/pages/index/data_all.html',
            chunksSortMode: 'dependency'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            'WebStorageCache':'WebStorageCache'
        })*/
    ],
    externals: {
        'jquery': 'window.jQuery',
    },
}