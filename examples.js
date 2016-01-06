

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
