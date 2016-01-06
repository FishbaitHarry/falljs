function handleIndex(params) {
	return 'Hello world!'
}

module.exports = handleIndex;
module.exports.produces = 'app:///home';
module.exports.inject = {};