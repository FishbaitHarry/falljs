var falljs = require('../index');
var Promise = require('bluebird');

describe('falljs scope', function() {
	beforEach(function() {
		this.scope = falls.createScope();
	});
	it('gets results of simple sync functions', function(done) {
		this.scope.register(syncFunction);
		this.scope.get('syncFunction')
		.then(function(result) {
			expect(result).toBe('sync value');
			done();
		})
		.catch(done.fail);
	});
	it('gets results of simple async functions', function(done) {
		this.scope.register(asyncFunction);
		this.scope.get('asyncFunction')
		.then(function(result) {
			expect(result).toBe('async value');
			done();
		})
		.catch(done.fail);
	});
});

function syncFunction() {
	return 'sync value';
}
function asyncFunction() {
	return Promise.resolve('async value');
}