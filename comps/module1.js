function doStuff(params) {
    return params.x + params.y;
}

module.exports = doStuff;
module.exports.produces = 'stuffResult';
module.exports.inject = {
    x: '12',
    y: '15'
};
