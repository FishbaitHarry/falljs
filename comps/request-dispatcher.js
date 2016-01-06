function createMiddleware(params) {
	var container = params.container;
	function handleRequest(req, res, next) {
		var handlerId = 'app://' + req.path;
		var requestScope = container.createScope('request');
		requestScope.inject({request:req, response:res});
		requestScope.get(url).then(handleResult, () => next() );
		function handleResult(result) {
			// handler returned response content
			if (typeof result == 'string') {
				res.status(200).end(result);
			}
			// handler returned just the status
			if (typeof result == 'number') {
				res.status(result).end();
			}
			// handler returned RESTful data
			if (typeof result == 'object') {
				requestScope.inject({resource:result});
				requestScope.get('view-resolver');
			}
			// assume handler took care of response
		}
	}
	return handleRequest;
}

module.exports = createMiddleware;
module.exports.produces = 'request-dispatcher';
module.inject = {
	container: 'container',
	config: 'request-dispatcher-config'
};