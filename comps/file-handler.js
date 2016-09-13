var Promise = require('bluebird');
var fs = require('fs');

// handles file:///etc/passwd uris
// returns [String] with file contents
module.exports = fileHandler;
fileHandler.produces = 'file://*';

function fileHandler(uri) {
    var path = uri.slice(7);
    return Promise.fromNode(fs.readFile, path);
}
