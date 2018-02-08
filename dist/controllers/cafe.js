"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CafeController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _token = require("../utils/token");

var _cafe = require("../models/cafe");

var _menu = require("../models/menu");

var _member = require("../models/member");

var _url = require("url");

var _user = require("../models/user");

var _employee = require("../models/employee");

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
 ** Authenticate users cafe
 ** POST :: /cafe/authenticate
 */


	_createClass(CafeController, [{
		key: "authenticate",
		value: function authenticate(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var userModel = new _user.UserModel();
				var employeeModel = new _employee.EmployeeModel();
				var token = new _token.Token();

				param.password = _this2.encrypt(param.password);
				employeeModel.getEmployeeByUsername(param.username).then(function (employee) {
					if (employee.emp_password != param.password) {
						return reject(11);
					}

					employee = _this2.build.employee(employee);
					var result = {
						accessToken: token.encode(employee),
						employee: employee
					};
					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});

				// param.password = this.encrypt(param.password);
				// userModel.getUserByUsername(param.username).then((user) => {
				// 	if(user.u_password != param.password){
				// 		return reject(11);
				// 	}

				// 	if(user.ul_id === 3 || user.ul_id === 5) {
				// 		user = this.build.user(user);
				// 		let result = {
				// 			accessToken : token.encode(user),
				// 			user : user
				// 		}
				// 		return resolve(result);
				// 	} else {
				// 		return reject(40);
				// 	}
				// }).catch((err) => {
				// 	if(err.code == 0){
				// 		return reject(10);
				// 	}
				// 	return reject(err);
				// });
			});
		}

		/*
  ** Get cafe type
  ** GET :: /cafe/type
  */

	}, {
		key: "cafeType",
		value: function cafeType(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				cafeModel.getCafeType().then(function (cafe) {
					var result = [];

					for (var i = 0; i < cafe.length; i++) {
						result.push(_this3.build.cafeType(cafe[i]));
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
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				cafeModel.getCafeTypeList(param.limit, param.offset).then(function (cafe) {
					var result = {
						row: cafe[0][0].count,
						cafe: []
					};

					for (var i = 0; i < cafe[1].length; i++) {
						result.cafe.push(_this4.build.cafeType(cafe[1][i]));
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
				var employeeModel = new _employee.EmployeeModel();
				var userModel = new _user.UserModel();

				var cafeParam = {
					cf_name: param.name
				};
				cafeModel.insertCafe(cafeParam).then(function (cafe) {
					userModel.getUserById(param.user).then(function (user) {
						var paramUser = {
							emp_name: user.u_name,
							emp_username: user.u_username,
							emp_email: user.u_email,
							emp_password: user.u_password,
							emp_access: 0,
							cf_id: cafe.cf_id
						};

						employeeModel.createEmployee(paramUser).then(function () {
							return resolve(true);
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
  ** Update cafe type data
  ** PUT :: /cafe/type/update
  */

	}, {
		key: "updateCafe",
		value: function updateCafe(param) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				var cafeParam = {
					cf_name: param.name,
					updated_at: _this5.moment(new Date()).format()
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
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				var cafeParam = {
					deleted_at: _this6.moment(new Date()).format()
				};
				cafeModel.updateCafe(param.id, cafeParam).then(function (cafe) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Change cafe type status
  ** PUT :: /cafe/type/status
  */

	}, {
		key: "changeCafeStatus",
		value: function changeCafeStatus(param) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				cafeModel.getCafeTypeById(param.id).then(function (cafe) {
					var cafeParam = {
						deleted_at: cafe.deleted_at ? null : _this7.moment(new Date()).format()
					};
					cafeModel.updateCafe(param.id, cafeParam).then(function () {
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
  ** Get cafe menu
  ** GET :: /cafe/menu
  */

	}, {
		key: "cafeMenu",
		value: function cafeMenu(param) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getCafeMenu(param.cf_id).then(function (menu) {
					var result = [];
					for (var i = 0; i < menu.length; i++) {
						result.push(_this8.build.menu(menu[i]));
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
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getCafeMenuList(param.cf_id, param.limit, param.offset, param.name).then(function (menu) {
					var result = {
						row: menu[0][0].count,
						menu: []
					};

					for (var i = 0; i < menu[1].length; i++) {
						result.menu.push(_this9.build.menu(menu[1][i]));
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
			var _this10 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var image = _this10.rewriteImage(param.image);
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
			var _this11 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var menuParam = {
					mn_name: param.name,
					mn_price: param.price,
					mn_desc: param.desc,
					updated_at: _this11.moment(new Date()).format()
				};

				if (param.image) {
					menuParam.mn_img = _this11.rewriteImage(param.image);
				}

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
			var _this12 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				var menuParam = {
					deleted_at: _this12.moment(new Date()).format()
				};
				menuModel.updateCafeMenu(param.id, menuParam).then(function (data) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Change cafe menu status
  ** PUT :: /cafe/menu/status
  */

	}, {
		key: "changeCafeMenuStatus",
		value: function changeCafeMenuStatus(param) {
			var _this13 = this;

			return new Promise(function (resolve, reject) {
				var menuModel = new _menu.MenuModel();

				menuModel.getCafeMenuById(param.id).then(function (menu) {
					var menuParam = {
						deleted_at: menu.deleted_at ? null : _this13.moment(new Date()).format()
					};
					menuModel.updateCafeMenu(param.id, menuParam).then(function () {
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
  ** Create new cafe transaction
  ** POST :: /cafe/transaction/create
  */

	}, {
		key: "createCafeTransaction",
		value: function createCafeTransaction(param) {
			var _this14 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();
				var menuModel = new _menu.MenuModel();
				var memberModel = new _member.MemberModel();

				var findMenu = [];
				for (var i = 0; i < param.menu.length; i++) {
					findMenu.push(param.menu[i].id);
				}

				var cafe = null;

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
									cafe = menu[_i].cf_id;

									param.menu[j].price = menu[_i].mn_price;
								}
							}
						}

						cafeModel.getCafeQueue(cafe).then(function (queue) {
							var transParam = {
								m_id: member.m_id,
								tc_total: total,
								tc_queue: queue
							};
							cafeModel.insertCafeTransaction(transParam).then(function (transaction) {
								cafeModel.insertCafeTransactionMenu(transaction.tc_id, param.menu).then(function () {
									memberModel.decreaseBalance(transParam.m_id, total).then(function () {
										var result = _this14.build.member(member);
										result.transaction = transaction.tc_id;
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

		/*
  ** Get cafe transaction print data
  ** GET :: /cafe/transaction/print
  */

	}, {
		key: "cafeTransactionDetail",
		value: function cafeTransactionDetail(param) {
			var _this15 = this;

			return new Promise(function (resolve, reject) {
				var cafeModel = new _cafe.CafeModel();

				cafeModel.getCafeTransactionById(param.id).then(function (transaction) {
					var result = _this15.build.transactionCafe(transaction);
					cafeModel.getCafeTransactionMenuById(param.id).then(function (menu) {
						result.menu = [];
						for (var i = 0; i < menu.length; i++) {
							var mn = _this15.build.menu(menu[i]);
							mn.cafe = _this15.build.cafeType(menu[i]);
							result.menu.push(mn);
						}
						return resolve(result);
					}).catch(function (err) {
						return reject(err);
					});
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return CafeController;
}(_controller.Controller);