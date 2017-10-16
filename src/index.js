import classMethodsUseThis from './rules/class-methods-use-this';

// Use CommonJS default export so ESLint can find the rule
module.exports = {
    rules: {
        'class-methods-use-this': classMethodsUseThis
    },
    configs: {
        recommended: {
            plugins: ['class-methods-use-this-regexp']
        },
        rules: {
            'class-methods-use-this': 0,
            'class-methods-use-this-regexp/class-methods-use-this': [2, {
                exceptMethods: [
                    'render',
                    'getInitialState',
                    'getDefaultProps',
                    'componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'componentDidUpdate',
                    'componentWillUnmount'
                ]
            }]
        }
    }
};
