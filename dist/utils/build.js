"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Build = exports.Build = function () {
	function Build() {
		_classCallCheck(this, Build);
	}

	_createClass(Build, [{
		key: "user",
		value: function user(data) {
			var user = {
				id: data.u_id,
				name: data.u_name,
				username: data.u_username,
				email: data.u_email
			};

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
				name: data.ct_name
			};

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

			return type;
		}
	}, {
		key: "menu",
		value: function menu(data) {
			var menu = {
				id: data.mn_id,
				name: data.mn_name,
				price: data.mn_price,
				description: data.mn_desc
			};

			return menu;
		}
	}]);

	return Build;
}();