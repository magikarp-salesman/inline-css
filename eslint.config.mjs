import globals from 'globals';
import js from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		...js.configs.recommended,
	},
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		rules: {
			"block-scoped-var": 2,
            "complexity": [
                1,
                5
            ],
            "consistent-return": 1,
            "curly": [
                2,
                "all"
            ],
            "dot-notation": 2,
            "eqeqeq": 2,
            "no-caller": 2,
            "no-else-return": 2,
            "no-eq-null": 2,
            "no-extend-native": 2,
            "no-implicit-coercion": 2,
            "no-invalid-this": 2,
            "no-loop-func": 2,
            "no-multi-spaces": 2,
            "no-multi-str": 2,
            "no-new-func": 2,
            "no-new-wrappers": 2,
            "no-new": 2,
            "no-param-reassign": 2,
            "no-unused-expressions": 2,
            "no-useless-call": 2,
            "no-useless-concat": 2,
            "no-with": 2,
            "vars-on-top": 2,
            "wrap-iife": [2, "any"],
            "yoda": [
                2,
                "never"
            ],

            "no-shadow": 2,
            "no-use-before-define": 2,

            "callback-return": 2,
            "handle-callback-err": 2,
            "no-path-concat": 2,

            "array-bracket-spacing": [
                1,
                "always", {
                    "objectsInArrays": false
                }
            ],
            "block-spacing": 1,
            "brace-style": 1,
            "camelcase": [
                1, {
                    "properties": "never"
                }
            ],
            "comma-spacing": [
                1, {
                    "before": false,
                    "after": true
                }
            ],
            "comma-style": [
                1,
                "last"
            ],
            "computed-property-spacing": [
                1,
                "never"
            ],
            "consistent-this": [
                1,
                "self"
            ],
            "eol-last": 1,
            "indent": [
                2,
                4, {
                    "SwitchCase": 1
                }
            ],
            "key-spacing": [
                1, {
                    "beforeColon": false,
                    "afterColon": true
                }
            ],
            "keyword-spacing": 1,
            "linebreak-style": [
                1,
                "unix"
            ],
            "lines-around-comment": [
                1, {
                    "allowBlockStart": true,
                    "beforeBlockComment": true,
                    "beforeLineComment": true
                }
            ],
            "max-depth": [
                1,
                4
            ],
            "max-params": [
                1,
                3
            ],
            "max-statements": [
                0,
                10
            ],
            "new-cap": 2,
            "new-parens": 2,
            "padding-line-between-statements": [
                "error",
                { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*"},
                { "blankLine": "any",    "prev": ["const", "let", "var"], "next": ["const", "let", "var"]}
            ],
            "no-array-constructor": 2,
            "no-bitwise": 1,
            "no-lonely-if": 1,
            "no-multiple-empty-lines": 1,
            "no-new-object": 2,
            "no-spaced-func": 1,
            "no-trailing-spaces": 1,
            "no-unneeded-ternary": 1,
            "object-curly-spacing": [
                1,
                "always"
            ],
            "operator-assignment": [
                1,
                "always"
            ],
            "operator-linebreak": [
                1,
                "after"
            ],
            "quote-props": [
                1,
                "as-needed"
            ],
            "quotes": [
                1,
                "single"
            ],
            "semi": [
                2,
                "always"
            ],
            "semi-spacing": [
                1, {
                    "before": false,
                    "after": true
                }
            ],
            "space-before-blocks": [
                1,
                "always"
            ],
            "space-before-function-paren": [1, { "anonymous": "always", "named": "never" }],
            "space-in-parens": [1, "never"],
            "space-infix-ops": 1,
            "space-unary-ops": 0,
            "spaced-comment": [1, "always", { "line": { "exceptions": ["-"] } }]
		}
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.mocha,
			}
		}
	},
];
