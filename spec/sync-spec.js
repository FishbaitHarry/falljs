var falljs = require('../index');
var Promise = require('bluebird');

describe('Scope with sync factories', function() {
    beforeEach(function() {
        this.scope = falljs.createScope();

        function factory1() {return 'product1-instance';}
        factory1.produces = 'product1-uri';
        factory1.inject = {};
        this.scope.register(factory1);

        function factory2(params) {return 'product2-instance';}
        factory2.produces = 'product2-uri';
        factory2.inject = {};
        this.scope.register(factory2);

        function factory3(params) {return params.p1 + params.p2;}
        factory3.produces = 'product3-uri';
        factory3.inject = { p1: 'product1-uri', p2: 'product2-uri' };
        this.scope.register(factory3);
    });
    it('can get simple products', function(done) {
        this.scope.get('product1-uri').then(function(result) {
            expect(result).toBe('product1-instance');
            done();
        });
    });
    it('can get complex products', function(done) {
        this.scope.get('product3-uri').then(function(result){
            expect(result).toBe('product2-instanceproduct1-instance');
            done();
        })
    });
});
