# eslint-plugin-class-methods-use-this-regexp

An enhanced version of the [ESLint class-methods-use-this rule](http://eslint.org/docs/rules/class-methods-use-this) with RegExp exceptMethods option.

## Installation

Install [ESLint](http://eslint.org) and `eslint-plugin-class-methods-use-this-regexp`:

```
$ npm install --save-dev eslint eslint-plugin-class-methods-use-this-regexp
```

## Usage

Add `class-methods-use-this-regexp` to the plugins section of your `.eslintrc` configuration file, and configure the rule under the rules section. Don't forget to disable the core rule `class-methods-use-this`:

```json
{
  "plugins": [
    "class-methods-use-this-regexp"
  ],
  "rules": {
    "class-methods-use-this": 0,
    "class-methods-use-this-regexp/class-methods-use-this": [2, {"exceptMethods": ["render"]}]
  }
}
```

Alternatively you may use the plugin's recommended configuration, which applies the above configuration:

```json
{
  "extends": ["plugin:class-methods-use-this-regexp/recommended"]
}
```
