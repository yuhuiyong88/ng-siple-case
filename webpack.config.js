var webpack = require('webpack');
const path=require("path");
module.exports = {
    entry:{
        index:'./src/js/index.js',
        list:"./src/js/list.js",
        detail:"./src/js/detail.js",
        orderWrite:"./src/js/orderWrite.js"
    },
    output:{
        path:path.join(__dirname,"/dist/js"),
        filename:'[name].js'
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                loader:  'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['es2015']}
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
}