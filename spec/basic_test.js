var falljs = require('../index');
var Promise = require('bluebird');

describe('falljs scope', function() {
	beforEach(function() {
		this.scope = falls.createScope();
	});
	it('can register noop function', function() {
		this.scope.register(function(){});
	});
	it('does not serve coffee', function(done) {
		this.scope.get('coffee').then(done.fail).catch(done);
	});
	it('gets and resolves sync functions', function(done) {
		this.scope.register(syncFunction);
		this.scope.get('syncFunction').then(done).catch(done.fail);
	});
	it('gets and resolves simple async functions', function(done) {
		this.scope.register(asyncFunction);
		this.scope.get('asyncFunction').then(done).catch(done.fail);
	});
});

function syncFunction() {
	return 'ala ma kota';
}
function asyncFunction() {
	return Promise.timeout(0);
}