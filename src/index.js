import { filesMap, fixAssetsInHtml } from './util';
export default class HtmlHashFix {

  static defaults = {
    separator: '-',
    prefixPath: '',
  };

  constructor(options) {
    this.options = { ...HtmlHashFix.defaults, ...options };
  }

  apply(compiler) {
    const { separator, prefixPath } = this.options;
    if (separator) {
      compiler.plugin('compilation', (compilation) => {
        const assets = compilation.assets;
        let map = {};
        compilation.plugin('html-webpack-plugin-after-html-processing', (htmlData, callback) => {
          const htmlPluginData = htmlData;
          map = filesMap(assets, separator);
          htmlPluginData.html = fixAssetsInHtml(htmlPluginData.html, map, prefixPath, separator);
          callback(null, htmlPluginData);
        });
      });
    }
  }
}
