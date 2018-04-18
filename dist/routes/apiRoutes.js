"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ApiRoutes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _auth = require("../middleware/auth");

var _routes = require("./routes");

var _index = require("../controllers/index");

var _user = require("../controllers/user");

var _member = require("../controllers/member");

var _card = require("../controllers/card");

var _service = require("../controllers/service");

var _cafe = require("../controllers/cafe");

var _report = require("../controllers/report");

var _access = require("../controllers/access");

var _employee = require("../controllers/employee");

var _store = require("../controllers/store");

var _staff = require("../controllers/staff");

var _promo = require("../controllers/promo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiRoutes = exports.ApiRoutes = function (_Routes) {
	_inherits(ApiRoutes, _Routes);

	function ApiRoutes() {
		_classCallCheck(this, ApiRoutes);

		var _this = _possibleConstructorReturn(this, (ApiRoutes.__proto__ || Object.getPrototypeOf(ApiRoutes)).call(this));

		_this.app = _express2.default.Router();
		return _this;
	}

	_createClass(ApiRoutes, [{
		key: "routes",
		value: function routes() {
			var _this2 = this;

			var indexController = new _index.IndexController();
			var userController = new _user.UserController();
			var memberController = new _member.MemberController();
			var cardController = new _card.CardController();
			var serviceController = new _service.ServiceController();
			var cafeController = new _cafe.CafeController();
			var reportController = new _report.ReportController();
			var accessController = new _access.AccessController();
			var employeeController = new _employee.EmployeeController();
			var storeController = new _store.StoreController();
			var staffController = new _staff.StaffController();
			var promoController = new _promo.PromoController();

			this.app.get("/", function (req, res) {
				try {
					return _this2.success(res);
				} catch (err) {
					return _this2.error(res);
				}
			});

			/* Start Admin user routes */
			this.app.post("/user/authenticate", function (req, res) {
				var param = {
					username: req.body.username,
					password: req.body.password
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				userController.authenticate(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/user/list", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.query.name ? req.query.name : null,
					access: req.query.access ? req.query.access : null,
					active: req.query.active ? req.query.active : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				userController.allUser(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/user/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, err);
				}

				userController.userDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/user/create", _auth.verifyToken, function (req, res) {
				var param = {
					username: req.body.username,
					password: req.body.password,
					name: req.body.name,
					email: req.body.email ? req.body.email : null,
					level: req.body.level
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				userController.createUser(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/user/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					username: req.body.username,
					password: req.body.password ? req.body.password : null,
					name: req.body.name,
					email: req.body.email ? req.body.email : null,
					level: req.body.level
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				userController.updateUser(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/user/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				userController.deleteUser(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/* End Admin user routes */

			/*--- Start Admin Access routes ---*/
			this.app.get("/access/list", _auth.verifyToken, function (req, res) {
				var param = {
					active: req.query.active ? req.query.active : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				accessController.getAllAccess(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/access/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				accessController.accessDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/access/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name,
					module: req.body.module
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}
				if (!Array.isArray(param.module) || param.module.length < 1) {
					return _this2.error(res, 1);
				}

				accessController.createAccess(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/access/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					module: req.body.module
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}
				if (!Array.isArray(param.module) || param.module.length < 1) {
					return _this2.error(res, 1);
				}

				accessController.updateAccess(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/access/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				accessController.statusAccess(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/module", _auth.verifyToken, function (req, res) {
				var param = {};

				accessController.allModule(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Admin Access routes ---*/

			/*--- Start Admin Store routes ---*/
			this.app.get("/store/list", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id ? req.query.id : null,
					active: req.query.active ? req.query.active : null
				};

				storeController.getStoreList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id ? req.query.id : null
				};

				storeController.getStoreDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/store/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name,
					category: req.body.category,
					user: req.body.user
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.createNewStore(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					category: req.body.category,
					charge: req.body.charge ? req.body.charge : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.updateStore(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.deleteStore(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.changeStoreStatus(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Admin Store routes ---*/

			/*--- Start Admin Category Store routes ---*/
			this.app.get("/store/category", _auth.verifyToken, function (req, res) {
				var param = {};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.getStoreCategoryList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Admin Category Store routes ---*/

			/*--- Start Discount Store routes */
			this.app.get("/store/discount", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id,
					active: req.query.active ? req.query.active : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				promoController.getPromo(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/discount/list", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id,
					start_date: req.query.start_date ? req.query.start_date : null,
					end_date: req.query.end_date ? req.query.end_date : null,
					active: req.query.active ? req.query.active : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				promoController.getPromoList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/discount/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				promoController.getPromoDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/store/discount/create", _auth.verifyToken, function (req, res) {
				var param = {
					store: req.body.store,
					price: req.body.price,
					date: req.body.date ? req.body.date : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				promoController.createNewPromo(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/discount/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					price: req.body.price
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				promoController.updatePromo(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/discount/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				promoController.deletePromo(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/discount/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				promoController.changeStatusPromo(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Discount Store routes */

			/*--- Start Staff Store routes ---*/
			this.app.get("/store/staff/list", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id,
					active: req.query.active ? req.query.active : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.getStaffList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/staff/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.getStaffDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/store/staff/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name,
					username: req.body.username,
					password: req.body.password,
					email: req.body.email ? req.body.email : null,
					level: req.body.level,
					store: req.body.store
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.createNewStaff(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/staff/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					username: req.body.username,
					password: req.body.password ? req.body.password : null,
					email: req.body.email ? req.body.email : null,
					level: req.body.level
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.updateStaff(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/staff/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.deleteStaff(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/staff/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.changeStaffStatus(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/store/staff/job/create", _auth.verifyToken, function (req, res) {
				var param = {
					staff: req.body.staff,
					store: req.body.store
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.addJob(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/staff/job/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					staff: req.body.staff,
					store: req.body.store
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.changeJob(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.delete("/store/staff/job/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.deleteJob(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/staff/report", _auth.verifyToken, function (req, res) {
				var param = {
					staff: req.query.staff ? req.query.staff : null,
					store: req.query.store ? req.query.store : null,
					start_date: req.query.start_date ? req.query.start_date : null,
					end_date: req.query.end_date ? req.query.end_date : null,
					print: req.query.print ? req.query.print : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.getReportStaffByTransaction(param).then(function (data) {
					if (param.print) {
						return _this2.render(res, "reportUser", data);
					} else {
						return _this2.success(res, data);
					}
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/staff/report/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id ? req.query.id : null,
					staff: req.query.staff ? req.query.staff : null,
					store: req.query.store ? req.query.store : null,
					start_date: req.query.start_date ? req.query.start_date : null,
					end_date: req.query.end_date ? req.query.end_date : null,
					print: req.query.print ? req.query.print : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				staffController.getReportStaffByTransactionDetail(param).then(function (data) {
					if (param.print) {
						return _this2.render(res, "reportUser", data);
					} else {
						return _this2.success(res, data);
					}
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Staff Store routes ---*/

			/*--- Start Menu Store routes ---*/
			this.app.get("/store/menu/list", _auth.verifyToken, function (req, res) {
				var param = {
					store_id: req.query.store,
					name: req.query.name ? req.query.name : null,
					active: req.query.active ? req.query.active : null,
					print: req.query.print ? req.query.print : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.getStoreMenuList(param).then(function (data) {
					if (param.print) {
						return _this2.render(res, "menu", data);
					} else {
						return _this2.success(res, data);
					}
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/menu/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.getStoreMenuDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/store/menu/create", _auth.verifyToken, this.upload.single('image'), function (req, res) {
				var param = {
					store_id: req.body.store,
					name: req.body.name,
					price: req.body.price,
					desc: req.body.description ? req.body.description : null,
					image: req.file ? req.file : null,
					category: req.body.category ? req.body.category : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.createStoreMenu(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/menu/update", _auth.verifyToken, this.upload.single("image"), function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					price: req.body.price,
					desc: req.body.description ? req.body.description : null,
					image: req.file ? req.file : null,
					category: req.body.category ? req.body.category : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.updateStoreMenu(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/menu/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.deleteStoreMenu(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/store/menu/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.changeStoreMenuStatus(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Menu Store routes ---*/

			/*--- Start Owner Store routes ---*/
			this.app.post("/store/transaction/create", _auth.verifyMemberToken, function (req, res) {
				var param = {
					member: res.locals.member.id,
					menu: req.body.menu,
					store: req.body.store,
					discount: req.body.discount ? req.body.discount : 0,
					increase: req.body.increase ? req.body.increase : false,
					staff: req.body.staff ? req.body.staff : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.createStoreTransaction(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/transaction/print", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.storeTransactionDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/report", _auth.verifyToken, function (req, res) {
				var param = {
					type: req.query.type ? req.query.type : "month",
					start_date: req.query.start_date,
					end_date: req.query.end_date,
					store: req.query.store ? req.query.store : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.storeReport(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/report/transactions", _auth.verifyToken, function (req, res) {
				var param = {
					store: req.query.store,
					start_date: req.query.start_date ? req.query.start_date : null,
					end_date: req.query.end_date ? req.query.end_date : null,
					print: req.query.print ? req.query.print : false,
					convert: req.query.convert ? req.query.convert : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.storeReportTransactions(param).then(function (data) {
					if (param.print) {
						return _this2.render(res, "reportTransactions", data);
					} else if (param.convert) {
						return _this2.convertToXls(res, data);
					} else {
						return _this2.success(res, data);
					}
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/store/report/transactions/item", _auth.verifyToken, function (req, res) {
				var param = {
					store: req.query.store,
					start_date: req.query.start_date ? req.query.start_date : null,
					end_date: req.query.end_date ? req.query.end_date : null,
					print: req.query.print ? req.query.print : false,
					convert: req.query.convert ? req.query.convert : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				storeController.storeReportTransactionsItem(param).then(function (data) {
					if (param.print) {
						return _this2.render(res, "reportTransactions", data);
					} else if (param.convert) {
						return _this2.convertToXls(res, data);
					} else {
						return _this2.success(res, data);
					}
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Owner Store routes ---*/

			/*--- Start Member routes ---*/
			this.app.get("/member", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.query.name ? req.query.name : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.memberAll(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/member/list", _auth.verifyToken, function (req, res) {
				var param = {
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0,
					name: req.query.name ? req.query.name : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.memberList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/member/detail", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id,
					transaction: req.query.transaction == "true" ? true : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.memberDetail(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/member/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name,
					phone: req.body.phone ? req.body.phone : null,
					email: req.body.email ? req.body.email : null,
					address: req.body.address ? req.body.address : null,
					card: req.body.card,
					payment: req.body.payment,
					staff: req.body.staff ? req.body.staff : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.createMember(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/member/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					phone: req.body.phone ? req.body.phone : null,
					email: req.body.email ? req.body.email : null,
					address: req.body.address ? req.body.address : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.updateMember(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/member/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.deleteMember(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/member/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.changeMemberStatus(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/member/authenticate", function (req, res) {
				var param = {
					c_id: req.body.card
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.memberAuthenticate(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/member/topup", _auth.verifyMemberToken, function (req, res) {
				var param = {
					id: res.locals.member.id,
					type: res.locals.member.type,
					balance: req.body.balance,
					payment: req.body.payment,
					staff: req.body.staff ? req.body.staff : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.topupMember(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/member/topup/print", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.query.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.topupData(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/member/refund", _auth.verifyToken, function (req, res) {
				var param = {
					/* id : res.locals.member.id,
     card : res.locals.member.card,
     type : res.locals.member.type */
					card: req.body.card,
					staff: req.body.staff ? req.body.staff : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				};

				memberController.refundMember(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/member/card/change", _auth.verifyToken, function (req, res) {
				var param = {
					member: req.body.member,
					card: req.body.card
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.changeCard(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Member routes ---*/

			/*--- Start Card routes ---*/
			this.app.get("/card/type", function (req, res) {
				var param = {};

				cardController.cardType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/card/type/list", _auth.verifyToken, function (req, res) {
				var param = {
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cardController.cardTypeList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/card/type/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name,
					min: req.body.minimum,
					bonus: req.body.bonus,
					refund: req.body.refund ? req.body.refund : false,
					charge: req.body.charge ? req.body.charge : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cardController.createCardType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/card/type/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					min: req.body.minimum,
					bonus: req.body.bonus,
					refund: req.body.refund ? req.body.refund : false,
					charge: req.body.charge ? req.body.charge : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cardController.updateCardType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/card/type/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cardController.deleteCardType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/card/type/status", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cardController.updateCardTypeStatus(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Card routes ---*/

			/*--- Start Report routes ---*/
			this.app.get("/report/member/list", _auth.verifyToken, function (req, res) {
				var param = {
					start_date: req.query.start_date,
					end_date: req.query.end_date,
					print: req.query.print ? req.query.print : false,
					convert: req.query.convert ? req.query.convert : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				reportController.getReportMember(param).then(function (data) {
					if (param.print) {
						return _this2.render(res, "member", data);
					} else if (param.convert) {
						return _this2.convertToXls(res, data);
					} else {
						return _this2.success(res, data);
					}
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/report/member/graph", _auth.verifyToken, function (req, res) {
				var param = {
					type: req.query.type ? req.query.type : "month",
					start_date: req.query.start_date,
					end_date: req.query.end_date
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				reportController.getReportMemberGraph(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/report/owner", _auth.verifyToken, function (req, res) {
				var param = {
					start_date: req.query.start_date,
					end_date: req.query.end_date
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				reportController.getReportOwner(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/report/user", _auth.verifyToken, function (req, res) {
				var param = {
					start_date: req.query.start_date,
					end_date: req.query.end_date,
					user: req.query.user ? req.query.user : null,
					print: req.query.print ? req.query.print : false
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				reportController.getReportUser(param).then(function (data) {
					if (param.print) {
						return _this2.render(res, "reportUser", data);
					} else {
						return _this2.success(res, data);
					}
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Report routes ---*/

			/*--- Start Tier routes ---*/
			this.app.get("/tier/list", _auth.verifyToken, function (req, res) {
				var param = {};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				memberController.getTierList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Tier routes ---*/

			return this.app;
		}
	}]);

	return ApiRoutes;
}(_routes.Routes);