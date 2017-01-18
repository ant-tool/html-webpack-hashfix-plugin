import { normalize, basename, join, parse } from 'path';
import isUrl from 'is-url';
import { load } from 'cheerio';

function fixSourcePath($, selector, attr, map, prefixPath, separator) {
  let dir = prefixPath;
  $(selector).each(function () {
    let source = $(this).attr(attr);
    if (source && !isUrl(source)) {
      source = normalize(source);
      const baseName = basename(source);
      const parseInfo = parse(source);
      const hashInfo = map[baseName];
      if (!dir) {
        dir = parseInfo.dir;
      }
      const newSourcePath = hashInfo ?
        join(dir, `${parseInfo.name}${separator}${hashInfo}${parseInfo.ext}`) : join(dir, baseName);
      $(this).attr(attr, newSourcePath);
    }
  });
}

export function fixAssetsInHtml(htmlContent, map, prefixPath, separator) {
  const $ = load(htmlContent);
  fixSourcePath($, 'script', 'src', map, prefixPath, separator);
  fixSourcePath($, 'link[rel=stylesheet]', 'href', map, prefixPath, separator);

  return $.html();
}

export function filesMap(assets, separator) {
  let map = {};
  if (!assets) {
    return map;
  }
  map = Object.keys(assets).reduce((prev, item) => {
    const _prev = prev;
    const pathInfo = parse(item);
    const spInfo = pathInfo.name.split(separator);
    const extname = pathInfo.ext;
    const hash = spInfo[1];
    const name = spInfo[0];
    _prev[name + extname] = hash;

    return _prev;
  }, {});

  return map;
}
