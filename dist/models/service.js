"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ServiceModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServiceModel = exports.ServiceModel = function (_Model) {
	_inherits(ServiceModel, _Model);

	function ServiceModel() {
		_classCallCheck(this, ServiceModel);

		return _possibleConstructorReturn(this, (ServiceModel.__proto__ || Object.getPrototypeOf(ServiceModel)).call(this));
	}

	/*** Get service type ***/


	_createClass(ServiceModel, [{
		key: "getServiceType",
		value: function getServiceType() {
			this.db.select("service_type");
			// this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get list of service type ***/

	}, {
		key: "getServiceTypeList",
		value: function getServiceTypeList(limit, offset) {
			this.db.select("service_type", "count(*)");
			// this.db.whereIsNull("deleted_at");
			this.db.push();

			this.db.select("service_type");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}
	}, {
		key: "getServiceQueue",
		value: function getServiceQueue(srvt_id) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2.db.init();
				_this2.db.select("service_type");
				_this2.db.limit(1, 0);
				_this2.db.execute(true).then(function (service) {
					service.srvt_queue = service.srvt_queue ? service.srvt_queue : 0;
					var q = parseInt(service.srvt_queue) + 1;
					var u = {
						srvt_queue: q
					};
					_this2.db.init();
					_this2.db.update("service_type", u);

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

		/*** Get service transaction report data ***/

	}, {
		key: "getServiceTransactionReport",
		value: function getServiceTransactionReport(start, end, service) {
			this.db.init();
			this.db.select("transaction_service", "count(*)");
			this.db.join("member", "transaction_service.m_id = member.m_id");
			this.db.join("service", "service.srv_id = transaction_service.tsrv_id");
			this.db.join("service_type", "service_type.srvt_id = service.srvt_id");
			this.db.whereBetween("date(tsrv_date)", start, end);
			if (service) {
				this.db.where("service.srvt_id", service);
			}
			this.db.push();

			this.db.select("transaction_service");
			this.db.order("tsrv_date");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Insert service type data ***/

	}, {
		key: "insertServiceType",
		value: function insertServiceType(param) {
			this.db.insert("service_type", param, "srvt_id");

			return this.db.execute();
		}

		/*** Update service type data ***/

	}, {
		key: "updateServiceType",
		value: function updateServiceType(srvt_id, param) {
			this.db.update("service_type", param);
			this.db.where("srvt_id", srvt_id);

			return this.db.execute();
		}

		/*** Get service data ***/

	}, {
		key: "getService",
		value: function getService(srvt_id) {
			this.db.select("service");
			this.db.where("srvt_id", srvt_id);
			// this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get service transaction data ***/

	}, {
		key: "getServiceTransaction",
		value: function getServiceTransaction(m_id) {
			this.db.init();
			this.db.select("transaction_service");
			if (m_id) {
				this.db.where("m_id", m_id);
			}
			return this.db.execute();
		}

		/*** Get service data list ***/

	}, {
		key: "getServiceList",
		value: function getServiceList(srvt_id, limit, offset) {
			this.db.select("service", "count(*)");
			this.db.where("srvt_id", srvt_id);
			// this.db.whereIsNull("deleted_at");
			this.db.push();

			this.db.select("service");
			this.db.limit(limit, offset);
			this.db.push();

			return this.db.executeMany();
		}

		/*** Get service data by srv_id ***/

	}, {
		key: "getServiceById",
		value: function getServiceById(srv_id) {
			this.db.init();
			this.db.select("service");
			this.db.where("srv_id", srv_id);

			return this.db.execute(true);
		}

		/*** Get service type by srvt_id ***/

	}, {
		key: "getServiceTypeById",
		value: function getServiceTypeById(srvt_id) {
			this.db.init();
			this.db.select("service_type");
			this.db.where("srvt_id", srvt_id);

			return this.db.execute(true);
		}

		/*** Insert service data ***/

	}, {
		key: "insertService",
		value: function insertService(param) {
			this.db.insert("service", param);

			return this.db.execute();
		}

		/*** Update service data ***/

	}, {
		key: "updateService",
		value: function updateService(srv_id, param) {
			this.db.update("service", param);
			this.db.where("srv_id", srv_id);

			return this.db.execute();
		}

		/*** Insert service transaction data ***/

	}, {
		key: "insertServiceTransaction",
		value: function insertServiceTransaction(param) {
			this.db.insert("transaction_service", param, "tsrv_id");

			return this.db.execute(true);
		}

		/*** Get summary transaction services ***/

	}, {
		key: "getServiceTransactionSummary",
		value: function getServiceTransactionSummary(start, end) {
			this.db.init();
			this.db.select("transaction_service", "service_type.srvt_id, sum(tsrv_price)");
			this.db.join("service", "service.srv_id = transaction_service.srv_id");
			this.db.join("service_type", "service_type.srvt_id = service.srvt_id");
			this.db.whereBetween("date(tsrv_date)", start, end);
			this.db.group("service_type.srvt_id");

			return this.db.execute();
		}

		/*** Get service transaction data ***/

	}, {
		key: "getServiceTransactionById",
		value: function getServiceTransactionById(id) {
			this.db.init();
			this.db.select("transaction_service");
			this.db.join("service", "service.srv_id = transaction_service.srv_id");
			this.db.join("service_type", "service_type.srvt_id = service.srvt_id");
			this.db.join("member", "member.m_id = transaction_service.m_id");
			this.db.where("tsrv_id", id);

			return this.db.execute(true);
		}
	}]);

	return ServiceModel;
}(_model.Model);