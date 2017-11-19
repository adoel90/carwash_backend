"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CafeController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _cafe = require("../models/cafe");

var _menu = require("../models/menu");

var _member = require("../models/member");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CafeController = exports.CafeController = function (_Controller) {
	_inherits(CafeController, _Controller);

	function CafeController() {
		_classCallCheck(this, CafeController);

		return _possibleConstructorReturn(this, (CafeController.__proto__ || Object.getPrototypeOf(CafeController)).call(this));
	}

	/*
 ** Get cafe type
 ** GET :: /cafe/type
 */


	_createClass(CafeController, [{
		key: "cafeType",
		value: function cafeType(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				cafeModel.getCafeType().then(function (cafe) {
					var result = [];

					for (var i = 0; i < cafe.length; i++) {
						result.push(_this2.build.cafeType(cafe[i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get list of cafe type
  ** GET :: /cafe/type/list
  */

	}, {
		key: "cafeTypeList",
		value: function cafeTypeList(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				cafeModel.getCafeTypeList(param.limit, param.offset).then(function (cafe) {
					var result = {
						row: cafe[0][0].count,
						cafe: []
					};

					for (var i = 0; i < cafe[1].length; i++) {
						result.cafe.push(_this3.build.cafeType(cafe[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new cafe type
  ** POST :: /cafe/type/create
  */

	}, {
		key: "createCafe",
		value: function createCafe(param) {
			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				var cafeParam = {
					cf_name: param.name
				};
				cafeModel.insertCafe(cafeParam).then(function (cafe) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update cafe type data
  ** PUT :: /cafe/type/update
  */

	}, {
		key: "updateCafe",
		value: function updateCafe(param) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				var cafeParam = {
					cf_name: param.name,
					updated_at: _this4.moment(new Date()).format()
				};
				cafeModel.updateCafe(param.id, cafeParam).then(function (cafe) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete cafe type data
  ** PUT :: /cafe/type/delete
  */

	}, {
		key: "deleteCafe",
		value: function deleteCafe(param) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				var cafeParam = {
					deleted_at: _this5.moment(new Date()).format()
				};
				cafeModel.updateCafe(param.id, cafeParam).then(function (cafe) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get cafe menu
  ** GET :: /cafe/menu
  */

	}, {
		key: "cafeMenu",
		value: function cafeMenu(param) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getCafeMenu(param.cf_id).then(function (menu) {
					var result = [];
					for (var i = 0; i < menu.length; i++) {
						result.push(_this6.build.menu(menu[i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get cafe menu list
  ** GET :: /cafe/menu/list
  */

	}, {
		key: "cafeMenuList",
		value: function cafeMenuList(param) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getCafeMenuList(param.cf_id, param.limit, param.offset, param.name).then(function (menu) {
					var result = {
						row: menu[0][0].count,
						menu: []
					};

					for (var i = 0; i < menu[1].length; i++) {
						result.menu.push(_this7.build.menu(menu[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new cafe menu
  ** POST :: /cafe/menu/create
  */

	}, {
		key: "createCafeMenu",
		value: function createCafeMenu(param) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var image = _this8.rewriteImage(param.image);
				var menuParam = {
					cf_id: param.cf_id,
					mn_name: param.name,
					mn_price: param.price,
					mn_desc: param.desc,
					mn_img: image
				};
				menuModel.insertCafeMenu(menuParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update cafe menu data
  ** PUT :: /cafe/menu/update
  */

	}, {
		key: "updateCafeMenu",
		value: function updateCafeMenu(param) {
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var menuParam = {
					mn_name: param.name,
					mn_price: param.price,
					mn_desc: param.desc,
					updated_at: _this9.moment(new Date()).format()
				};
				menuModel.updateCafeMenu(param.id, menuParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete cafe menu data
  ** PUT :: /cafe/menu/delete
  */

	}, {
		key: "deleteCafeMenu",
		value: function deleteCafeMenu(param) {
			var _this10 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var menuParam = {
					deleted_at: _this10.moment(new Date()).format()
				};
				menuModel.updateCafeMenu(param.id, menuParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new cafe transaction
  ** POST :: /cafe/transaction/create
  */

	}, {
		key: "createCafeTransaction",
		value: function createCafeTransaction(param) {
			var _this11 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();
				var menuModel = new _menu.MenuModel();
				var memberModel = new _member.MemberModel();

				var findMenu = [];
				for (var i = 0; i < param.menu.length; i++) {
					findMenu.push(param.menu[i].id);
				}

				memberModel.getMemberById(param.member).then(function (member) {
					var balance = member.m_balance;
					var total = 0;
					menuModel.findMenuById(findMenu).then(function (menu) {
						for (var _i = 0; _i < menu.length; _i++) {
							for (var j = 0; j < param.menu.length; j++) {
								if (param.menu[j].id == menu[_i].mn_id) {
									total += menu[_i].mn_price * param.menu[j].quantity;
									if (balance - total < 0) {
										return reject(31);
									}

									param.menu[j].price = menu[_i].mn_price;
								}
							}
						}

						var transParam = {
							m_id: member.m_id,
							tc_total: total
						};
						cafeModel.insertCafeTransaction(transParam).then(function (transaction) {
							cafeModel.insertCafeTransactionMenu(transaction.tc_id, param.menu).then(function () {
								memberModel.decreaseBalance(transParam.m_id, total).then(function () {
									var result = _this11.build.member(member);
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
				/*memberModel.getMemberById(param.member).then((member) => {
    	menuModel.getMenuById(param.menu).then((menu) => {
    		if(member.m_balance < menu.mn_price){
    			return reject(31);
    		}
    		
    		let transParam = {
    			m_id : member.m_id,
    			mn_id : menu.mn_id,
    			tc_quantity : param.quantity,
    			tc_price : menu.mn_price
    		}
    		let total = (transParam.tc_quantity * transParam.tc_price);
    		cafeModel.insertCafeTransaction(transParam).then((transaction) => {
    			memberModel.decreaseBalance(transParam.m_id, total).then(() => {
    				let result = this.build.member(member);
    				result.balance -= total;
    					return resolve(result);
    			}).catch((err) => {
    				return reject(err);
    			});
    		}).catch((err) => {
    			return reject(err);
    		});
    	}).catch((err) => {
    		return reject(err);
    	});
    }).catch((err) => {
    	return reject(err);
    });*/
			});
		}
	}]);

	return CafeController;
}(_controller.Controller);