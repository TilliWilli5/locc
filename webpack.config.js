const path = require("path");

module.exports = {
    entry: "./Source/locFacade.js",
    output:{
        path: path.resolve(__dirname, "Build/Development"),
        filename: "index.js",
        libraryTarget: "commonjs2",
    },
    mode: "development"
};