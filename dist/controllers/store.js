'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StoreController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _store = require('../models/store');

var _menu = require('../models/menu');

var _member = require('../models/member');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreController = exports.StoreController = function (_Controller) {
	_inherits(StoreController, _Controller);

	function StoreController() {
		_classCallCheck(this, StoreController);

		return _possibleConstructorReturn(this, (StoreController.__proto__ || Object.getPrototypeOf(StoreController)).call(this));
	}

	/*
 ** Get list store
 ** GET :: /store/list
 */


	_createClass(StoreController, [{
		key: 'getStoreList',
		value: function getStoreList(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				storeModel.getStoreList(param.id, param.active).then(function (store) {
					var result = {
						row: store[0][0].count,
						store: []
					};

					for (var i = 0; i < store[1].length; i++) {
						result.store.push(_this2.build.store(store[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get detail store
  ** GET :: /store/detail
  */

	}, {
		key: 'getStoreDetail',
		value: function getStoreDetail(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				storeModel.getDetailStoreById(param.id).then(function (store) {
					var result = _this3.build.store(store);

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new store
  ** POST :: /store/create
  */

	}, {
		key: 'createNewStore',
		value: function createNewStore(param) {
			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				var paramStore = {
					store_name: param.name,
					cstore_id: param.category
				};

				storeModel.createStore(paramStore).then(function (store) {
					var ownerStore = {
						u_id: param.user,
						store_id: store.store_id,
						o_status: true
					};

					storeModel.createOwnerStore(ownerStore).then(function () {
						return resolve(true);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update store data
  ** PUT :: /store/update
  */

	}, {
		key: 'updateStore',
		value: function updateStore(param) {
			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				var paramStore = {
					store_name: param.name,
					cstore_id: param.category,
					store_charge: param.charge
				};

				storeModel.updateStore(paramStore, param.id).then(function (store) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete store data
  ** PUT :: /store/delete
  */

	}, {
		key: 'deleteStore',
		value: function deleteStore(param) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				var paramStore = {
					deleted_at: _this4.moment(new Date()).format()
				};

				storeModel.updateStore(paramStore, param.id).then(function (store) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Change store status
  ** PUT :: /store/status
  */

	}, {
		key: 'changeStoreStatus',
		value: function changeStoreStatus(param) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				storeModel.getDetailStoreById(param.id).then(function (store) {
					var paramStore = {
						deleted_at: store.deleted_at ? null : _this5.moment(new Date()).format()
					};

					storeModel.updateStore(paramStore, param.id).then(function () {
						return resolve(true);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get store menu
  ** GET :: /store/menu/list
  */

	}, {
		key: 'getStoreMenuList',
		value: function getStoreMenuList(param) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getStoreMenuList(param.store_id, param.name, param.active).then(function (menu) {
					var result = {
						row: menu[0][0].count,
						menu: []
					};

					for (var i = 0; i < menu[1].length; i++) {
						result.menu.push(_this6.build.menu(menu[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
       ** Get store menu
       ** GET :: /store/menu/detail
       */

	}, {
		key: 'getStoreMenuDetail',
		value: function getStoreMenuDetail(param) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getStoreMenuDetail(param.id).then(function (menu) {
					var result = _this7.build.menu(menu);

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new store menu
  ** POST :: /store/menu/create
  */

	}, {
		key: 'createStoreMenu',
		value: function createStoreMenu(param) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var image = _this8.rewriteImage(param.image);
				var menuParam = {
					store_id: param.store_id,
					mn_name: param.name,
					mn_price: param.price,
					mn_desc: param.desc,
					mn_img: image,
					mn_category: param.category
				};

				menuModel.insertStoreMenu(menuParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update store menu data
  ** PUT :: /store/menu/update
  */

	}, {
		key: 'updateStoreMenu',
		value: function updateStoreMenu(param) {
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var menuParam = {
					mn_name: param.name,
					mn_price: param.price,
					mn_desc: param.desc,
					mn_category: param.category,
					updated_at: _this9.moment(new Date()).format()
				};

				if (param.image) {
					menuParam.mn_img = _this9.rewriteImage(param.image);
				}

				menuModel.updateStoreMenu(param.id, menuParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete store menu data
  ** PUT :: /store/menu/delete
  */

	}, {
		key: 'deleteStoreMenu',
		value: function deleteStoreMenu(param) {
			var _this10 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var menuParam = {
					deleted_at: _this10.moment(new Date()).format()
				};

				menuModel.updateStoreMenu(param.id, menuParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Change store menu status
  ** PUT :: /store/menu/status
  */

	}, {
		key: 'changeStoreMenuStatus',
		value: function changeStoreMenuStatus(param) {
			var _this11 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getStoreMenuById(param.id).then(function (menu) {
					var menuParam = {
						deleted_at: menu.deleted_at ? null : _this11.moment(new Date()).format()
					};

					menuModel.updateStoreMenu(param.id, menuParam).then(function () {
						return resolve(true);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new store transaction
  ** POST :: /store/transaction/create
  */

	}, {
		key: 'createStoreTransaction',
		value: function createStoreTransaction(param) {
			var _this12 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();
				var menuModel = new _menu.MenuModel();
				var memberModel = new _member.MemberModel();

				var findMenu = [];
				for (var i = 0; i < param.menu.length; i++) {
					findMenu.push(param.menu[i].id);
				}

				var store = null;

				memberModel.getMemberById(param.member).then(function (member) {
					var balance = member.m_balance;
					var total = 0;

					menuModel.findMenuById(findMenu).then(function (menu) {
						for (var _i = 0; _i < menu.length; _i++) {
							for (var j = 0; j < param.menu.length; j++) {
								if (param.menu[j].id == menu[_i].mn_id) {
									var price = void 0;
									if (param.increase) {
										price = param.menu[j].price + param.menu[j].price * parseInt(param.discount) / 100;
									} else {
										price = param.menu[j].price - param.menu[j].price * parseInt(param.discount) / 100;
									}
									total += price * param.menu[j].quantity;
									if (balance - total < 0) {
										return reject(31);
									}
									store = menu[_i].store_id;

									param.menu[j].price = price;
								}
							}
						}

						storeModel.getStoreQueue(store).then(function (queue) {
							var transParam = {
								m_id: member.m_id,
								ts_total: total,
								ts_queue: queue,
								store_id: param.store,
								created_by: param.staff
							};

							storeModel.insertStoreTransaction(transParam).then(function (transaction) {
								storeModel.insertStoreTransactionMenu(transaction.ts_id, param.menu).then(function () {
									memberModel.decreaseBalance(transParam.m_id, total).then(function () {
										var result = _this12.build.member(member);
										result.transaction = transaction.ts_id;
										result.balance -= total;

										return resolve(result);
									}).catch(function (err) {
										return reject(err);
									});
								}).catch(function (err) {
									return reject(err);
								});
							}).catch(function (err) {
								return reject(err);
							});
						}).catch(function (err) {
							return reject(err);
						});
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get store transaction print data
  ** GET :: /store/transaction/print
  */

	}, {
		key: 'storeTransactionDetail',
		value: function storeTransactionDetail(param) {
			var _this13 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				storeModel.getStoreTransactionById(param.id).then(function (transaction) {
					var result = _this13.build.transactionStore(transaction);
					storeModel.getStoreTransactionMenuById(param.id).then(function (menu) {
						result.menu = [];
						var storeQueue = void 0;
						var dateTime = void 0;

						for (var i = 0; i < menu.length; i++) {
							var mn = _this13.build.menu(menu[i]);
							mn.store = _this13.build.storeType(menu[i]);
							storeQueue = menu[i].store_queue;
							dateTime = menu[i].created_at;
							result.menu.push(mn);
						}

						result.queue = storeQueue;
						result.date = dateTime;

						return resolve(result);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get report transaction per-store
  ** GET :: /store/report
  */

	}, {
		key: 'storeReport',
		value: function storeReport(param) {
			var _this14 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				var result = _this14.buildRange(param.type, param.start_date, param.end_date);
				var format = "DD MMM YYYY";
				if (param.type == "month") {
					format = "MMM YYYY";
				} else if (param.type == "year") {
					format = "YYYY";
				}

				storeModel.getGraphReportTransactionByType(param.type, param.start_date, param.end_date, param.store).then(function (reportStore) {
					for (var i = 0; i < reportStore.length; i++) {
						var date = _this14.moment(reportStore[i].date).format(format);
						if (result[date]) {
							result[date].transaction += parseFloat(reportStore[i].sum);
						}
					}

					var data = [];
					for (var _i2 in result) {
						result[_i2].name = _i2;
						data.push(result[_i2]);
					}

					return resolve(data);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** get detail report transaction per-store
  ** GET :: /store/report/transaction
  */

	}, {
		key: 'storeReportTransactions',
		value: function storeReportTransactions(param) {
			var _this15 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				storeModel.getReportDetailByStore(param.store, param.start_date, param.end_date).then(function (store) {
					var result = {
						count: store[0][0].count,
						store: []
					};

					for (var i = 0; i < store[1].length; i++) {
						result.store.push(_this15.build.storeTransaction(store[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get store category list
  ** GET :: /store/category
  */

	}, {
		key: 'getStoreCategoryList',
		value: function getStoreCategoryList(param) {
			var _this16 = this;

			return new Promise(function (resolve, reject) {
				var storeModel = new _store.StoreModel();

				storeModel.getStoreCategoryList().then(function (category) {
					var result = [];

					for (var i = 0; i < category.length; i++) {
						result.push(_this16.build.categoryStore(category[i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return StoreController;
}(_controller.Controller);