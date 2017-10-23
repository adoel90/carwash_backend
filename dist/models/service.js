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
			this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get list of service type ***/

	}, {
		key: "getServiceTypeList",
		value: function getServiceTypeList(limit, offset) {
			this.db.select("service_type", "count(*)");
			this.db.whereIsNull("deleted_at");
			this.db.push();

			this.db.select("service_type");
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
			this.db.whereIsNull("deleted_at");

			return this.db.execute();
		}

		/*** Get service data list ***/

	}, {
		key: "getServiceList",
		value: function getServiceList(srvt_id, limit, offset) {
			this.db.select("service", "count(*)");
			this.db.where("srvt_id", srvt_id);
			this.db.whereIsNull("deleted_at");
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
			this.db.select("service");
			this.db.where("srv_id", srv_id);

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
			this.db.insert("transaction_service", param);

			return this.db.execute();
		}
	}]);

	return ServiceModel;
}(_model.Model);