const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/content-scripts.js",
  output: {
    filename: "content-scripts-output.js",
    path: path.resolve(__dirname, "dist"),
  },
};
