function createResponse(params) {
    var req = params.request;
    var res = {};
    params.interceptors.forEach( i => i.handle(req, res) );
    params.controllers.forEach(function(controller) {
        if (controller.match(req)) {
            res.body = controller.handle(req)
        }
    });
    return res;
}

module.exports = createResponse;
module.exports.produces = 'response';
module.exports.inject = {
    request: 'request',
    interceptors: 'type://interceptor',
    controllers: 'type://controller'
}
