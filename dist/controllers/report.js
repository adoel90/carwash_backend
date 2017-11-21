"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReportController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _cafe = require("../models/cafe");

var _service = require("../models/service");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportController = exports.ReportController = function (_Controller) {
    _inherits(ReportController, _Controller);

    function ReportController() {
        _classCallCheck(this, ReportController);

        return _possibleConstructorReturn(this, (ReportController.__proto__ || Object.getPrototypeOf(ReportController)).call(this));
    }

    /* 
    ** Get report cafe transaction
    ** GET :: /report/cafe/transaction
    */


    _createClass(ReportController, [{
        key: "cafeTransactionReport",
        value: function cafeTransactionReport(param) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var cafeModel = new _cafe.CafeModel();

                cafeModel.getCafeTransactionReport(param.limit, param.offset, param.start_date, param.end_date, param.cafe).then(function (transaction) {
                    var result = {
                        row: transaction[0][0].count,
                        transaction: []
                    };

                    for (var i = 0; i < transaction[1].length; i++) {
                        var trans = _this2.build.transactionCafe(transaction[1][i]);
                        trans.menu = _this2.build.menu(transaction[1][i]);
                        delete trans.menu.price;

                        trans.quantity = transaction[1][i].tcm_quantity;
                        trans.price = transaction[1][i].tcm_price;
                        trans.cafe = _this2.build.cafeType(transaction[1][i]);
                        result.transaction.push(trans);
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /* 
        ** Get report service transaction
        ** GET :: /report/service/transaction
        */

    }, {
        key: "serviceTransactionReport",
        value: function serviceTransactionReport(param) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var serviceModel = new _service.ServiceModel();

                serviceModel.getServiceTransactionReport(param.limit, param.offset, param.start_date, param.end_date, param.service).then(function (transaction) {
                    var result = {
                        row: transaction[0][0].count,
                        transaction: []
                    };

                    for (var i = 0; i < transaction[1].length; i++) {
                        var trans = _this3.build.transactionService(transaction[1][i]);
                        trans.service = _this3.build.service(transaction[1][i]);
                        trans.type = _this3.build.serviceType(transaction[1][i]);
                        result.transaction.push(trans);
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return _this3.error(res, err);
                });
            });
        }
    }]);

    return ReportController;
}(_controller.Controller);