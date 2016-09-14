var argv = require('yargs').argv;
var env = process.env;

function getConfig(params) {
	return {
		port: argv.port || env.PORT || 3000,
		bodyParser: true,
		printErrors: argv.dev || env.DEV || false
	}
}

module.exports = getConfig;
module.exports.produces = 'express-config';