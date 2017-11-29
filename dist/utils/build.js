"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Build = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _config = require("../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Build = exports.Build = function () {
	function Build() {
		_classCallCheck(this, Build);
	}

	_createClass(Build, [{
		key: "checkImage",
		value: function checkImage(filename) {
			if (_fs2.default.existsSync(__dirname + "/../../public/" + filename)) {
				return _config2.default.server.host + "public/" + filename;
			} else {
				return null;
			}
		}
	}, {
		key: "user",
		value: function user(data) {
			var user = {
				id: data.u_id,
				name: data.u_name,
				username: data.u_username,
				email: data.u_email
			};

			if (data.deleted_at) {
				user.deleted = true;
			}

			if (data.ul_name) {
				user.level = {
					id: data.ul_id,
					name: data.ul_name
				};
			}

			return user;
		}
	}, {
		key: "member",
		value: function member(data) {
			var member = {
				id: data.m_id,
				name: data.m_name,
				phone: data.m_phone,
				email: data.m_email,
				address: data.m_address,
				balance: data.m_balance,
				card: {
					id: data.c_id
				}
			};

			if (data.ct_id) {
				member.card.type = this.card(data);
			}

			return member;
		}
	}, {
		key: "card",
		value: function card(data) {
			var card = {
				id: data.ct_id,
				name: data.ct_name,
				min: data.ct_min,
				bonus: data.ct_bonus,
				status: true
			};

			if (data.deleted_at) {
				card.status = false;
			}

			return card;
		}
	}, {
		key: "serviceType",
		value: function serviceType(data) {
			var type = {
				id: data.srvt_id,
				name: data.srvt_name
			};

			return type;
		}
	}, {
		key: "cafeType",
		value: function cafeType(data) {
			var type = {
				id: data.cf_id,
				name: data.cf_name
			};

			if (data.deleted_at) {
				type.deleted = true;
			}

			return type;
		}
	}, {
		key: "menu",
		value: function menu(data) {
			var menu = {
				id: data.mn_id,
				name: data.mn_name,
				price: data.mn_price,
				description: data.mn_desc,
				image: this.checkImage(data.mn_img)
			};

			return menu;
		}
	}, {
		key: "service",
		value: function service(data) {
			var service = {
				id: data.srv_id,
				name: data.srv_name,
				price: data.srv_price,
				description: data.srv_desc,
				image: this.checkImage(data.srv_img)
			};

			return service;
		}
	}, {
		key: "transactionCafe",
		value: function transactionCafe(data) {
			var transaction = {
				id: data.tc_id,
				date: data.tc_date,
				member: this.member(data)
			};

			return transaction;
		}
	}, {
		key: "transactionService",
		value: function transactionService(data) {
			var transaction = {
				id: data.tsrv_id,
				date: data.tsrv_date,
				member: this.member(data)
			};

			return transaction;
		}
	}]);

	return Build;
}();