import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (plugin, separator, done) => {
  let hplugin;
  let chunkhash = '';
  const sp = separator;
  if (sp) {
    chunkhash = '[chunkhash]';
  }
  const config = {
    entry: {
      page1: '../fixtures/src/page1.js',
      page2: '../fixtures/src/page2.js',
    },
    output: {
      path: '../tmp',
      filename: `[name]${sp}${chunkhash}.js`,
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin(`[name]${sp}${chunkhash}.css`),
    ],
  };
  Object.keys(config.entry).forEach((entry) => {
    hplugin = new HtmlWebpackPlugin({
      inject: false,
      filename: `${entry}.html`,
      template: '../fixtures/src/template.ejs',
      entry,
    });
    config.plugins.push(hplugin);
  });

  config.plugins.push(plugin);

  webpack(config, done);
};
