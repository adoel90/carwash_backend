"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserModel = exports.UserModel = function (_Model) {
	_inherits(UserModel, _Model);

	function UserModel() {
		_classCallCheck(this, UserModel);

		return _possibleConstructorReturn(this, (UserModel.__proto__ || Object.getPrototypeOf(UserModel)).call(this));
	}

	/* Get user by user_id and level_access */


	_createClass(UserModel, [{
		key: "getUserByAccessId",
		value: function getUserByAccessId(data) {
			this.db.init();
			this.db.select("users");
			this.db.whereAny("users.u_id", data.u_id);
			this.db.where("ul_id", data.ul_id);

			return this.db.execute(true);
		}

		/* Get user by Access Level */

	}, {
		key: "getUserByLevelAccess",
		value: function getUserByLevelAccess(id) {
			this.db.init();
			this.db.select("users");
			this.db.where("ul_id", id);
			this.db.order("u_id");

			return this.db.execute();
		}
	}, {
		key: "getUserById",
		value: function getUserById(u_id) {
			this.db.init();
			this.db.select("users");
			this.db.join("user_level", "users.ul_id = user_level.ul_id");
			this.db.where("u_id", u_id);

			return this.db.execute(true);
		}
	}, {
		key: "getUserStatusById",
		value: function getUserStatusById(u_id) {
			this.db.init();
			this.db.select("users");
			this.db.where("u_id", u_id);

			return this.db.execute(true);
		}

		/*** Get user by username ***/

	}, {
		key: "getUserByUsername",
		value: function getUserByUsername(username) {
			this.db.select("users");
			this.db.join("user_level", "user_level.ul_id = users.ul_id");
			this.db.where("u_username", username);
			this.db.whereIsNull("users.deleted_at");

			return this.db.execute(true);
		}

		/*** Get user by username All ***/

	}, {
		key: "getUserByUsernameUnique",
		value: function getUserByUsernameUnique(username) {
			this.db.init();
			this.db.select("users");
			this.db.where("lower(u_username)", username.toLowerCase());

			return this.db.execute();
		}

		/*** Get user by username All ***/

	}, {
		key: "getUserByUsernameAll",
		value: function getUserByUsernameAll(username) {
			this.db.select("users");
			this.db.join("user_level", "user_level.ul_id = users.ul_id");
			this.db.where("u_username", username);

			return this.db.execute(true);
		}
	}, {
		key: "getUser",
		value: function getUser(name, access, active, limit, offset) {
			this.db.init();
			this.db.select("users", "users.*, user_level.ul_id, user_level.ul_name");
			this.db.join("user_level", "user_level.ul_id = users.ul_id");
			this.db.where('user_level.ul_id', 1, null, '!=');
			if (name) {
				this.db.whereLike("lower(u_name)", "%" + name.toLowerCase() + "%");
			}
			if (access) {
				this.db.where("users.ul_id", access);
			}
			if (active) {
				this.db.whereIsNull("users.deleted_at");
			}
			// this.db.order("u_id");
			this.db.order("users.deleted_at IS NULL", true);
			this.db.limit(limit, offset);

			return this.db.execute();
		}

		/*** Get user list ***/

	}, {
		key: "getUserList",
		value: function getUserList(limit, offset) {
			this.db.init();
			this.db.select("users", "count(*)");
			this.db.join("user_level", "user_level.ul_id = users.ul_id");
			// this.db.whereIsNull("deleted_at");		
			this.db.push();

			this.db.select("users");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}
	}, {
		key: "getUserListUsername",
		value: function getUserListUsername() {
			this.db.select("users", "u_username");

			return this.db.execute();
		}

		/*** Insert user data ***/

	}, {
		key: "insertUser",
		value: function insertUser(param) {
			this.db.init();
			this.db.insert("users", param, "u_id");

			return this.db.execute(true);
		}

		/*** Insert user vendor data ***/

	}, {
		key: "insertUserVendor",
		value: function insertUserVendor(param) {
			this.db.init();
			this.db.insert("users", param, "u_id");

			return this.db.execute(true);
		}

		/*** Update user data ***/

	}, {
		key: "updateUser",
		value: function updateUser(id, param) {
			this.db.init();
			this.db.update("users", param);
			this.db.where("u_id", id);

			return this.db.execute();
		}
	}]);

	return UserModel;
}(_model.Model);