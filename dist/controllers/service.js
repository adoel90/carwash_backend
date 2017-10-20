"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ServiceController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _service = require("../models/service");

var _member = require("../models/member");

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
 ** Get service type
 ** GET :: /service/type
 */


	_createClass(ServiceController, [{
		key: "serviceType",
		value: function serviceType(param) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				serviceModel.getServiceType().then(function (type) {
					var result = [];
					for (var i = 0; i < type.length; i++) {
						result.push(_this2.build.serviceType(type[i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get service type list
  ** GET :: /service/type/list
  */

	}, {
		key: "serviceTypeList",
		value: function serviceTypeList(param) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				serviceModel.getServiceTypeList(param.limit, param.offset).then(function (type) {
					var result = {
						row: type[0][0].count,
						data: []
					};

					for (var i = 0; i < type[1].length; i++) {
						result.data.push(_this3.build.serviceType(type[1][i]));
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
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var serviceParam = {
					srvt_name: param.name,
					update_at: _this4.moment(new Date()).format()
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
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var serviceParam = {
					deleted_at: _this5.moment(new Date()).format()
				};
				serviceModel.updateServiceType(param.id, serviceParam).then(function (type) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get service data
  ** GET :: /service
  */

	}, {
		key: "service",
		value: function service(param) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				serviceModel.getService(param.type).then(function (service) {
					var result = [];
					for (var i = 0; i < service.length; i++) {
						result.push(_this6.build.service(service[i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Get list of service data
  ** GET :: /service/list
  */

	}, {
		key: "serviceList",
		value: function serviceList(param) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				serviceModel.getServiceList(param.type, param.limit, param.offset).then(function (service) {
					var result = {
						row: service[0][0].count,
						data: []
					};

					for (var i = 0; i < service[1].length; i++) {
						result.data.push(_this7.build.service(service[1][i]));
					}

					return resolve(result);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create new service
  ** GET :: /service/create
  */

	}, {
		key: "createService",
		value: function createService(param) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var image = _this8.rewriteImage(param.img);
				var serviceParam = {
					srvt_id: param.type,
					srv_name: param.name,
					srv_price: param.price,
					srv_desc: param.desc,
					srv_img: image
				};
				serviceModel.insertService(serviceParam).then(function (service) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Update service data
  ** PUT :: /service/update
  */

	}, {
		key: "updateService",
		value: function updateService(param) {
			var _this9 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var serviceParam = {
					srv_name: param.name,
					srv_price: param.price,
					srv_desc: param.desc,
					updated_at: _this9.moment(new Date()).format()
				};
				serviceModel.updateService(param.id, serviceParam).then(function (service) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Delete service data
  ** PUT :: /service/delete
  */

	}, {
		key: "deleteService",
		value: function deleteService(param) {
			var _this10 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();

				var serviceParam = {
					deleted_at: _this10.moment(new Date()).format()
				};
				serviceModel.updateService(param.id, serviceParam).then(function (service) {
					return resolve(true);
				}).catch(function (err) {
					return reject(err);
				});
			});
		}

		/*
  ** Create service transaction
  ** POST ::: /service/transaction/create
  */

	}, {
		key: "createServiceTransaction",
		value: function createServiceTransaction(param) {
			var _this11 = this;

			return new Promise(function (resolve, reject) {
				var serviceModel = new _service.ServiceModel();
				var memberModel = new _member.MemberModel();

				memberModel.getMemberById(param.member).then(function (member) {
					serviceModel.getServiceById(param.service).then(function (service) {
						if (member.m_balance < service.srv_price) {
							return reject(31);
						}

						var transParam = {
							m_id: param.member,
							srv_id: service.srv_id,
							tsrv_date: _this11.moment(new Date()).format(),
							tsrv_price: service.srv_price
						};
						serviceModel.insertServiceTransaction(transParam).then(function (transaction) {
							memberModel.decreaseBalance(transParam.m_id, transParam.tsrv_price).then(function (balance) {
								var result = _this11.build.member(member);
								result.balance -= service.srv_price;
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
			});
		}
	}]);

	return ServiceController;
}(_controller.Controller);