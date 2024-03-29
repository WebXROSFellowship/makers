const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const IgnoreEmitPlugin = require("ignore-emit-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const ModuleResolverPlugin = require("babel-plugin-module-resolver");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const proxyUrl = "https://makers:8893/";

function getEntries(pattern, outputName) {
  const files = glob.sync(pattern);
  const entries = {};

  if (files.length > 0) {
    entries[outputName] = files.reduce((acc, file) => {
      acc.push("./" + file);
      return acc;
    }, []);
  }

  return entries;
}

const common = {
  output: {
    path: path.resolve(__dirname),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react"],
            ],
            plugins: ['@babel/plugin-transform-runtime',
            [
              "module-resolver",
              {
                "root": ["./src"],
                "alias": {
                  // Add your module aliases here
                  "@assets": "./src//js/app/assets",
                  "@components": "./src/js/app/components",
                  "@views": "./src/js/app/views",
                  "@config": "./src/js/app/config",
                  "@utils": "./src/js/app/utils",
                  "@styles": "./src/scss",
                }
              }
            ]

      ]
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif|glb|gltf)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (data) => {
        return data.chunk.name === "style" ? "style.css" : "style.min.css";
      },
    }),
    new IgnoreEmitPlugin(["style.js", "style.min.js"]),
  ],
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".jpg",
      ".jpeg",
      ".png",
      ".eot",
      ".svg",
      ".gif",
      ".glb",
      ".gltf",
      ".ttf",
      ".woff",
      ".woff2",
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  experiments: {
    topLevelAwait: true,
  },
  performance: {
    maxAssetSize: 99999999,
    maxEntrypointSize: 99999999,
  },
};

const developmentConfig = {
  ...common,
  mode: "development",
  devtool: false,
  entry: () => {
    return {
      ...getEntries("src/js/app/*.js", "app"),
      ...getEntries("src/js/vendor/*.js", "vendor"),
      style: "./src/scss/style.scss",
    };
  },
  plugins: [
    ...common.plugins,
    new BrowserSyncPlugin({
      files: "**/*.php",
      proxy: proxyUrl,
      open: false,
      reloadOnRestart: true,
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        include: /\.js$/,
        terserOptions: {
          compress: false,
          format: {
            comments: true,
          },
        },
        extractComments: true,
      }),
      new CssMinimizerPlugin({
        include: /\.css$/,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: false },
              normalizeWhitespace: false,
            },
          ],
        },
        test: /\.css$/,
      }),
    ],
  },
};

const productionConfig = {
  ...common,
  mode: "production",
  devtool: false,
  entry: () => {
    return {
      ...getEntries("src/js/app/*.js", "app.min"),
      ...getEntries("src/js/vendor/*.js", "vendor.min"),
      "style.min": "./src/scss/style.scss",
    };
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        terserOptions: {
          compress: false,
          format: {
            comments: true,
          },
        },
        extractComments: true,
      }),
      new CssMinimizerPlugin({
        include: /style\.min\.css$/,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: false },
              normalizeWhitespace: false,
            },
          ],
        },
      }),
    ],
  },
};

module.exports = [developmentConfig, productionConfig];