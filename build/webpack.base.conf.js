'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });




const webpack = require("webpack")

const plugin = [
  // new webpack.DllReferencePlugin({
  //     context: __dirname,
  //     manifest: require('./vendor-manifest.json')
  // }),
  new HappyPack({
      //用id来标识 happypack处理那里类文件
    id: 'happyBabel',
    //如何处理  用法和loader 的配置一样
    loaders: [{
      loader: 'babel-loader?cacheDirectory=true',
    }],
    //共享进程池
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  })



];






module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  devServer: {
    proxy: {
      '/ftask/**': { //设置webpack代理
        target: 'https://test-app01.yugusoft.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=happyBabel',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins:plugin
}
