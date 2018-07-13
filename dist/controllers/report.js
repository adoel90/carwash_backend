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

var _user = require("../models/user");

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
        value: function getReportMember(param) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var reportModel = new _report.ReportModel();

                reportModel.getReportMember(param.start_date, param.end_date).then(function (report) {
                    var result = {
                        count: report[0][0].count,
                        report: []
                    };

                    var resultPrint = void 0;
                    var resultConvert = void 0;

                    var _loop = function _loop(i) {
                        reportModel.getLastTransactionMember(report[1][i].m_id).then(function (transaction) {
                            var reportData = _this4.build.reportMember(report[1][i]);
                            reportData.last_transaction = transaction[0] ? _this4.moment(transaction[0].tp_date).format("DD MMM YYYY hh:mm:ss") : null;
                            result.report.push(reportData);

                            if (param.print) {
                                resultPrint = {
                                    title: "Daftar Member List",
                                    table: {
                                        header: {
                                            "1": [{
                                                name: "No. Kartu"
                                            }, {
                                                name: "Jenis Kartu"
                                            }, {
                                                name: "Nama Member"
                                            }, {
                                                name: "Tanggal Daftar"
                                            }, {
                                                name: "Saldo"
                                            }, {
                                                name: "Tanggal Transaksi"
                                            }]
                                        },
                                        data: []
                                    }
                                };

                                for (var _i5 = 0; _i5 < report[1].length; _i5++) {
                                    for (var j = 0; j < result.report.length; j++) {
                                        if (report[1][_i5].m_id == result.report[j].id) {
                                            // if(report[1][i].c_id) {
                                            resultPrint.table.data.push([report[1][_i5].c_id ? report[1][_i5].c_id : '-', report[1][_i5].ct_name ? report[1][_i5].ct_name : '-', report[1][_i5].m_name ? report[1][_i5].m_name : 'Non-Member', _this4.moment(report[1][_i5].created_at).format("DD MMM YYYY"), _this4.parseCurrency(report[1][_i5].m_balance, true), result.report[j].last_transaction ? result.report[j].last_transaction : '-']);
                                            // }
                                        }
                                    }
                                }

                                if (resultPrint.table.data.length >= report[1].length) {
                                    return resolve(resultPrint);
                                }
                            }

                            if (param.convert) {
                                resultConvert = [];

                                for (var _i6 = 0; _i6 < report[1].length; _i6++) {
                                    for (var _j = 0; _j < result.report.length; _j++) {
                                        if (report[1][_i6].m_id == result.report[_j].id) {
                                            var paramConvert = {
                                                "Nomor Kartu": report[1][_i6].c_id,
                                                "Jenis Kartu": report[1][_i6].ct_name ? report[1][_i6].ct_name : 'Non-Member',
                                                "Nama Member": report[1][_i6].m_name ? report[1][_i6].m_name : 'Non-Member',
                                                "Email Member": report[1][_i6].m_email ? report[1][_i6].m_email : '-',
                                                "Telepon Member": report[1][_i6].m_phone ? report[1][_i6].m_phone : '-',
                                                "Tanggal Daftar": _this4.moment(report[1][_i6].created_at).format("DD MMM YYYY"),
                                                "Saldo": parseInt(report[1][_i6].m_balance)

                                                // if(report[1][i].c_id) {
                                            };resultConvert.push(paramConvert);
                                            // }
                                        }
                                    }
                                }

                                if (resultConvert.length >= report[1].length) {
                                    return resolve(resultConvert);
                                }
                            }

                            if (!param.print && !param.convert) {
                                if (result.report.length >= report[1].length) {
                                    return resolve(result);
                                }
                            }
                        }).catch(function (err) {
                            return reject(err);
                        });
                    };

                    for (var i = 0; i < report[1].length; i++) {
                        _loop(i);
                    }
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
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var reportModel = new _report.ReportModel();
                var userModel = new _user.UserModel();

                reportModel.getReportOwner(param.start_date, param.end_date).then(function (owner) {
                    var result = [];

                    var _loop2 = function _loop2(i) {

                        reportModel.getTotalReportOwner(param.start_date, param.end_date, owner[1][i].store_id).then(function (total) {
                            var reportOwner = _this5.build.reportOwner(owner[1][i]);

                            var totalTransaction = 0;

                            for (var j = 0; j < total.length; j++) {
                                totalTransaction += parseInt(total[j].sum);
                            }

                            reportOwner.total = totalTransaction;
                            result.push(reportOwner);

                            if (param.convert) {
                                var resultConvert = [];

                                for (var _i7 = 0; _i7 < owner[1].length; _i7++) {
                                    var paramConvert = {
                                        "Nama Owner": owner[1][_i7].u_name,
                                        "Nama Toko": owner[1][_i7].store_name
                                        // "Total Laba Kotor" : this.parseCurrency(totalTransaction, true)
                                    };

                                    resultConvert.push(paramConvert);
                                }

                                if (resultConvert.length >= owner[1].length) {
                                    return resolve(resultConvert);
                                }
                            }

                            if (result.length >= owner[1].length) {
                                return resolve(result);
                            }
                        }).catch(function (err) {
                            return reject(err);
                        });
                    };

                    for (var i = 0; i < owner[1].length; i++) {
                        _loop2(i);
                    }
                }).catch(function (err) {
                    return reject(err);
                });

                //     userModel.getUserByLevelAccess(4).then((user) => {
                //         let result = [];

                //         for(let i=0; i<user.length; i++) {
                //             reportModel.getOwnerByUserId(user[i].u_id).then((owner) => {
                //                 console.log(owner)
                //                 return resolve(owner);
                //                 // if(owner[0]) {
                //                 //     reportModel.calculateTotalPriceByStore(param.start_date, param.end_date, owner[0].store_id).then((price) => {
                //                 //             let u = this.build.user(user[i]);
                //                 //             u.price = price[0] ? parseInt(price[0].sum) : null;
                //                 //             u.store = owner;

                //                 //             result.push(u);

                //                 //             if(result.length >= Object.keys(owner[0]).length+1) {
                //                 //                 return resolve(result);
                //                 //             }
                //                 //     }).catch((err) => {
                //                 //         return reject(err);
                //                 //     });
                //                 // }
                //             }).catch((err) => {
                //                 return reject(err);
                //             });
                //         }
                //     }).catch((err) => {
                //         return reject(err);
                //     });
            });
        }

        /*
        ** Get report user
        ** GET :: /report/user
        */

    }, {
        key: "getReportUser",
        value: function getReportUser(param) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var reportModel = new _report.ReportModel();
                var userModel = new _user.UserModel();

                reportModel.getReportUser(param.start_date, param.end_date, param.user).then(function (report) {
                    var result = {
                        count: report[0][0].count,
                        data: []
                    };

                    if (report[1].length > 0) {
                        var _loop3 = function _loop3(i) {
                            userModel.getUserById(report[1][i].created_by).then(function (user) {
                                var u = _this6.build.userReport(report[1][i]);
                                u.user = _this6.build.user(user);
                                result.data.push(u);

                                if (result.data.length >= report[1].length) {
                                    if (param.print) {
                                        result = {
                                            title: "Laporan Kasir",
                                            sub_title: _this6.moment(param.start_date).format("DD MMM YYYY") + " sampai " + _this6.moment(param.end_date).format("DD MMM YYYY"),
                                            table: {
                                                header: {
                                                    "1": [{
                                                        name: "Tanggal"
                                                    }, {
                                                        name: "Nama Kasir"
                                                    }, {
                                                        name: "Total"
                                                    }, {
                                                        name: "Deskripsi"
                                                    }]
                                                },
                                                data: []
                                            }
                                        };

                                        for (var _i8 = 0; _i8 < report[1].length; _i8++) {
                                            result.table.data.push([_this6.moment(report[1][_i8].log_date).format("DD MMM YYYY"), user.u_name, _this6.parseCurrency(report[1][_i8].log_value, true), report[1][_i8].log_description]);
                                        }

                                        return resolve(result);
                                    }

                                    if (param.convert) {
                                        var resultConvert = [];

                                        for (var _i9 = 0; _i9 < report[1].length; _i9++) {
                                            var paramConvert = {
                                                "Tanggal Transaksi": _this6.moment(report[1][_i9].log_date).format("DD MMM YYYY"),
                                                "Nama Kasir": user.u_name,
                                                "Total Transaksi": _this6.parseCurrency(report[1][_i9].log_value, true),
                                                "Deskripsi": report[1][_i9].log_description
                                            };

                                            resultConvert.push(paramConvert);
                                        }

                                        if (resultConvert.length >= report[1].length) {
                                            return resolve(resultConvert);
                                        }
                                    }

                                    if (!param.print && !param.convert) {
                                        return resolve(result);
                                    }
                                }
                            }).catch(function (err) {
                                return reject(err);
                            });
                        };

                        for (var i = 0; i < report[1].length; i++) {
                            _loop3(i);
                        }
                    } else {
                        return resolve(result);
                    }
                }).catch(function (err) {
                    return reject(err);
                });

                // reportModel.getReportOwner(param.start_date, param.end_date).then((owner) => {
                //     let result = {
                //         count: owner[0][0].count,
                //         data: []
                //     }

                //     for(let i=0; i<owner[1].length; i++) {
                //         result.data.push(owner[1][i]);
                //     }

                //     return resolve(result)
                // }).catch((err) => {
                //     return reject(err)
                // });
            });
        }

        /*
        ** Get report member 
        ** GET :: /store/report
        */

    }, {
        key: "getReportMemberGraph",
        value: function getReportMemberGraph(param) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                var reportModel = new _report.ReportModel();

                var result = _this7.buildRangeMember(param.type, param.start_date, param.end_date);
                var format = "DD MMM YYYY";
                if (param.type == "month") {
                    format = "MMM YYYY";
                } else if (param.type == "year") {
                    format = "YYYY";
                }

                reportModel.getGraphReportMember(param.type, param.start_date, param.end_date).then(function (reportMember) {
                    for (var i = 0; i < reportMember.length; i++) {
                        var date = _this7.moment(reportMember[i].date).format(format);
                        if (result[date]) {
                            result[date].saldo += parseFloat(reportMember[i].sum);
                        }
                    }

                    var data = [];
                    for (var _i10 in result) {
                        result[_i10].name = _i10;
                        data.push(result[_i10]);
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