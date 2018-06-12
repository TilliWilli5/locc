const path = require("path");

module.exports = {
    entry: "./Source/locFacade.js",
    output:{
        path: path.resolve(__dirname, "Artifacts/Npm"),
        // filename: "index.js",
        // libraryTarget: "commonjs2",
    },
    mode: "production"
};