module.exports = [
    modelProvider,
    collectionProvider
];

// @param uri e.g. 'persistence://users/142'
// @returns [Backbone.Model] of the desired id, supports save
modelProvider.produces = 'persistence://*/*';
modelProvider.inject = { db: 'dbadapter' };
function modelProvider(params) {
    var collectionName = params.uri.getParam(0);
    var modelId = params.uri.getParam(1);
    return params.db.collection(collectionName).findOne(modelId);
}

// @param uri e.g. 'persistence://users'
// @returns [Backbone.Collection] supporting add/remove
collectionProvider.produces = 'persistence://*';
