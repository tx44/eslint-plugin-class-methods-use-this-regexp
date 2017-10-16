import eslint from 'eslint';
import plugin from '../../src';

const rule = plugin.rules['class-methods-use-this'];

const ruleTester = new eslint.RuleTester();
const parserOptions = { ecmaVersion: 6 };

ruleTester.run('class-methods-use-this-regexp', rule, {
    valid: [
        { code: "class A { constructor() {} }", parserOptions },
        { code: "class A { foo() {this} }", parserOptions },
        { code: "class A { foo() {this.bar = 'bar';} }", parserOptions },
        { code: "class A { foo() {bar(this);} }", parserOptions },
        { code: "class A extends B { foo() {super.foo();} }", parserOptions },
        { code: "class A { foo() { if(true) { return this; } } }", parserOptions },
        { code: "class A { static foo() {} }", parserOptions },
        { code: "({ a(){} });", parserOptions },
        { code: "class A { foo() { () => this; } }", parserOptions },
        { code: "({ a: function () {} });", parserOptions },
        { code: "class A { foo() {this} bar() {} }", options: [{ exceptMethods: ['\\w'] }], parserOptions }
    ],
    invalid: [
        {
            code: "class A { foo() {} }",
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() {/**this**/} }",
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() {var a = function () {this};} }",
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() {var a = function () {var b = function(){this}};} }",
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() {window.this} }",
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() {that.this = 'this';} }",
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() { () => undefined; } }",
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() {} bar() {} }",
            options: [{ exceptMethods: ["bar"] }],
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 14, message: "Expected 'this' to be used by class method 'foo'." }
            ]
        },
        {
            code: "class A { foo() {} hasOwnProperty() {} }",
            options: [{ exceptMethods: ["foo"] }],
            parserOptions,
            errors: [
                { type: "FunctionExpression", line: 1, column: 34, message: "Expected 'this' to be used by class method 'hasOwnProperty'." }
            ]
        }
    ]
});
