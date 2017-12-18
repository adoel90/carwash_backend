"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _auth = require("./middleware/auth");

var _apiRoutes = require("./routes/apiRoutes");

var _model = require("./models/model");

var _config = require("../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exphbs = require('express-handlebars');
var pg = require("pg-promise")({ promiseLib: require("q") });
global.dbConn = pg(_config2.default.postgres);

var app = (0, _express2.default)();

app.engine('handlebars', exphbs({ extname: '.hbs' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	return next();
});

if (_config2.default.docs) {
	app.use('/docs', _express2.default.static(__dirname + "/../docs"));
	app.use(_express2.default.static(__dirname + "/../docs"));

	app.get("/api-docs", require(__dirname + "/../docs/docs"));
}

app.use("/public", _express2.default.static(__dirname + "/../public"));

app.use((0, _auth.initialize)());

var apiRouter = new _apiRoutes.ApiRoutes();
app.use(apiRouter.routes());

app.server = _http2.default.createServer(app);

app.server.listen(_config2.default.server.port, function () {
	var model = new _model.Model();
	model.getQueue().then(function (queue) {
		var q = {};
		for (var i = 0; i < queue.length; i++) {
			q[queue[i].cf_id] = parseInt(queue[i].cf_queue);
		}

		global.$queue = q;
	}).catch(function (err) {
		console.log(err);
	});
	console.log('Started on port ' + _config2.default.server.port);
});