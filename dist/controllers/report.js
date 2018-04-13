"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReportController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _cafe = require("../models/cafe");

var _service = require("../models/service");

var _report = require("../models/report");

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

                /* cafeModel.getCafeTransactionReport(param.start_date, param.end_date, param.cafe).then((transaction) => {
                    let result = {
                        row : transaction[0][0].count,
                        transaction : []
                    }
                     for(let i=0; i<transaction[1].length; i++){
                        let trans = this.build.transactionCafe(transaction[1][i]);
                        trans.menu = this.build.menu(transaction[1][i]);
                        delete trans.menu.price;
                         trans.quantity = transaction[1][i].tcm_quantity;
                        trans.price = transaction[1][i].tcm_price;
                        trans.cafe = this.build.cafeType(transaction[1][i]);
                        result.transaction.push(trans);
                    }
                     return resolve(result);
                }).catch((err) => {
                    return reject(err);
                }); */

                cafeModel.cafeTransactoinReport(param.start_date, param.end_date, param.cafe).then(function (transaction) {
                    var result = _this2.build.reportRangeDate(param.start_date, param.end_date, transaction);

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

                serviceModel.getServiceTransactionReport(param.start_date, param.end_date, param.service).then(function (transaction) {
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

        /*
        ** Get report summary cafe
        ** GET :: /report/summary/cafe
        */

    }, {
        key: "cafeSummaryReport",
        value: function cafeSummaryReport(param) {
            return new Promise(function (resolve, reject) {
                var cafeModel = new _cafe.CafeModel();

                cafeModel.getCafeType().then(function (cafe) {
                    var cf = {};
                    cf[0] = {
                        name: "Overall",
                        total: 0
                    };

                    for (var i = 0; i < cafe.length; i++) {
                        cf[cafe[i].cf_id] = {
                            name: cafe[i].cf_name,
                            total: 0
                        };
                    }
                    "";
                    cafeModel.getCafeTransactionSummary(param.start_date, param.end_date).then(function (transaction) {
                        var result = {};
                        for (var _i = 0; _i < transaction.length; _i++) {
                            cf[transaction[_i].cf_id].total = transaction[_i].sum;
                            cf[0].total += parseFloat(transaction[_i].sum);
                        }

                        for (var _i2 in cf) {
                            result[cf[_i2].name] = {
                                total: cf[_i2].total
                            };
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

        /*
        ** Get report summary services
        ** GET :: /report/summary/service
        */

    }, {
        key: "serviceSummaryReport",
        value: function serviceSummaryReport(param) {
            return new Promise(function (resolve, reject) {
                var serviceModel = new _service.ServiceModel();

                serviceModel.getServiceType().then(function (type) {
                    var srv = {};
                    srv[0] = {
                        name: "Overall",
                        total: 0
                    };
                    for (var i = 0; i < type.length; i++) {
                        srv[type[i].srvt_id] = {
                            name: type[i].srvt_name,
                            total: 0
                        };
                    }

                    serviceModel.getServiceTransactionSummary(param.start_date, param.end_date).then(function (transaction) {
                        var result = {};
                        for (var _i3 = 0; _i3 < transaction.length; _i3++) {
                            srv[transaction[_i3].srvt_id].total = transaction[_i3].sum;
                            srv[0].total += parseFloat(transaction[_i3].sum);
                        }

                        for (var _i4 in srv) {
                            result[srv[_i4].name] = {
                                total: srv[_i4].total
                            };
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

        /* 
        ** Get report member register
        ** GET :: /report/member/list
        */

    }, {
        key: "getReportMember",
        value: function getReportMember(params) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var reportModel = new _report.ReportModel();

                reportModel.getReportMember(params.start_date, params.end_date).then(function (report) {
                    var result = {
                        count: report[0][0].count,
                        report: []
                    };

                    for (var i = 0; i < report[1].length; i++) {
                        result.report.push(_this4.build.reportMember(report[1][i]));
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Get report owner
        ** GET :: /report/owner
        */

    }, {
        key: "getReportOwner",
        value: function getReportOwner(param) {
            return new Promise(function (resolve, reject) {
                var reportModel = new _report.ReportModel();

                reportModel.getReportOwner(param.start_date, param.end_date).then(function (owner) {
                    var result = {
                        count: owner[0][0].count,
                        data: []
                    };

                    for (var i = 0; i < owner[1].length; i++) {
                        result.data.push(owner[1][i]);
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Get report member 
        ** GET :: /store/report
        */

    }, {
        key: "getReportMemberGraph",
        value: function getReportMemberGraph(param) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var reportModel = new _report.ReportModel();

                var result = _this5.buildRangeMember(param.type, param.start_date, param.end_date);
                var format = "DD MMM YYYY";
                if (param.type == "month") {
                    format = "MMM YYYY";
                } else if (param.type == "year") {
                    format = "YYYY";
                }

                reportModel.getGraphReportMember(param.type, param.start_date, param.end_date).then(function (reportMember) {
                    for (var i = 0; i < reportMember.length; i++) {
                        var date = _this5.moment(reportMember[i].date).format(format);
                        if (result[date]) {
                            result[date].saldo += parseFloat(reportMember[i].sum);
                        }
                    }

                    var data = [];
                    for (var _i5 in result) {
                        result[_i5].name = _i5;
                        data.push(result[_i5]);
                    }

                    return resolve(data);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return ReportController;
}(_controller.Controller);