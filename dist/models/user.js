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
	}, {
		key: "getUserById",
		value: function getUserById(u_id) {
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
			// this.db.whereIsNull("deleted_at");

			return this.db.execute(true);
		}
	}, {
		key: "getUser",
		value: function getUser(name) {
			this.db.init();
			this.db.select("users", "users.deleted_at as users_deleted, *");
			this.db.join("user_level", "user_level.ul_id = users.ul_id");
			if (name) {
				this.db.whereLike("lower(u_name)", "%" + name.toLowerCase() + "%");
			}

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

		/*** Insert user data ***/

	}, {
		key: "insertUser",
		value: function insertUser(param) {
			this.db.init();
			this.db.insert("users", param);

			return this.db.execute();
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