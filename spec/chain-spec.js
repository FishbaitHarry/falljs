var falljs = require('../index');
var Promise = require('bluebird');

describe('Scope with chained factories', function() {
    beforeEach(function() {
        this.scope = falljs.createScope();

        var factory1 = jasmine.createSpy('f1');
        factory1.produces = 'product1-uri';
        factory1.inject = {};
        this.scope.register(factory1);
        this.factory1 = factory1;

        var factory2 = jasmine.createSpy('f2');
        factory2.produces = 'product2-uri';
        factory2.inject = { p1: 'product1-uri' };
        this.scope.register(factory2);
        this.factory2 = factory2;

        var factory3 = jasmine.createSpy('f3');
        factory3.produces = 'product3-uri';
        factory3.inject = { p2: 'product2-uri' };
        this.scope.register(factory3);
        this.factory3 = factory3;
    });
    it('can get simple products', function(done) {
        this.scope.get('product1-uri').then(function() {
            expect(this.factory1).toHaveBeenCalled();
            expect(this.factory2).not.toHaveBeenCalled();
            expect(this.factory3).not.toHaveBeenCalled();
            done();
        });
    });
    it('can get simple products', function(done) {
        this.scope.get('product2-uri').then(function() {
            expect(this.factory1).toHaveBeenCalled();
            expect(this.factory2).toHaveBeenCalled();
            expect(this.factory3).not.toHaveBeenCalled();
            done();
        });
    });
    it('can get simple products', function(done) {
        this.scope.get('product3-uri').then(function() {
            expect(this.factory1).toHaveBeenCalled();
            expect(this.factory2).toHaveBeenCalled();
            expect(this.factory3).toHaveBeenCalled();
            done();
        });
    });
});
