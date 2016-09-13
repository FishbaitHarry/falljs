// handles http://some.address.com/stuff GETs
// returns [String] with content of a GET request
module.exports = httpHandler;
httpHandler.produces = 'http://*';

function httpHandler(params) {
    return $.ajax({url: params.uri});
}
