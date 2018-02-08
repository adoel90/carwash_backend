"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initialize = initialize;
exports.verifyToken = verifyToken;
exports.verifyMemberToken = verifyMemberToken;
exports.verifyCafeToken = verifyCafeToken;

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require("passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _config = require("../../config.json");

var _config2 = _interopRequireDefault(_config);

var _response3 = require("../utils/response");

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
			var response = _response3.Response.code(0);
			return res.status(response.get("status")).send({ status: response.get("status"), message: response.get("message") });
		} else {
			var decode = _jwtSimple2.default.decode(req.query.accessToken, JWTConfig.jwtSecret, "HS512");

			res.locals.user = decode;
			// console.log("here");
			return next();
		}
	})(req, res, next);
}

function verifyMemberToken(req, res, next) {
	var JWTConfig = _config2.default.jwt;
	_passport2.default.authenticate("jwt", { session: false }, function (err, user, info) {
		if (err) {
			console.log(err);
			return next(err);
		}

		if (!user) {
			var response = _response3.Response.code(0);
			return res.status(response.get("status")).send({ status: response.get("status"), message: response.get("message") });
		} else {
			var decode = _jwtSimple2.default.decode(req.query.accessToken, JWTConfig.jwtSecret, "HS512");

			if (!decode.card) {
				var _response = _response3.Response.code(0);
				if (decode.u_id) {
					_response = _response3.Response.code(3);
				}
				return res.status(_response.get("status")).send({ status: _response.get("status"), message: _response.get("message") });
			}

			var now = (0, _moment2.default)(new Date()).format("x");
			var expired = (0, _moment2.default)(decode.expired).format("x");
			if (now > expired) {
				var _response2 = _response3.Response.code(2);
				return res.status(_response2.get("status")).send({ status: _response2.get("status"), message: _response2.get("message") });
			}
			res.locals.member = decode;
			// console.log("here");
			return next();
		}
	})(req, res, next);
}

function verifyCafeToken(req, res, next) {
	var JWTConfig = _config2.default.jwt;
	_passport2.default.authenticate("jwt", { session: false }, function (err, user, info) {
		if (err) {
			console.log(err);
			return next(err);
		}

		if (!user) {
			var response = _response3.Response.code(0);
			return res.status(response.get("status")).send({ status: response.get("status"), message: response.get("message") });
		} else {
			var decode = _jwtSimple2.default.decode(req.query.accessToken, JWTConfig.jwtSecret, "HS512");

			res.locals.user = decode;
			// console.log("here");
			return next();
		}
	})(req, res, next);
}