import { load } from 'cheerio';
import isUrl from 'is-url';

const compare = ($, selector, attr, htmlCont, code) => {
  const regCode = `(${code})`;
  const hashReg = new RegExp(regCode);
  let flag = 0;
  $(selector).each(() => {
    const source = $(this).attr(attr);
    if (source && !isUrl(source)) {
      if (!hashReg.test(source)) {
        flag = 1;
        return;
      }
    }
  });
  return flag;
};

export default (content, code) => {
  const $ = load(content);
  const htmlCont = $.html();

  return {
    script: compare($, 'script', 'src', htmlCont, code),
    style: compare($, 'link[rel=stylesheet]', 'href', htmlCont, code),
  };
};
