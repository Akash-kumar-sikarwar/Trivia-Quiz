const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require("webpack");

module.exports ={
    entry: './src/index.js',
    module: {
        rules:[
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
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
    mode: 'development',
}