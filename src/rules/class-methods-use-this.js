import classMethodsUseThis from 'eslint/lib/rules/class-methods-use-this';

export default {
    meta: classMethodsUseThis.meta,
    create(context) {
        const config = context.options[0] ? Object.assign({}, context.options[0]) : {};
        const configExceptMethods = config.exceptMethods || [];

        let proxyContext = Object.assign({}, context);

        proxyContext.report = function report(...args) {
            const node = args.length === 1 ? args[0].node : args[0];
            const methodName = node.parent.key.name;

            if (configExceptMethods.some(item => new RegExp(item).test(methodName))) {
                return;
            }

            context.report(...args);
        };

        return classMethodsUseThis.create(proxyContext);
    }
};
