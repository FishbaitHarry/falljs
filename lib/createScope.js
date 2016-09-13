var Promise = require('bluebird');
var rootScope = require('./rootScope');

module.exports = createScope;

function createScope(params) {
    params = params || {};
    var factories = params.factories || [];
    var parentScope = params.parentScope || rootScope;

    function registerFactory(factory) {
        if (!factory.produces) factory.produces = factory.name;
        factories.push(factory);
    }

    function getFactory(productUri) {
        return factories.find(matches) || parentScope.getFactory(productUri);
        function matches(factory) {
            return factory.produces == productUri;
        }
    }

    function getProduct(uri) {
        var factory = getFactory(uri);
        var depUris = factory.inject || {};
        var depProducts = {};
        var depPromises = Object.keys(depUris).map(getDeps);
        function getDeps(depName) {
            return getProduct(depUris[depName])
            .then(function(dep) { depProducts[depName] = dep; })
        }
        return Promise.all(depPromises).then(function() {
            return factory(depProducts)
        });
    }

    function get(uri) {
        try { return getProduct(uri); }
        catch (e) { return Promise.reject(e); }
    }

    return {
        // high level api
        get: get,
        register: registerFactory,
        // low level api
        getFactory: getFactory,
        getProduct: getProduct
    }
}
