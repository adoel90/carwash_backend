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

			this.app.get("/", function (req, res) {
				try {
					return _this2.success(res);
				} catch (err) {
					return _this2.error(res);
				}
			});

			/*--- Start User routes ---*/
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
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				userController.userList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End User routes ---*/

			/*--- Start Member routes ---*/
			this.app.get("/member/list", _auth.verifyToken, function (req, res) {
				var param = {
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0
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

			this.app.post("/member/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name,
					phone: req.body.phone ? req.body.phone : null,
					email: req.body.email ? req.body.email : null,
					address: req.body.address ? req.body.address : null,
					balance: req.body.balance,
					card: req.body.card
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

			this.app.post("/member/authenticate", _auth.verifyToken, function (req, res) {
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
					balance: req.body.balance
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
					bonus: req.body.bonus
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
					name: req.body.name
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
			/*--- End Card routes ---*/

			/*--- Start Service routes ---*/
			this.app.get("/service/type", _auth.verifyToken, function (req, res) {
				var param = {};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.serviceType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/service/type/list", _auth.verifyToken, function (req, res) {
				var param = {
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.serviceTypeList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/service/type/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.createServiceType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/service/type/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.updateServiceType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/service/type/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.deleteServiceType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/service", _auth.verifyToken, function (req, res) {
				var param = {
					type: req.query.type
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.service(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/service/list", _auth.verifyToken, function (req, res) {
				var param = {
					type: req.query.type,
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.serviceList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/service/create", _auth.verifyToken, this.upload.single("image"), function (req, res) {
				var param = {
					type: req.body.type,
					name: req.body.name,
					price: req.body.price,
					desc: req.body.description ? req.body.description : null,
					img: req.file ? req.file : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.createService(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/service/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					price: req.body.price,
					desc: req.body.description ? req.body.description : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.updateService(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/service/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.deleteService(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/service/transaction/create", _auth.verifyMemberToken, function (req, res) {
				var param = {
					member: res.locals.member.id,
					service: req.body.service
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				serviceController.createServiceTransaction(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});
			/*--- End Service routes ---*/

			/*--- Start Cafe routes ---*/
			this.app.get("/cafe/type", _auth.verifyToken, function (req, res) {
				var param = {};

				cafeController.cafeType(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/cafe/type/list", _auth.verifyToken, function (req, res) {
				var param = {
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.cafeTypeList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/cafe/type/create", _auth.verifyToken, function (req, res) {
				var param = {
					name: req.body.name
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.createCafe(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/cafe/type/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.updateCafe(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/cafe/type/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.deleteCafe(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/cafe/menu", _auth.verifyToken, function (req, res) {
				var param = {
					cf_id: req.query.cafe
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.cafeMenu(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.get("/cafe/menu/list", _auth.verifyToken, function (req, res) {
				var param = {
					cf_id: req.query.cafe,
					limit: req.query.limit ? req.query.limit : 10,
					offset: req.query.offset ? req.query.offset : 0,
					name: req.query.name ? req.query.name : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.cafeMenuList(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/cafe/menu/create", _auth.verifyToken, this.upload.single('image'), function (req, res) {
				var param = {
					cf_id: req.body.cafe,
					name: req.body.name,
					price: req.body.price,
					desc: req.body.description ? req.body.description : null,
					image: req.file ? req.file : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.createCafeMenu(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/cafe/menu/update", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id,
					name: req.body.name,
					price: req.body.price,
					desc: req.body.description ? req.body.description : null
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.updateCafeMenu(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.put("/cafe/menu/delete", _auth.verifyToken, function (req, res) {
				var param = {
					id: req.body.id
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.deleteCafeMenu(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			this.app.post("/cafe/transaction/create", _auth.verifyMemberToken, function (req, res) {
				var param = {
					member: res.locals.member.id,
					menu: req.body.menu,
					quantity: req.body.quantity
				};

				if (!_this2.checkParameters(param)) {
					return _this2.error(res, 1);
				}

				cafeController.createCafeTransaction(param).then(function (data) {
					return _this2.success(res, data);
				}).catch(function (err) {
					return _this2.error(res, err);
				});
			});

			/*--- End Service routes ---*/

			return this.app;
		}
	}]);

	return ApiRoutes;
}(_routes.Routes);