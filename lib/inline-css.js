import parseCSS from 'css-rules';
import { load } from 'cheerio';
import pseudoCheck from './pseudoCheck.js';
import handleRule from './handleRule.js';
import flatten from 'flat-util';
import setStyleAttrs from './setStyleAttrs.js';
import setWidthAttrs from './setWidthAttrs.js';
import removeClassId from './removeClassId.js';
import setTableAttrs from './setTableAttrs.js';
import pick from 'pick-util';

function replaceCodeBlock(html, re, block) {
    return html.replace(re, () => block);
}

export default (html, css, options) => {
    const opts = options || {};
    let rules;
    let editedElements = [];
    const codeBlockLookup = [];

    const encodeCodeBlocks = _html => {
        let __html = _html;
        const blocks = opts.codeBlocks;

        Object.keys(blocks).forEach(key => {
            const re = new RegExp(`${blocks[key].start}([\\S\\s]*?)${blocks[key].end}`, 'g');

            __html = __html.replace(re, match => {
                codeBlockLookup.push(match);
                return `EXCS_CODE_BLOCK_${codeBlockLookup.length - 1}_`;
            });
        });
        return __html;
    };

    const decodeCodeBlocks = _html => {
        let index;
        let re;
        let __html = _html;

        for (index = 0; index < codeBlockLookup.length; index++) {
            re = new RegExp(`EXCS_CODE_BLOCK_${index}_(="")?`, 'gi');
            __html = replaceCodeBlock(__html, re, codeBlockLookup[index]);
        }
        return __html;
    };

    const encodeEntities = _html => encodeCodeBlocks(_html);
    const decodeEntities = _html => decodeCodeBlocks(_html);
    let $;

    $ = load(encodeEntities(html), pick(opts, [
        'xmlMode',
        'decodeEntities',
        'lowerCaseTags',
        'lowerCaseAttributeNames',
        'recognizeCDATA',
        'recognizeSelfClosing'
    ]));

    try {
        rules = parseCSS(css);
    } catch (err) {
        throw new Error(err);
    }

    rules.forEach(rule => {
        let el;
        let ignoredPseudos;

        ignoredPseudos = pseudoCheck(rule);

        if (ignoredPseudos) {
            return false;
        }

        try {
            el = handleRule(rule, $);

            editedElements.push(el);
        } catch (err) {     // eslint-disable-line
            // skip invalid selector
            return false;
        }
        return undefined;
    });

    // flatten array if nested
    editedElements = flatten(editedElements);

    editedElements.forEach(el => {
        setStyleAttrs(el, $);

        if (opts.applyWidthAttributes) {
            setWidthAttrs(el, $);
        }

        if (opts.removeHtmlSelectors) {
            removeClassId(el, $);
        }
    });

    if (opts.applyTableAttributes) {
        $('table').each((index, el) => {
            setTableAttrs(el, $);
        });
    }

    return decodeEntities($.html());
};
