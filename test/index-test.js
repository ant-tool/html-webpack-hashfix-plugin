import expect from 'expect.js';
import { join } from 'path';
import { readFileSync } from 'fs';
import rimraf from 'rimraf';
import compile from './utils/compile';
import HtmlHashFix from '../src';
import { filesMap } from '../src/util';

const fixDir = join(__dirname, 'fixtures');
const expDir = join(__dirname, 'expect');
const tmpDir = join(__dirname, 'tmp');

describe('HtmlHashFix', () => {
  before(() => {
    process.chdir(fixDir);
  });

  afterEach(done => {
    rimraf.sync(tmpDir);
    done();
  });

  it('util with filesMap', done => {
    const arg = {
      'test-abc.js': {},
      'check-abc.css': {},
      'aaa.html': '',
    };
    expect(filesMap('')).to.eql({});
    const result = expect(filesMap(arg, '-'));
    result.to.have.property('test.js', 'abc');
    done();
  });

  it('without hash', done => {
    compile(
      new HtmlHashFix(),
      '',
      () => {
        const now = readFileSync(join(tmpDir, 'page1.html'), 'utf-8');
        const path = join(expDir, 'with-noparams.html');
        const exp = readFileSync(path, 'utf-8');
        expect(now).to.equal(exp);
        done();
      }
    );
  });

  it('without param', done => {
    compile(
      new HtmlHashFix(),
      '-',
      () => {
        const now = readFileSync(join(tmpDir, 'page1.html'), 'utf-8');
        const path = join(expDir, 'with-hash.html');
        const exp = readFileSync(path, 'utf-8');
        expect(now).to.equal(exp);
        done();
      }
    );
  });

  it('with param separator blank', done => {
    compile(
      new HtmlHashFix({
        separator: '',
      }),
      '-',
      () => {
        const now = readFileSync(join(tmpDir, 'page1.html'), 'utf-8');
        const path = join(expDir, 'with-noparams.html');
        const exp = readFileSync(path, 'utf-8');
        expect(now).to.equal(exp);
        done();
      }
    );
  });

  it('with param separator .', done => {
    compile(
      new HtmlHashFix({
        separator: '.',
      }),
      '.',
      () => {
        const now = readFileSync(join(tmpDir, 'page1.html'), 'utf-8');
        const path = join(expDir, 'with-separator.html');
        const exp = readFileSync(path, 'utf-8');
        expect(now).to.equal(exp);
        done();
      }
    );
  });

  it('with param prefixPath ../aaa/bb', done => {
    compile(
      new HtmlHashFix({
        separator: '.',
        prefixPath: '../aaa/bb',
      }),
      '.',
      () => {
        const now = readFileSync(join(tmpDir, 'page1.html'), 'utf-8');
        const path = join(expDir, 'with-prefixPath.html');
        const exp = readFileSync(path, 'utf-8');
        expect(now).to.equal(exp);
        done();
      }
    );
  });
});
