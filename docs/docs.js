var	express = require('express'),
	fs = require('fs'),
	app = express();

module.exports = function(req, res, next){
	var config = {
		title : "805 Carwash API Documentations",
		api : JSON.parse(fs.readFileSync(__dirname+"/api.json", 'utf8'))
	}

	var api = {};

	Object.keys(config.api).sort().forEach(function(v, i) {
		api[v] = config.api[v];
	});

	config.api = api;

	res.render('../docs/views/docs', {config : config});
}