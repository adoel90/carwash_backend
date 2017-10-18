import http from "http";
import express from "express";
import bodyParser from "body-parser";

import { initialize } from "./middleware/auth";
import { ApiRoutes } from "./routes/apiRoutes";
import config from "../config.json";

const exphbs = require('express-handlebars');
const pg = require("pg-promise")({promiseLib: require("q")});
global.dbConn = pg(config.postgres);

let app = express();

app.engine('handlebars', exphbs({extname: '.hbs'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 1000000}));
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	return next();
});

if(config.docs){
	app.use('/docs', express.static(__dirname+"/../docs"));
	app.use(express.static(__dirname+"/../docs"));

	app.get("/api-docs", require(__dirname+"/../docs/docs"));
}


app.use(initialize());

let apiRouter = new ApiRoutes();
app.use(apiRouter.routes());

app.server = http.createServer(app);

app.server.listen(config.server.port, () => {
	console.log('Started on port '+config.server.port);
});