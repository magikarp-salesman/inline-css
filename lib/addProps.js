import cssSelector from './styleSelector.js';
import property from './cssProperty.js';

const importantSelector = cssSelector('<!important>', [ 2, 0, 0, 0 ]);

function getProperty(style, name, selector) {
    const value = style[name];
    const sel = style._importants[name] ? importantSelector : selector;

    return property(name, value, sel);
}

// go through the properties
export default ({ styleProps }, style, selector) => {
    let i;
    const l = style.length;
    let name;
    let prop;
    let existing;
    let winner;

    for (i = 0; i < l; i++) {
        name = style[i];
        prop = getProperty(style, name, selector);
        existing = styleProps[name];

        if (existing) {
            winner = existing.compare(prop);

            if (winner === prop) {
                styleProps[name] = prop;
            }
        } else {
            styleProps[name] = prop;
        }
    }
};
