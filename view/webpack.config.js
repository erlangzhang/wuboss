/**
* @Author: Zz
* @Date:   2016-09-10T10:35:08+08:00
* @Email:  quitjie@gmail.com
* @Last modified by:   Zz
* @Last modified time: 2016-09-11T22:46:25+08:00
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const publicPath = '/public';
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const entry = [
  `${__dirname}/src/index.js`
];

const loaders = [
  { test: /\.(less|css|scss)$/, loader: 'style-loader!css-loader!less-loader'},
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
  { test: /iview.src.*?js$/, loader: 'babel-loader' },
  { test: /\.json$/, loader: "json-loader" },
  { test: /\.vue$/, loader: 'vue-loader' },
];

const plugins = [
  new HtmlWebpackPlugin( { template: 'src/index.html' } ),
];
if (process.env.NODE_ENV === 'development') {
  entry.unshift(hotMiddlewareScript);
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoEmitOnErrorsPlugin());
  loaders.push({ test: /\.(png|jpg|gif|jpe?g)$/, loader: 'file-loader'});
  loaders.push({ test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" });
} else if(process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
  }));
  plugins.push(new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname),
    verbose: true,
    dry: false
  }));
  loaders.push({ test: /\.(png|jpg|gif|jpe?g)$/, loader: 'file-loader?limit=8192&name=/static/images/[hash].[ext]'});
  loaders.push({ test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader?name=/static/fonts/[hash].[ext]" });
}

module.exports = {
  entry,
  resolve : {
    extensions:['.js', '.less', '.json', '.css', '.vue'],
    alias: {
    }
  },
  //文件导出的配置
  output:{
    path : `${__dirname}/dist/`,
    filename: 'static/js/[hash].bundle.js',
    chunkFilename: 'static/js/[hash].bundle.js',
    publicPath: '/wushu/public'
  },
  module: {
    rules: loaders,
  },
  externals: {
  },
  plugins,
}
