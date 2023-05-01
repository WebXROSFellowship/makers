const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const proxyUrl = 'https://webxr.local/';

function getEntries(pattern, outputName) {
  const files = glob.sync(pattern);
  const entries = {};

  if (files.length > 0) {
    entries[outputName] = files.reduce((acc, file) => {
      acc.push('./' + file);
      return acc;
    }, []);
  }

  return entries;
}


const common = {
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|glb|gltf)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (data) => {
        return data.chunk.name === 'style' ? 'style.css' : 'style.min.css';
      },
    }),
    new IgnoreEmitPlugin(['style.js', 'style.min.js']),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.jpg', '.jpeg', '.png', '.svg', '.gif', '.glb', '.gltf'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  experiments: {
    topLevelAwait: true
  },
  performance: {
    maxAssetSize: 99999999,
    maxEntrypointSize: 99999999,
  },

};

const developmentConfig = {
  ...common,
  mode: 'development',
  devtool: false,
  entry: () => {
    return {
      ...getEntries('src/js/app/*.js', 'app'),
      ...getEntries('src/js/vendor/*.js', 'vendor'),
      'style': './src/scss/style.scss',
    };
  },
  plugins: [
    ...common.plugins,
    new BrowserSyncPlugin({
      files: '**/*.php',
      proxy: proxyUrl,
      open: false,
      reloadOnRestart: true
      
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.js$/,
        terserOptions: {
          compress: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        include: /\.css$/,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
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
  mode: 'production',
  devtool: false,
  entry: () => {
    return {
      ...getEntries('src/js/app/*.js', 'app.min'),
      ...getEntries('src/js/vendor/*.js', 'vendor.min'),
      'style.min': './src/scss/style.scss',
    };
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        terserOptions: {
          compress: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        include: /style\.min\.css$/,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: false,
            },
          ],
        },
      }),
    ],
  },
};

module.exports = [developmentConfig, productionConfig];
