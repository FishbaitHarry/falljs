// Use instead of require('module-name') if you want a module to be mockable.
// handles [String] module://module-name uris
// returns [Object] with result of requiring module-name
module.exports = moduleHandler;
moduleHandler.produces = 'module://*'

function moduleHandler(params) {
    var moduleName = params.uri.slice(9);
    return require(moduleName);
}
