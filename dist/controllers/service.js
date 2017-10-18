"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ServiceController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _service = require("../models/service");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServiceController = exports.ServiceController = function (_Controller) {
	_inherits(ServiceController, _Controller);

	function ServiceController() {
		_classCallCheck(this, ServiceController);

		return _possibleConstructorReturn(this, (ServiceController.__proto__ || Object.getPrototypeOf(ServiceController)).call(this));
	}

	/*
 ** Get service type list
 ** GET :: /service/type/list
 */


	_createClass(ServiceController, [{
		key: "serviceTypeList",
		value: function serviceTypeList(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				serviceModel.getServiceTypeList(param.limit, param.offset).then(function (type) {
					var result = {
						row: type[0][0].count,
						data: []
					};

					for (var i = 0; i < type[1].length; i++) {
						result.data.push(_this2.build.serviceType(type[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new service type
  ** POST :: /service/type/create
  */

	}, {
		key: "createServiceType",
		value: function createServiceType(param) {
			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var serviceParam = {
					srvt_name: param.name
				};
				serviceModel.insertServiceType(serviceParam).then(function (type) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update service type data
  ** PUT :: /service/type/update
  */

	}, {
		key: "updateServiceType",
		value: function updateServiceType(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var serviceParam = {
					srvt_name: param.name,
					update_at: _this3.moment(new Date()).format()
				};
				serviceModel.updateServiceType(param.id, serviceParam).then(function (type) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete service type data
  ** PUT :: /service/type/delete
  */

	}, {
		key: "deleteServiceType",
		value: function deleteServiceType(param) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var serviceParam = {
					deleted_at: _this4.moment(new Date()).format()
				};
				serviceModel.updateServiceType(param.id, serviceParam).then(function (type) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}
	}]);

	return ServiceController;
}(_controller.Controller);