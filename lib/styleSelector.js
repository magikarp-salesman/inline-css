/**
 * Module dependencies.
 */

import { calculate } from 'specificity';

/**
* Returns specificity based on selector text and tokens.
*
* @param {String} selector
* @param {Array} tokens
* @api private.
*/

function getSpecificity(text) {
    const spec = calculate(text);

    return spec[0].specificity.split(',');
}

/**
 * CSS selector constructor.
 *
 * @param {String} selector text
 * @param {Array} optionally, precalculated specificity
 * @api public
 */

export default (text, spec) => {
    let _spec = spec;

    const /**
     * Lazy specificity getter
     *
     * @api public
     */

        _specificity = () => {
            if (!spec) {
                _spec = getSpecificity(text);
            }
            return _spec;
        };

    return {
        spec: _spec,

        specificity: _specificity
    };
};
