"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CafeController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _cafe = require("../models/cafe");

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
						data: []
					};

					for (var i = 0; i < cafe[1].length; i++) {
						result.data.push(_this3.build.cafeType(cafe[1][i]));
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
	}]);

	return CafeController;
}(_controller.Controller);