var falljs = require('../index');
var Promise = require('bluebird');

describe('registered functions', function() {
	beforEach(function() {
		this.scope = falls.createScope();
	});
	it('can be get by name', function(done) {
		this.scope.register(function funcName(){});
		this.scope.get('funcName').then(done,done.fail);
	});
	it('can be get by id', function(done) {
		function funcName(){}
		funcName.id = 'someId';
		this.scope.register(funcName);
		this.scope.get('someId').then(done,done.fail);
	});
});

function syncFunction() {
	return 'sync value';
}
function asyncFunction() {
	return Promise.resolve('async value');
}