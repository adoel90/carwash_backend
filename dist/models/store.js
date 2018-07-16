"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StoreModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreModel = exports.StoreModel = function (_Model) {
	_inherits(StoreModel, _Model);

	function StoreModel() {
		_classCallCheck(this, StoreModel);

		return _possibleConstructorReturn(this, (StoreModel.__proto__ || Object.getPrototypeOf(StoreModel)).call(this));
	}

	/*** Get Store List ***/


	_createClass(StoreModel, [{
		key: "getStoreList",
		value: function getStoreList(id, active) {
			this.db.init();
			this.db.select("store", "count(*)");
			this.db.join("store_category", "store_category.cstore_id = store.cstore_id", "LEFT");
			this.db.join("owner", "store.store_id = owner.store_id", "LEFT");
			this.db.join("users", "users.u_id = owner.u_id", "LEFT");

			if (id) {
				this.db.where("owner.u_id", id);
			}
			if (active) {
				this.db.whereIsNull("store.deleted_at");
			}
			this.db.push();

			this.db.select("store", "store.*, owner.*, store_category.*, users.u_id, users.u_name, store.deleted_at");
			// this.db.order("store.store_id");
			this.db.order("store.deleted_at IS NULL", true);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Get Detail Store ***/

	}, {
		key: "getDetailStoreById",
		value: function getDetailStoreById(id) {
			this.db.init();
			this.db.select("store", "store.*, owner.*, store_category.*, users.u_id, users.u_name, store.deleted_at");
			this.db.join("store_category", "store_category.cstore_id = store.cstore_id", "LEFT");
			this.db.join("owner", "store.store_id = owner.store_id", "LEFT");
			this.db.join("users", "users.u_id = owner.u_id", "LEFT");
			this.db.where("store.store_id", id);

			return this.db.execute(true);
		}

		/*** Get Detail Store for Delete ***/

	}, {
		key: "getDetailStoreByIdDelete",
		value: function getDetailStoreByIdDelete(id) {
			this.db.init();
			this.db.select("store", "store.deleted_at");
			this.db.join("store_category", "store_category.cstore_id = store.cstore_id", "LEFT");
			this.db.join("owner", "store.store_id = owner.store_id", "LEFT");
			this.db.join("users", "users.u_id = owner.u_id", "LEFT");
			this.db.where("store.store_id", id);

			return this.db.execute(true);
		}

		/*** Create New Store ***/

	}, {
		key: "createStore",
		value: function createStore(data) {
			this.db.init();
			this.db.insert("store", data, "store_id");

			return this.db.execute(true);
		}

		/*** Create multiple store ***/

	}, {
		key: "createOwnerStore",
		value: function createOwnerStore(data) {
			this.db.init();
			this.db.insert("owner", data);

			return this.db.execute();
		}

		/*** Update Store Data ***/

	}, {
		key: "updateStore",
		value: function updateStore(data, id) {
			this.db.init();
			this.db.update("store", data);
			this.db.where("store_id", id);

			return this.db.execute();
		}

		/*** Get store queue ***/

	}, {
		key: "getStoreQueue",
		value: function getStoreQueue(store_id) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2.db.init();
				_this2.db.select("store");
				_this2.db.where("store_id", store_id);
				_this2.db.execute(true).then(function (store) {
					var q = parseInt(store.store_queue) + 1;
					var u = {
						store_queue: q
					};
					_this2.db.init();
					_this2.db.update("store", u);
					_this2.db.where("store_id", store_id);

					_this2.db.execute().then(function () {
						return resolve(q);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*** Insert store transaction ***/

	}, {
		key: "insertStoreTransaction",
		value: function insertStoreTransaction(param) {
			this.db.insert("transaction_store", param, "ts_id");

			return this.db.execute(true);
		}

		/*** Insert store transaction menu ***/

	}, {
		key: "insertStoreTransactionMenu",
		value: function insertStoreTransactionMenu(ts_id, menu) {
			this.db.init();
			for (var i = 0; i < menu.length; i++) {
				var param = {
					ts_id: ts_id,
					mn_id: menu[i].id,
					ti_quantity: menu[i].quantity,
					ti_price: menu[i].price,
					ti_item: menu[i].name
				};
				this.db.insert("transaction_item", param);
				this.db.push(true);
			}

			return this.db.executeMany();
		}

		/*** Get store transaction by id ***/

	}, {
		key: "getStoreTransactionById",
		value: function getStoreTransactionById(id) {
			this.db.init();
			this.db.select("transaction_store");
			this.db.join("member", "member.m_id = transaction_store.m_id");
			this.db.where("ts_id", id);

			return this.db.execute(true);
		}

		/*** Get store transaction menu by id ***/

	}, {
		key: "getStoreTransactionMenuById",
		value: function getStoreTransactionMenuById(ts_id) {
			this.db.init();
			this.db.select("transaction_item");
			this.db.join("menu", "menu.mn_id = transaction_item.mn_id");
			this.db.join("store", "store.store_id = menu.store_id");
			this.db.where("ts_id", ts_id);

			return this.db.execute();
		}

		/*** Report owner store by Type ***/

	}, {
		key: "getGraphReportTransactionByType",
		value: function getGraphReportTransactionByType(type, start, end, store) {
			this.db.init();
			this.db.select("transaction_store", "date(ts_date), sum(ts_total)");
			this.db.group("date(ts_date)");
			this.db.order("date(ts_date)");
			this.db.whereBetween("date(ts_date)", start, end);
			if (store) {
				this.db.where("store_id", store);
			}

			return this.db.execute();
		}

		/*** Report detail transaction per-store ***/

	}, {
		key: "getReportDetailByStore",
		value: function getReportDetailByStore(store, start, end) {
			this.db.init();
			this.db.select("transaction_store", "count(*)");
			this.db.join("member", "member.m_id = transaction_store.m_id", "LEFT");
			this.db.join("card", "card.c_id = member.c_id", "LEFT");
			this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
			this.db.where("store_id", store);
			if (start && end) {
				this.db.whereBetween("date(ts_date)", start, end);
			}
			this.db.push();

			this.db.select("transaction_store");
			this.db.order("transaction_store.ts_date", true);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Report detail transaction item per-store ***/

	}, {
		key: "getReportDetailItemByStore",
		value: function getReportDetailItemByStore(store, start, end) {
			this.db.init();
			this.db.select("transaction_item", "count(*)");
			this.db.join("menu", "menu.mn_id = transaction_item.mn_id");
			this.db.join("transaction_store", "transaction_store.ts_id = transaction_item.ts_id");
			this.db.join("member", "member.m_id = transaction_store.m_id", "LEFT");
			this.db.join("card", "card.c_id = member.c_id", "LEFT");
			this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
			this.db.where("transaction_store.store_id", store);
			if (start && end) {
				this.db.whereBetween("date(ts_date)", start, end);
			}
			this.db.push();

			this.db.select("transaction_item");
			this.db.order("transaction_store.ts_date", true);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Get Store Category List ***/

	}, {
		key: "getStoreCategoryList",
		value: function getStoreCategoryList() {
			this.db.init();
			this.db.select("store_category");

			return this.db.execute();
		}

		/*** Get store transaction data ***/

	}, {
		key: "getStoreTransaction",
		value: function getStoreTransaction(m_id) {
			this.db.init();
			this.db.select("transaction_store");
			if (m_id) {
				this.db.where("m_id", m_id);
			}

			return this.db.execute();
		}

		/*** Get store by user ***/

	}, {
		key: "getStoreByUserId",
		value: function getStoreByUserId(id) {
			this.db.init();
			this.db.select("owner");
			this.db.join("store", "store.store_id = owner.store_id");
			this.db.where("owner.u_id", id);
			this.db.order("o_id");

			return this.db.execute();
		}
	}]);

	return StoreModel;
}(_model.Model);