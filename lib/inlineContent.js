import extractCss from 'extract-css';
import inlineCss from './inline-css.js';

export default function inlineContent(src, options) {
    return new Promise((resolve, reject) => {
        let content;

        if (!options.url) {
            reject('options.url is required');
        }

        extractCss(src, options, (err, html, css) => {
            let extraCss;

            if (err) {
                return reject(err);
            }

            extraCss = `${css}\n${options.extraCss}`;

            try {
                content = inlineCss(html, extraCss, options);
            } catch (e) {
                return reject(e);
            }

            return resolve(content);
        });
    });

};
