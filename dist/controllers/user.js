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
						user: []
					};

					for (var i = 0; i < user[1].length; i++) {
						result.user.push(_this3.build.user(user[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new user
  ** POST :: /user/create
  */

	}, {
		key: "createUser",
		value: function createUser(param) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var userModel = new _user.UserModel();

				var userParam = {
					u_name: param.name,
					u_username: param.username,
					u_email: param.email,
					u_password: _this4.encrypt(param.password),
					ul_id: param.level,
					cf_id: param.cafe
				};
				userModel.insertUser(userParam).then(function () {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update user data
  ** PUT :: /user/update
  */

	}, {
		key: "updateUser",
		value: function updateUser(param) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var userModel = new _user.UserModel();

				var userParam = {
					u_name: param.name,
					u_username: param.username,
					u_email: param.email,
					ul_id: param.level,
					cf_id: param.cafe,
					updated_at: _this5.moment(new Date()).format()
				};
				if (param.password) {
					userParam.u_password = _this5.encrypt(param.password);
				}
				userModel.updateUser(param.id, userParam).then(function () {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete user data
  ** PUT :: /user/delete
  */

	}, {
		key: "deleteUser",
		value: function deleteUser(param) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var userModel = new _user.UserModel();

				var userParam = {
					deleted_at: _this6.moment(new Date()).format()
				};
				userModel.updateUser(param.id, userParam).then(function () {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return UserController;
}(_controller.Controller);