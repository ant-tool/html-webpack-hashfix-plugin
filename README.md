# html-webpack-hashfix-plugin

[![NPM version](https://img.shields.io/npm/v/html-webpack-hashfix-plugin.svg?style=flat)](https://npmjs.org/package/html-webpack-hashfix-plugin)
[![Build Status](https://img.shields.io/travis/ant-tool/html-webpack-hashfix-plugin.svg?style=flat)](https://travis-ci.org/ant-tool/html-webpack-hashfix-plugin)
[![Coverage Status](https://img.shields.io/coveralls/ant-tool/html-webpack-hashfix-plugin.svg?style=flat)](https://coveralls.io/r/ant-tool/html-webpack-hashfix-plugin)
[![NPM downloads](http://img.shields.io/npm/dm/html-webpack-hashfix-plugin.svg?style=flat)](https://npmjs.org/package/html-webpack-hashfix-plugin)
[![Dependency Status](https://david-dm.org/ant-tool/html-webpack-hashfix-plugin.svg)](https://david-dm.org/ant-tool/html-webpack-hashfix-plugin)

Webpack plugin for repath assets with hash in outputs multiple html



## Features
* replace multiple html ressets with hash


## Installation

```bash
$ npm i --save html-webpack-hashfix-plugin
```

## Usage

Add new plugin instance to your `webpack` config

```javascript
  import HtmlHashFix from 'html-webpack-hashfix-plugin';

  const compiler = webpack({
    plugins: [
      new HtmlHashFix({
        separator: '-',
        prefixPath: '',
      })
    ]
  });
```

## Configuration
The plugin accepts the following options:

- separator: separator of fileName and hashCode; 文件名和 hash 值的分隔符。
- prefixPath: add prefixPath for html assets path; 可以给 html 引用的静态文件自定义前缀路径。


### License
MIT