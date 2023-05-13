const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const proxyUrl = 'https://makers/';



function getEntries(pattern, outputName) {
  const files = glob.sync(pattern);
  const entries = {};
  console.log(files);

  if (files.length > 0) {
    entries[outputName] = files.reduce((acc, file) => {
      acc.push('./' + file);
      return acc;
    }, []);
  }
  console.log(entries);

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
        exclude: /node_modules/,
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|glb|gltf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
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
  watchOptions: {
    ignored: /node_modules/,
  },
  experiments: {
    topLevelAwait: true
  }
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
    minimizer: [
      new TerserPlugin({
        include: /\.js$/,
        terserOptions: {
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
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        terserOptions: {
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
