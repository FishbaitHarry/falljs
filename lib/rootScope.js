function rootScopeError() {
    throw new Error('Unable to find product/factory.');
}

module.exports = {
    get: rootScopeError,
    register: rootScopeError,
    getFactory: rootScopeError,
    getProduct: rootScopeError
}
