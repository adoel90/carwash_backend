"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Build = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

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
				email: data.u_email,
				status: true
			};

			if (data.deleted_at || data.users_deleted) {
				user.status = false;
			}

			if (data.ul_name) {
				user.level = this.accessLevel(data);
			}

			if (data.o_status) {
				user.owner = data.o_status;
			}

			if (data.o_id) {
				user.owner_id = data.o_id;
			}

			return user;
		}
	}, {
		key: "accessLevel",
		value: function accessLevel(data) {
			var access = {
				id: data.ul_id,
				name: data.ul_name,
				status: true
			};

			if (data.deleted_at) {
				access.status = false;
			}
			return access;
		}
	}, {
		key: "module",
		value: function module(data) {
			var module = {
				id: data.mod_id,
				name: data.mod_name,
				group: data.mod_group,
				path: data.mod_path
			};

			return module;
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
				payment: data.m_payment,
				card: {
					id: data.c_id
				},
				status: true
			};

			if (data.ct_id) {
				member.card.type = this.card(data);
			}

			if (data.deleted) {
				member.status = false;
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
				refund: data.ct_refund,
				charge: data.ct_charge,
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
				name: data.srvt_name,
				status: true
			};

			if (data.deleted_at) {
				type.status = false;
			}

			return type;
		}
	}, {
		key: "storeType",
		value: function storeType(data) {
			var type = {
				id: data.cf_id,
				name: data.cf_name,
				status: true
			};

			if (data.deleted_at) {
				type.status = false;
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
				image: this.checkImage(data.mn_img),
				status: true,
				category: data.mn_category
			};

			if (data.deleted_at) {
				menu.status = false;
			}

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
				image: this.checkImage(data.srv_img),
				status: true
			};

			if (data.deleted_at) {
				service.status = false;
			}

			return service;
		}
	}, {
		key: "transactionStore",
		value: function transactionStore(data) {
			var transaction = {
				id: data.ts_id,
				date: data.ts_date,
				queue: data.ts_queue,
				total: data.ts_total,
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
				queue: data.tsrv_queue,
				total: data.tsrv_price,
				member: this.member(data)
			};

			return transaction;
		}
	}, {
		key: "reportRangeDate",
		value: function reportRangeDate(start, end, data) {
			var result = [];
			start = (0, _moment2.default)(start);
			end = (0, _moment2.default)(end);
			var diff = end.diff(start, "days");

			var c = 0;
			for (var i = 0; i <= diff; i++) {
				var total = 0;
				if ((0, _moment2.default)(data[c].date).format("DDMMYYYY") == (0, _moment2.default)(start).format("DDMMYYYY")) {
					total = data[c].sum;
					c++;
				}
				result.push({
					date: (0, _moment2.default)(start).format("DD-MM-YYYY"),
					total: total
				});
				start = (0, _moment2.default)(start).add(1, "days");
			}

			return result;
		}
	}, {
		key: "topup",
		value: function topup(data) {
			var topup = {
				id: data.tp_id,
				date: data.tp_date,
				total: data.tp_value,
				payment: data.tp_payment
			};

			return topup;
		}

		/*** Employee access ***/

	}, {
		key: "employeeAccess",
		value: function employeeAccess(code) {
			code += 1;
			var name = ["Deactive", "Admin", "Kasir"];

			return name[code];
		}

		/*** Employee list ***/

	}, {
		key: "employee",
		value: function employee(data) {
			var user = {
				id: data.emp_id,
				name: data.emp_name,
				username: data.emp_username,
				email: data.emp_email,
				vendor: data.cf_id,
				access: {
					code: parseInt(data.emp_access),
					name: this.employeeAccess(data.emp_access)
				},
				status: true
			};

			if (data.deleted_at) {
				user.status = false;
			}

			// if(data.ul_name){
			// 	user.level = this.accessLevel(data);
			// }

			return user;
		}
	}, {
		key: "store",
		value: function store(data) {
			var store = {
				id: data.store_id,
				name: data.store_name,
				status: true,
				owner: data.o_status
			};

			if (data.cstore_id && data.cstore_name) {
				var category = {
					cstore_id: data.cstore_id,
					cstore_name: data.cstore_name
				};

				store.type = this.categoryStore(category);
			}

			if (data.u_id && data.u_name) {
				var user = {
					u_id: data.u_id,
					u_name: data.u_name
				};

				store.user = this.user(user);
			}

			if (data.deleted_at) {
				store.status = false;
			}

			if (data.store_charge) {
				store.charge = data.store_charge;
			}

			return store;
		}
	}, {
		key: "categoryStore",
		value: function categoryStore(data) {
			var cstore = {
				id: data.cstore_id,
				name: data.cstore_name
			};

			return cstore;
		}
	}, {
		key: "staff",
		value: function staff(data) {
			var user = {
				id: data.u_id,
				name: data.u_name,
				username: data.u_username,
				email: data.u_email,
				store: data.store_id,
				level: data.level,
				status: true
			};

			if (data.deleted_at || data.users_deleted) {
				user.status = false;
			}

			if (data.ul_name) {
				user.level = this.accessLevel(data);
			}

			return user;
		}
	}, {
		key: "promo",
		value: function promo(data) {
			var promo = {
				id: data.p_id,
				price: data.p_price,
				date: (0, _moment2.default)(data.p_date).format("DD MMM YYYY")
			};

			return promo;
		}
	}, {
		key: "reportMember",
		value: function reportMember(data) {
			var reportMember = {
				id: data.m_id,
				name: data.m_name,
				phone: data.m_phone,
				email: data.m_email,
				address: data.m_address,
				balance: data.m_balance,
				payment: data.m_payment,
				card: {
					id: data.c_id
				},
				created_at: (0, _moment2.default)(data.created_at).format("DD MMM YYYY"),
				status: true
			};

			if (data.ct_id) {
				reportMember.card.type = this.card(data);
			}

			if (data.deleted) {
				reportMember.status = false;
			}

			return reportMember;
		}
	}, {
		key: "tierPrice",
		value: function tierPrice(data) {
			var tierData = {
				price: data.tier_price,
				bonus: data.tier_bonus
			};

			return tierData;
		}
	}, {
		key: "storeTransaction",
		value: function storeTransaction(data) {
			var store = {
				id: data.ts_id,
				date: data.ts_date,
				total: parseInt(data.ts_total),
				store: data.store_id
			};

			if (data.m_name) {
				store.member = this.member(data);
			}

			return store;
		}
	}, {
		key: "storeTransactionItem",
		value: function storeTransactionItem(data) {
			var transactionItem = {
				id: data.ts_id,
				date: data.ts_date,
				total: parseInt(data.ts_total),
				store: data.store_id
			};

			if (data.m_name) {
				transactionItem.member = this.member(data);
			}

			if (data.mn_name) {
				transactionItem.menu = this.menu(data);
			}

			return transactionItem;
		}
	}, {
		key: "staffStoreReport",
		value: function staffStoreReport(data) {
			var staffStore = {
				id: data.ts_id,
				queue: data.ts_queue,
				level: data.level,
				status: true,
				date: (0, _moment2.default)(data.ts_date).format("DD MMM YYYY hh:mm:ss"),
				total: data.ts_total,
				user: data.created_at
			};

			if (data.m_name) {
				staffStore.member = this.member(data);
			}

			if (data.store_id) {
				staffStore.store = this.store(data);
			}

			if (data.deleted_at || data.users_deleted) {
				staffStore.status = false;
			}

			if (data.ul_name) {
				staffStore.level = this.accessLevel(data);
			}

			return staffStore;
		}
	}, {
		key: "userReport",
		value: function userReport(data) {
			var userReport = {
				id: data.log_id,
				transaction_date: data.log_date,
				description: data.log_description,
				total: parseInt(data.log_value),
				total_before: parseInt(data.log_before),
				user: data.created_at
			};

			if (data.m_name) {
				userReport.member = this.member(data);
			}

			if (data.store_id) {
				userReport.store = this.store(data);
			}

			if (data.deleted_at || data.users_deleted) {
				userReport.status = false;
			}

			if (data.ul_name) {
				userReport.level = this.accessLevel(data);
			}

			return userReport;
		}
	}, {
		key: "itemMenu",
		value: function itemMenu(data) {
			var itemMenu = [];
			for (var i = 0; i < data.length; i++) {
				var menu = {
					id: data[i].mn_id,
					quantity: data[i].ti_quantity,
					price: parseInt(data[i].ti_price),
					name: data[i].ti_item
				};

				itemMenu.push(menu);
			}

			return itemMenu;
		}
	}, {
		key: "reportOwner",
		value: function reportOwner(data) {
			var reportOwner = {
				users: this.user(data),
				store: this.store(data)
			};

			return reportOwner;
		}
	}]);

	return Build;
}();