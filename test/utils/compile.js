import { join } from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const srcDir = join(__dirname, '..', 'fixtures');
process.chdir(srcDir);
const outDir = join(__dirname, '..', 'tmp');

const tplPath = join(srcDir, 'src/template.ejs');

export default (plugin, separator, done) => {
  let hplugin;
  let chunkhash = '';
  const sp = separator;
  if (sp) {
    chunkhash = '[chunkhash]';
  }
  const config = {
    entry: {
      page1: join(srcDir, 'src/page1.js'),
      page2: join(srcDir, 'src/page2.js'),
    },
    output: {
      path: outDir,
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
      template: tplPath,
      entry,
    });
    config.plugins.push(hplugin);
  });
  config.plugins.push(plugin);

  webpack(config, done);
};
