const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require("webpack");

module.exports ={
    entry: './src/index.js',
    module: {
        rules:[
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']},
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=8192', },
            { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, options: {name: '[path][name].[ext]'},loader: "file-loader" }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index_bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // new EnvironmentPlugin({
        //     'NODE_ENV': 'development'
        // })
    ],
    mode: 'production',
}
