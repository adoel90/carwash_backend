"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ApiRoutes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _auth = require("../middleware/auth");

var _routes = require("./routes");

var _index = require("../controllers/index");

var _user = require("../controllers/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiRoutes = exports.ApiRoutes = function (_Routes) {
	_inherits(ApiRoutes, _Routes);

	function ApiRoutes() {
		_classCallCheck(this, ApiRoutes);

		var _this = _possibleConstructorReturn(this, (ApiRoutes.__proto__ || Object.getPrototypeOf(ApiRoutes)).call(this));

		_this.app = _express2.default.Router();
		return _this;
	}

	_createClass(ApiRoutes, [{
		key: "routes",
		value: function routes() {
			var _this2 = this;

			var indexController = new _index.IndexController();
			var userController = new _user.UserController();

			this.app.get("/", function (req, res) {
				try {
					return _this2.success(res);
				} catch (err) {
					return _this2.error(res);
				}
			});

			/*--- Start User routes ---*/
			this.app.post("/user/authenticate", function (req, res) {
				var param = {
					username: req.body.username,
					password: req.body.password
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				userController.authenticate(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End User routes ---*/

			return this.app;
		}
	}]);

	return ApiRoutes;
}(_routes.Routes);