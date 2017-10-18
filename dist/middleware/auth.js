"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initialize = initialize;
exports.verifyToken = verifyToken;

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require("passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _config = require("../../config.json");

var _config2 = _interopRequireDefault(_config);

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initialize() {
	var STRATEGY = _passportJwt2.default.Strategy;
	var EXTRACTJWT = _passportJwt2.default.ExtractJwt;
	var JWTConfig = _config2.default.jwt;

	var params = {
		secretOrKey: JWTConfig.jwtSecret,
		jwtFromRequest: EXTRACTJWT.fromUrlQueryParameter('accessToken')
	};

	var strategy = new STRATEGY(params, function (payload, done) {
		return done(null, payload);
	});

	_passport2.default.use(strategy);

	return _passport2.default.initialize();
}

function verifyToken(req, res, next) {
	var JWTConfig = _config2.default.jwt;
	_passport2.default.authenticate("jwt", { session: false }, function (err, user, info) {
		if (err) {
			console.log(err);
			return next(err);
		}

		if (!user) {
			var response = _response.Response.code(0);
			return res.status(response.get("status")).send({ status: response.get("status"), message: response.get("message") });
		} else {
			var decode = _jwtSimple2.default.decode(req.query.accessToken, JWTConfig.jwtSecret, "HS512");

			res.locals.user = decode;
			// console.log("here");
			return next();
		}
	})(req, res, next);
}