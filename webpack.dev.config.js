var webpack = require('webpack');
var path = require('path');

module.exports = {
    name: 'development',
    target: 'web',
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://localhost:7777',
        'webpack/hot/only-dev-server'
    ],
    output: {
        path: '/',
        //path: path.resolve(__dirname, 'public'), // not in-memory
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        contentBase: '/',
        //contentBase: './public', // same as output path
        filename: 'bundle.js',
        proxy: {
            '**': 'http://localhost:8080'
        },
        historyApiFallback: true,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            }
        ]
    },
    resolve: {
        root: path.resolve('./src')
    },
};
