const path = require("path");

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      { pattern: "src/**/*.spec.ts", watched: false }
    ],

    preprocessors: {
      "src/**/*.spec.ts": ["webpack"]
    },

    webpack: {
      mode: "development",
      resolve: {
        extensions: [".ts", ".js"],
        alias: {
          "@": path.resolve(__dirname, "src")
        }
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                configFile: "tsconfig.karma.json"
              }
            },
            exclude: /node_modules/
          }
        ]
      }
    },

    browsers: ["ChromeHeadless"],
    singleRun: true
  });
};
