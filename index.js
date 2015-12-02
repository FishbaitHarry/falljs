var handlers = [appHandler, httpHandler, fileHandler];
var modules = {};

function dereference(uri) {
	return handlers.find(function(handler) {
		return handler.canHandle(uri);
	})(uri);
}

// handles app://module-name uris
function appHandler(uri) {
	var id = uri.slice(6);
	var module = modules[id];
	var deps = module.deps.objectMap(dereference);
	return Promise.all(deps).then(module);
}

// handles http://some.address.com/stuff GETs
function httpHandler(uri) {
	return $.ajax({url: uri});
}

// handles file:///etc/passwd uris
function fileHandler(uri) {
	var path = uri.slice(7);
	return Promise.fromNode(fs.readFile, path);
}

// example modules

modules.userController = userController;
modules.userController.scope = 'request';
modules.userController.deps = {
	req: 'app://request',
	res: 'app://response',
	userService: 'app://userService'
};
function userController(params) {
	var req = params.req;
	return params.userService
	.findUser({id: req.params.id})
	.then(function(user) {
		res.json(user.toJSON());
	});
}

modules.renderer = renderer;
modules.renderer.scope = 'request';
modules.renderer.deps = {
	model: 'app://model',
	res: 'app://response',
	config: 'app://config'
};
function renderer(params) {
	var template = config.getTemplates().first();
	var renderedHtml = template(params.model);
	params.res.send(renderedHtml);
}