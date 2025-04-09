import cssSelector from './styleSelector.js';
import parseCSS from 'css-rules';
import addProps from './addProps.js';


const styleSelector = cssSelector('<style attribute>', [ 1, 0, 0, 0 ]);

export default (rule, $) => {
    const sel = rule[0];
    const style = rule[1];
    const selector = cssSelector(sel);
    const editedElements = [];

    $(sel).each((index, el) => {
        let cssText;

        if (!el.styleProps) {
            el.styleProps = {};

            // if the element has inline styles, fake selector with topmost specificity
            if ($(el).attr('style')) {
                cssText = `* { ${$(el).attr('style')} } `;

                addProps(el, parseCSS(cssText)[0][1], styleSelector);
            }

            // store reference to an element we need to compile style="" attr for
            editedElements.push(el);
        }

        addProps(el, style, selector);
    });

    return editedElements;
};
