"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CafeModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CafeModel = exports.CafeModel = function (_Model) {
	_inherits(CafeModel, _Model);

	function CafeModel() {
		_classCallCheck(this, CafeModel);

		return _possibleConstructorReturn(this, (CafeModel.__proto__ || Object.getPrototypeOf(CafeModel)).call(this));
	}

	/*** Get cafe type ***/


	_createClass(CafeModel, [{
		key: "getCafeType",
		value: function getCafeType() {
			this.db.select("cafe");
			// this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get cafe type by ct_id ***/

	}, {
		key: "getCafeTypeById",
		value: function getCafeTypeById(cf_id) {
			this.db.init();
			this.db.select("cafe");
			this.db.where("cf_id", cf_id);

			return this.db.execute(true);
		}

		/*** Get cafe type list ***/

	}, {
		key: "getCafeTypeList",
		value: function getCafeTypeList(limit, offset) {
			this.db.select("cafe", "count(*)");
			// this.db.whereIsNull("deleted_at");
			this.db.push();

			this.db.select("cafe");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Insert cafe data ***/

	}, {
		key: "insertCafe",
		value: function insertCafe(param) {
			this.db.insert("cafe", param);

			return this.db.execute();
		}

		/*** Update cafe data ***/

	}, {
		key: "updateCafe",
		value: function updateCafe(cf_id, param) {
			this.db.update("cafe", param);
			this.db.where("cf_id", cf_id);

			return this.db.execute();
		}

		/*** Insert cafe transaction ***/

	}, {
		key: "insertCafeTransaction",
		value: function insertCafeTransaction(param) {
			this.db.insert("transaction_cafe", param, "tc_id");

			return this.db.execute(true);
		}

		/*** Insert cafe transaction menu ***/

	}, {
		key: "insertCafeTransactionMenu",
		value: function insertCafeTransactionMenu(tc_id, menu) {
			this.db.init();
			for (var i = 0; i < menu.length; i++) {
				var param = {
					tc_id: tc_id,
					mn_id: menu[i].id,
					tcm_quantity: menu[i].quantity,
					tcm_price: menu[i].price
				};
				this.db.insert("transaction_cafe_menu", param);
				this.db.push(true);
			}

			return this.db.executeMany();
		}

		/*** Get cafe transaction report ***/

	}, {
		key: "getCafeTransactionReport",
		value: function getCafeTransactionReport(start, end, cafe) {
			this.db.init();
			this.db.select("transaction_cafe", "count(*)");
			this.db.join("transaction_cafe_menu", "transaction_cafe_menu.tc_id = transaction_cafe.tc_id");
			this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
			this.db.join("cafe", "cafe.cf_id = menu.cf_id");
			this.db.join("member", "member.m_id = transaction_cafe.m_id");
			this.db.whereBetween("date(tc_date)", start, end);
			if (cafe) {
				this.db.where("cafe.cf_id", cafe);
			}
			this.db.push();

			this.db.select("transaction_cafe");
			this.db.push();

			return this.db.executeMany();
		}

		/*** Get cafe transaction summary ***/

	}, {
		key: "getCafeTransactionSummary",
		value: function getCafeTransactionSummary(start, end) {
			this.db.init();
			this.db.select("transaction_cafe", "cf_id, sum(tcm_quantity * tcm_price)");
			this.db.join("transaction_cafe_menu", "transaction_cafe_menu.tc_id = transaction_cafe.tc_id");
			this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
			this.db.whereBetween("date(tc_date)", start, end);
			this.db.group("cf_id");

			return this.db.execute();
		}

		/*** Get cafe transaction report ***/

	}, {
		key: "cafeTransactoinReport",
		value: function cafeTransactoinReport(start, end, cafe) {
			this.db.init();
			this.db.select("transaction_cafe", "date(tc_date), sum(tcm_quantity * tcm_price)");
			this.db.join("transaction_cafe_menu", "transaction_cafe_menu.tc_id = transaction_cafe.tc_id");
			this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
			this.db.whereBetween("date(tc_date)", start, end);
			if (cafe) {
				this.db.where("cafe.cf_id", cafe);
			}
			this.db.group("date(tc_date)");

			return this.db.execute();
		}

		/*** Get cafe transaction by id ***/

	}, {
		key: "getCafeTransactionById",
		value: function getCafeTransactionById(id) {
			this.db.init();
			this.db.select("transaction_cafe");
			this.db.join("member", "member.m_id = transaction_cafe.m_id");
			this.db.where("tc_id", id);

			return this.db.execute(true);
		}

		/*** Get cafe transaction menu by tc_id ***/

	}, {
		key: "getCafeTransactionMenuById",
		value: function getCafeTransactionMenuById(tc_id) {
			this.db.init();
			this.db.select("transaction_cafe_menu");
			this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
			this.db.join("cafe", "cafe.cf_id = menu.cf_id");
			this.db.where("tc_id", tc_id);

			return this.db.execute();
		}

		/* getCafeQueue(cf_id) {
  	if(!cf_id) {
  		return null ;
  	}
  	let q = $queue[cf_id] + 1;
  	$queue[cf_id] += 1;
  	
  	this.db.init();
  	this.db.select("cafe");
  	this.db.where("cf_id", cf_id);
  	this.db.execute(true).then((cafe) => {
  		if(q > cafe.cf_queue) {
  			let u = {
  				cf_queue : q
  			}
  			this.db.init();
  			this.db.update("cafe", u);
  			this.db.where("cf_id", cf_id);
  				this.db.execute().catch((err) => {
  				console.log(err);
  			});
  		}
  	}).catch((err) => {
  		console.log(err);
  	});
  	
  	return q;
  } */

	}, {
		key: "getCafeQueue",
		value: function getCafeQueue(cf_id) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2.db.init();
				_this2.db.select("cafe");
				_this2.db.where("cf_id", cf_id);
				_this2.db.execute(true).then(function (cafe) {
					var q = parseInt(cafe.cf_queue) + 1;
					var u = {
						cf_queue: q
					};
					_this2.db.init();
					_this2.db.update("cafe", u);
					_this2.db.where("cf_id", cf_id);

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
	}]);

	return CafeModel;
}(_model.Model);