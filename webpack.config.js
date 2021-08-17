const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'build');
const mode = process.env.WEBPACK_DEV_SERVER === 'true' ? 'development' : 'production';
const prod = mode === 'production';
const DEV_PORT = 8082;

/* webpack config start */
module.exports = (env = {}) => {
  return {
    mode,
    entry: path.join(SRC_DIR, 'index.tsx'),
    output: {
      path: BUILD_DIR,
      filename: `[name].bundle.${prod ? new Date().Format('yyyyMMddhhmm') : 'dev'}.js`,
    },

    devServer: {
      // contentBase: path.join(__dirname, 'build'),
      // historyApiFallback: true,
      // clientLogLevel: 'debug',
      host: '0.0.0.0',
      port: DEV_PORT,
      compress: true,
      hot: true,
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                happyPackMode: true,
                configFile: path.resolve(__dirname, 'tsconfig.json'),
              },
            },
          ],
        },
        {
          test: /\.module\.css|less$/,
          use: [
            // MiniCssExtractPlugin.loader,
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]___[hash:4]',
                },
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.ejs',
        chunksSortMode: 'none',
      }),
      new HappyPack({
        cache: true,
        threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
        loaders: [
          {
            loader: 'ts-loader',
            exclude: /(node_modules|public|build|tools)/,
            // options: {
            //   cacheDirectory: true,
            // presets: [
            //   '@babel/preset-env',
            //   '@babel/react',
            //   {
            //     plugins: [
            //       '@babel/plugin-proposal-class-properties',
            //       'react-hot-loader/babel',
            //       [
            //         '@babel/plugin-transform-runtime',
            //         {
            //           helpers: false,
            //           regenerator: true,
            //         },
            //       ],
            //     ],
            //   },
            // ],
            // },
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: prod ? '[name].[hash].css' : '[name].css',
        chunkFilename: prod ? '[id].[hash].css' : '[id].css',
      }),
    ],
  };
};
/* webpack config end */

// utils
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};
