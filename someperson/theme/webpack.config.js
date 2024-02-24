const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");
const path = require("path");


class SomePersonPlugin {
    constructor({filename}) {
        this.filename = filename;
    }

    apply(compiler) {
        compiler.hooks.done.tap(this.constructor.name, stats => {
            const info = {
                hash: stats.hash,
            };
            const json = JSON.stringify(info);
            return new Promise((resolve, reject) => {
                fs.writeFile(path.join(compiler.outputPath, this.filename), json, "utf8", error => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                });
            });
        });
    }
}

module.exports = {
    mode: "production",
    watch: false,
    entry: path.join(__dirname, "static_src", "js/main.js"),
    output: {
        clean: true,
        filename: "[name].[fullhash].js",
        path: path.resolve(__dirname, "static"),
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "bower_components"),
                ],
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/plugin-syntax-class-properties", "@babel/plugin-transform-class-properties"]
                },
            },
            {
                test:/\.(s*)css$/,
                use:[MiniCssExtractPlugin.loader,"css-loader", "sass-loader"]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[fullhash].css"}),
        new SomePersonPlugin({filename: "main.json"})
    ],
};
