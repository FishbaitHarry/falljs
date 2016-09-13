var http = require('http');


function startServer(params) {
    var server = http.createServer(onRequest);
    server.listen(params.port);

    function onRequest(request, response) {
        var requestScope = params.container.newChildScope();
        requestScope.register({'request': request});
        requestScope.get('response').then(onResponseReady);

        function onResponseReady(responseData) {
            response.end(responseData);
        }
    }
}

module.exports = startServer;
module.exports.produces = 'app://main';
module.exports.inject = {
    container: 'container://currentScope',
    port: '3000'
}
