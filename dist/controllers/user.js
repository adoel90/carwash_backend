"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _token = require("../utils/token");

var _user = require("../models/user");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserController = exports.UserController = function (_Controller) {
	_inherits(UserController, _Controller);

	function UserController() {
		_classCallCheck(this, UserController);

		return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).call(this));
	}

	/*
 ** Authenticate user to get access token
 ** POST :: /user/authenticate
 */


	_createClass(UserController, [{
		key: "authenticate",
		value: function authenticate(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var userModel = new _user.UserModel();
				var token = new _token.Token();

				userModel.getUserByUsername(param.username).then(function (user) {
					param.password = _this2.encrypt(param.password);
					if (user.u_password != param.password) {
						return reject(11);
					}

					var userData = _this2.build.user(user);

					var result = {
						accessToken: token.encode(user),
						user: userData
					};
					return resolve(result);
				}).catch(function (err) {

					if (err.code == 0) {
						return reject(10);
					} else {
						return reject(err);
					}
				});
			});
		}

		/*
  ** Get users list
  ** GET :: /user/list
  */

	}, {
		key: "userList",
		value: function userList(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var userModel = new _user.UserModel();

				userModel.getUserList(param.limit, param.offset).then(function (user) {
					var result = {
						row: user[0][0].count,
						data: []
					};

					for (var i = 0; i < user[1].length; i++) {
						result.data.push(_this3.build.user(user[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return UserController;
}(_controller.Controller);