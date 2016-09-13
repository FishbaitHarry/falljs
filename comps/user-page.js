function createResponse(params) {
    return "Hello! I am: " + JSON.stringify(params.userModel);
}

module.exports = createResponse;
module.exports.produces = 'http://server/user/:id';
module.exports.inject = {
    request: 'request',
    userModel: 'resource://user/:id',
    groupModel: 'resource://user/:id/group'
}
