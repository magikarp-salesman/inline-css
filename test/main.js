/* eslint-disable */
/* global describe, it */

import should from 'should';
import { readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import Vinyl from 'vinyl';
import pkg from 'js-beautify';
import inlineCss from '../index.js';

const { html: beautify } = pkg;


function getFile(filePath) {
    return new Vinyl({
        path: resolve(filePath),
        cwd: './test/',
        base: dirname(filePath),
        contents: Buffer.from(String(readFileSync(filePath)))
    });
}

function compare(fixturePath, expectedPath, options, done) {
    const file = getFile(fixturePath);

    options.url = `file://${file.path}`;

    inlineCss(file.contents.toString('utf8'), options)
        .then(html => {
            const expected = beautify(String(readFileSync(expectedPath)), {
                "preserve-newlines": false
            });
            beautify(html, {
                "preserve-newlines": false
            }).should.be.equal(expected);
        })
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        });
}

describe('inline-css', () => {
    it('Should convert linked css to inline css', done => {
        const options = {};
        compare(join('test', 'fixtures', 'in.html'), join('test', 'expected', 'out.html'), options, done);
    });

    it('Should inline css in multiple HTML files', done => {
        const options = {};
        compare(join('test', 'fixtures', 'multiple', 'one', 'in.html'), join('test', 'expected', 'multiple', 'one', 'out.html'), options, () => {});
        compare(join('test', 'fixtures', 'multiple', 'two', 'in.html'), join('test', 'expected', 'multiple', 'two', 'out.html'), options, done);
    });

    it('Should inline css in edge case (alpha)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'alpha.html'), join('test', 'expected', 'alpha.html'), options, done);
        });

    it('Should inline css in edge case (cascading)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'cascading.html'), join('test', 'expected', 'cascading.html'), options, done);
        });

    it('Should inline css in edge case (class)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'class.html'), join('test', 'expected', 'class.html'), options, done);
        });

    it('Should inline css in edge case (class+id)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'class+id.html'), join('test', 'expected', 'class+id.html'), options, done);
        });

    it('Should inline css in edge case (css-quotes)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'css-quotes.html'), join('test', 'expected', 'css-quotes.html'), options, done);
    });

    it('Should inline css in edge case (direct-descendents)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'direct-descendents.html'), join('test', 'expected', 'direct-descendents.html'), options, done);
        });

    it('Should inline css in edge case (empty)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'empty.html'), join('test', 'expected', 'empty.html'), options, done);
    });

    it('Should inline css in edge case (id)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'id.html'), join('test', 'expected', 'id.html'), options, done);
        });

    it('Should inline last rule if identical rules use important', done => {
        const options = {};
        compare(join('test', 'fixtures', 'identical-important.html'), join('test', 'expected', 'identical-important.html'), options, done);
    });

    it('Should ignore pseudo selectors', done => {
        const options = {};
        compare(join('test', 'fixtures', 'ignore-pseudos.html'), join('test', 'expected', 'ignore-pseudos.html'), options, done);
    });

    it('Should inline css in edge case (important)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'important.html'), join('test', 'expected', 'important.html'), options, done);
    });

    it('Should inline css in edge case (media)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'media.html'), join('test', 'expected', 'media.html'), options, done);
    });

    it('Should inline css in edge case (normalize)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'normalize.html'), join('test', 'expected', 'normalize.html'), options, done);
        });

    it('Should inline css in edge case (preserve-events)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'preserve-events.html'), join('test', 'expected', 'preserve-events.html'), options, done);
    });

    it('Should inline css in edge case (media)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'regression-media.html'), join('test', 'expected', 'regression-media.html'), options, done);
    });

    it('Should inline css in edge case (selector-newline)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'regression-selector-newline.html'), join('test', 'expected', 'regression-selector-newline.html'), options, done);
    });

    it('Should compare properties and inline the most specific', done => {
        const options = {};
        compare(join('test', 'fixtures', 'specificity.html'), join('test', 'expected', 'specificity.html'), options, done);
    });

    it('Should preserve existing inline styles ', done => {
        const options = {};
        compare(join('test', 'fixtures', 'style-preservation.html'), join('test', 'expected', 'style-preservation.html'), options, done);
    });

    it('Should inline css in edge case (tag)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'tag.html'), join('test', 'expected', 'tag.html'), options, done);
    });

    it('Should inline css in edge case (yui-reset)', done => {
        const options = {};
        compare(join('test', 'fixtures', 'yui-reset.html'), join('test', 'expected', 'yui-reset.html'), options, done);
    });

    it('Should inline css with doctype', done => {
        const options = {};
        compare(join('test', 'fixtures', 'doctype.html'), join('test', 'expected', 'doctype.html'), options, done);
    });

    it('Should inline css with no css', done => {
        const options = {};
        compare(join('test', 'fixtures', 'no_css.html'), join('test', 'expected', 'no_css.html'), options, done);
    });

    it('Should inline css with remote url', function(done) {
        this.timeout(10000);
        const options = {};
        compare(join('test', 'fixtures', 'remote_url.html'), join('test', 'expected', 'remote_url.html'), options, done);
    });

    it('Should inline css in with spaces in path', done => {
        const options = {};
        compare(join('test', 'fixtures', 'spaces_in_path.html'), join('test', 'expected', 'spaces_in_path.html'), options, done);
    });

    it('Should inline css with two styles', done => {
        const options = {};
        compare(join('test', 'fixtures', 'two_styles.html'), join('test', 'expected', 'two_styles.html'), options, done);
    });

    it('Should inline css with font quotes', done => {
        const options = {
            url: './',
            removeStyleTags: true
        };
        compare(join('test', 'fixtures', 'font-quotes.html'), join('test', 'expected', 'font-quotes.html'), options, done);
    });

    it('Should inline css with two styles', done => {
        const options = {};
        compare(join('test', 'fixtures', 'two_styles.html'), join('test', 'expected', 'two_styles.html'), options, done);
    });

    it('Should inline css and preserve media queries', done => {
        const options = {
            url: './',
            removeStyleTags: true,
            preserveMediaQueries: true
        };
        compare(
            join('test', 'fixtures', 'media-preserve.html'),
            join('test', 'expected', 'media-preserve.html'),
            options,
            done
        );
    });

    it('Should inline css and create width attributes on elements', done => {
        const options = {
            url: './',
            removeStyleTags: true,
            applyWidthAttributes: true
        };
        compare(join('test', 'fixtures', 'width-attr.html'), join('test', 'expected', 'width-attr.html'), options, done);
    });

    it('Should inline css and create table attributes on table elements', done => {
        const options = {
            url: './',
            removeStyleTags: true,
            applyTableAttributes: true
        };
        compare(join('test', 'fixtures', 'table-attr.html'), join('test', 'expected', 'table-attr.html'), options, done);
    });

    it('Should inline css in HTML templates', done => {
        const options = {
            url: './'
        };
        compare(join('test', 'fixtures', 'template.ejs'), join('test', 'fixtures', 'template.ejs'), options, done);
    });

    it('Should inline css in edge case and remove html selectors', done => {
      const options = {
        removeHtmlSelectors: true
      };
      compare(join('test', 'fixtures', 'remove-html-selectors.html'), join('test', 'expected', 'remove-html-selectors.html'), options, done);
    });

    it('Should error when passed malformed CSS', done => {
        const file = getFile(join('test', 'fixtures', 'malformed.html'));
        const options = {
            url: `file://${file.path}`
        };
        inlineCss(file.contents.toString('utf8'), options)
            .then(html => {
                done(new Error('test should error when passed malformed CSS'));
            })
            .catch(({message}) => {
                message.should.be.equal('Error: Unexpected } (line 3, char 1)');
                done();
            });
    });

    it('Should handle html character entities correctly', done => {
        const options = {};
        compare(join('test', 'fixtures', 'character-entities.html'), join('test', 'expected', 'character-entities.html'), options, done);
    });

    it('Should error when options.url is not set', done => {
        const options = {};
        const file = getFile(join('test', 'fixtures', 'template.ejs'));
        inlineCss(file.contents.toString('utf8'), options)
            .then(html => {
                done(new Error('test should error when options.url is not set'));
            })
            .catch(err => {
                done();
            });
    });

    it('Should handle xhtml documents correctly', done => {
        const options = {
           xmlMode: true
        };
        compare(join('test', 'fixtures', 'xhtml.html'), join('test', 'expected', 'xhtml.html'), options, done);
    });

    it('Should ignore hbs code blocks', done => {
        const options = {
           xmlMode: true
        };
        compare(join('test', 'fixtures', 'codeblocks.html'), join('test', 'expected', 'codeblocks.html'), options, done);
    });

    it('Should ignore ejs code blocks', done => {
        const options = {
           xmlMode: false
        };
        compare(join('test', 'fixtures', 'ejs.html'), join('test', 'expected', 'ejs.html'), options, done);
    });

    it('Should ignore user defined code blocks', done => {
        const options = {
            xmlMode: true,
            codeBlocks: {
                craze: { start: '<<', end: '>>' }
            }
        };
        compare(join('test', 'fixtures', 'codeblocks-external.html'), join('test', 'expected', 'codeblocks-external.html'), options, done);
    });
});
