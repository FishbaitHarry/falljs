var express = require('express');

function createServer(params) {
	var middlewares = params.middlewares;
	var app = express();
	middlewares.forEach(middleware => app.use(middleware));
	return app.listen(port);
}

module.exports = createServer;
module.exports.produces = 'express-server';
module.exports.inject = {
	middlewares: 'allOf://express-middleware',
	config: 'express-config'
};