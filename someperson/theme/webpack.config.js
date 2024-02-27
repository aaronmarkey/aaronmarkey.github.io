const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizePlugin = require("optimize-plugin");
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
        module: true,
        clean: true,
        filename: "[name].[fullhash].js",
        path: path.resolve(__dirname, "static"),
    },
    experiments: {
        outputModule: true
    },
    target: ["web", "es2022"],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "esbuild-loader",
                options: {
                    target: "es2022"
                }
            },
            {
                test:/\.(s*)css$/,
                use:[MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].[fullhash].css"}),
        new OptimizePlugin({concurrency: false}),
        new SomePersonPlugin({filename: "main.json"})
    ],
};
