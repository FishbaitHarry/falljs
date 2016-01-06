function createScope(parentScope) {
	var handlers = [appHandler, httpHandler, fileHandler];
	var modules = {};

	function getModule(id) {
		return modules[id] || parentScope.getModule(id);
	}

	// handles [String] with URI of nay supported type
	// returns [Promise] with result of handler
	function dereference(uri) {
		return handlers.find(function(handler) {
			return handler.canHandle(uri);
		})(uri);
	}

	// handles [String] app://module-name uris
	// returns [Promise] with result of module-name function
	function appHandler(uri) {
		var id = uri.slice(6);
		var module = modules[id];
		var deps = module.deps.objectMap(dereference);
		var readyObject = Promise.all(deps).then(module);
		modules[id] = readyObject;
	}

	// handles http://some.address.com/stuff GETs
	// returns [Promise] with content of a GET request
	function httpHandler(uri) {
		return $.ajax({url: uri});
	}

	// handles file:///etc/passwd uris
	// returns [Promise] with file contents
	function fileHandler(uri) {
		var path = uri.slice(7);
		return Promise.fromNode(fs.readFile, path);
	}

	return {
		getModule: getModule
	}
}