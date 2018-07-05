"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StaffController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _staff = require("../models/staff");

var _store = require("../models/store");

var _user = require("../models/user");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaffController = exports.StaffController = function (_Controller) {
    _inherits(StaffController, _Controller);

    function StaffController() {
        _classCallCheck(this, StaffController);

        return _possibleConstructorReturn(this, (StaffController.__proto__ || Object.getPrototypeOf(StaffController)).call(this));
    }

    /*
    ** Get Staff List
    ** GET :: /store/staff/list
    */


    _createClass(StaffController, [{
        key: "getStaffList",
        value: function getStaffList(param) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                staffModel.listStaff(param.id, param.active).then(function (staff) {
                    var result = {
                        row: staff[0][0].count,
                        staff: []
                    };

                    for (var i = 0; i < staff[1].length; i++) {
                        result.staff.push(_this2.build.user(staff[1][i]));
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Get staff detail
        ** GET :: /store/staff/detail
        */

    }, {
        key: "getStaffDetail",
        value: function getStaffDetail(param) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                staffModel.getStaffById(param.id).then(function (staff) {
                    var result = _this3.build.user(staff);

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Create new staff
        ** POST :: /store/staff/create
        */

    }, {
        key: "createNewStaff",
        value: function createNewStaff(param) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();
                var storeModel = new _store.StoreModel();
                var userModel = new _user.UserModel();

                var paramStaff = {
                    u_name: param.name,
                    u_username: param.username.toLowerCase(),
                    u_password: _this4.encrypt(param.password),
                    u_email: param.email,
                    ul_id: param.level
                };

                staffModel.createStaff(paramStaff).then(function (staff) {
                    var staffStore = {
                        u_id: staff.u_id,
                        store_id: param.store
                    };

                    storeModel.createOwnerStore(staffStore).then(function () {
                        return resolve(true);
                    }).catch(function (err) {
                        return reject(err);
                    });
                }).catch(function (err) {
                    if (err.code == 23505) {
                        return reject(12);
                    }
                    return reject(err);
                });
            });
        }

        /*
        ** Update staff
        ** PUT :: /store/staff/update
        */

    }, {
        key: "updateStaff",
        value: function updateStaff(param) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                var paramStaff = {
                    u_name: param.name,
                    u_username: param.username.toLowerCase(),
                    u_email: param.email,
                    ul_id: param.level,
                    updated_at: _this5.moment(new Date()).format()
                };
                if (param.password) {
                    paramStaff.u_password = _this5.encrypt(param.password);
                }
                staffModel.updateStaff(paramStaff, param.id).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Delete staff
        ** PUT :: /store/staff/delete
        */

    }, {
        key: "deleteStaff",
        value: function deleteStaff(param) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                var paramStaff = {
                    deleted_at: _this6.moment(new Date()).format()
                };

                staffModel.updateStaff(paramStaff, param.id).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Change staff status
        ** PUT :: /store/staff/status
        */

    }, {
        key: "changeStaffStatus",
        value: function changeStaffStatus(param) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                staffModel.findStaff(param.id).then(function (staff) {
                    var paramStaff = {
                        deleted_at: staff.deleted_at ? null : _this7.moment(new Date()).format()
                    };

                    staffModel.updateStaff(paramStaff, param.id).then(function () {
                        return resolve(true);
                    }).catch(function (err) {
                        return reject(err);
                    });
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Add Job Position
        ** POST :: /store/staff/job
        */

    }, {
        key: "addJob",
        value: function addJob(param) {
            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                var requiredData = {
                    u_id: param.staff,
                    store_id: param.store
                };

                staffModel.addJob(requiredData).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Change Job Position
        ** PUT :: /store/staff/job/update
        */

    }, {
        key: "changeJob",
        value: function changeJob(param) {
            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                var requiredData = {
                    u_id: param.staff,
                    store_id: param.store
                };

                staffModel.changeJob(requiredData, param.id).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Delete Job Position
        ** DELETE :: /store/staff/job/delete
        */

    }, {
        key: "deleteJob",
        value: function deleteJob(param) {
            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                staffModel.deleteJob(param.id).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Get report staff by transaction
        ** GET :: /store/staff/report
        */

    }, {
        key: "getReportStaffByTransaction",
        value: function getReportStaffByTransaction(param) {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();
                var userModel = new _user.UserModel();

                staffModel.getReportStaffByTransaction(param.staff, param.store, param.start_date, param.end_date).then(function (staff) {
                    var result = {
                        count: staff[0][0].count,
                        data: []
                    };

                    if (staff[1].length > 0) {
                        var _loop = function _loop(i) {
                            staffModel.getDetailTransactionItem(staff[1][i].ts_id).then(function (item) {
                                userModel.getUserById(staff[1][i].created_by).then(function (user) {
                                    var u = _this8.build.staffStoreReport(staff[1][i]);
                                    u.user = _this8.build.user(user);
                                    u.item = _this8.build.itemMenu(item);
                                    result.data.push(u);

                                    if (result.data.length >= staff[1].length) {
                                        if (param.print) {
                                            result = {
                                                title: "Laporan Staff",
                                                sub_title: _this8.moment(param.start_date).format("DD MMM YYYY") + " sampai " + _this8.moment(param.end_date).format("DD MMM YYYY"),
                                                table: {
                                                    header: {
                                                        "1": [{
                                                            name: "Tanggal"
                                                        }, {
                                                            name: "Nama Staff"
                                                        }, {
                                                            name: "Nama Member"
                                                        }, {
                                                            name: "Total"
                                                        }]
                                                    },
                                                    data: []
                                                }
                                            };

                                            for (var _i = 0; _i < staff[1].length; _i++) {
                                                result.table.data.push([_this8.moment(staff[1][_i].ts_date).format("DD MMM YYYY hh:mm:ss"), user.u_name, staff[1][_i].m_name, _this8.parseCurrency(staff[1][_i].ts_total, true)]);
                                            }

                                            return resolve(result);
                                        }

                                        if (param.convert) {
                                            var resultConvert = [];

                                            for (var _i2 = 0; _i2 < staff[1].length; _i2++) {
                                                var paramConvert = {
                                                    "Tanggal": _this8.moment(staff[1][_i2].ts_date).format("DD MMM YYYY hh:mm:ss"),
                                                    "Nama Staff": user.u_name,
                                                    "Nama Member": staff[1][_i2].m_name,
                                                    "Total": _this8.parseCurrency(staff[1][_i2].ts_total, true)
                                                };

                                                resultConvert.push(paramConvert);
                                            }

                                            if (resultConvert.length >= staff[1].length) {
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
                            }).catch(function (err) {
                                return reject(err);
                            });
                        };

                        for (var i = 0; i < staff[1].length; i++) {
                            _loop(i);
                        }
                    } else {
                        return resolve(result);
                    }
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Get report staff by transaction by item
        ** GET :: /store/staff/report/detail
        */

    }, {
        key: "getReportStaffByTransactionDetail",
        value: function getReportStaffByTransactionDetail(param) {
            var _this9 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();
                var userModel = new _user.UserModel();

                staffModel.getReportStaffByTransactionItem(param.staff, param.store, param.start_date, param.end_date, param.id).then(function (staff) {
                    var result = {
                        count: staff[0][0].count,
                        data: []
                    };

                    if (staff[1].length > 0) {
                        var _loop2 = function _loop2(i) {
                            staffModel.getDetailTransactionItem(staff[1][i].ts_id).then(function (item) {
                                userModel.getUserById(staff[1][i].created_by).then(function (user) {
                                    var u = _this9.build.staffStoreReport(staff[1][i]);
                                    u.user = _this9.build.user(user);
                                    u.item = _this9.build.itemMenu(item);
                                    result.data.push(u);

                                    if (result.data.length >= staff[1].length) {
                                        if (param.print) {
                                            result = {
                                                title: "Laporan Staff Detail",
                                                sub_title: _this9.moment(param.start_date).format("DD MMM YYYY") + " sampai " + _this9.moment(param.end_date).format("DD MMM YYYY"),
                                                table: {
                                                    header: {
                                                        "1": [{
                                                            name: "Tanggal"
                                                        }, {
                                                            name: "Nama Staff"
                                                        }, {
                                                            name: "Nama Member"
                                                        }, {
                                                            name: "Nama Item"
                                                        }, {
                                                            name: "Jumlah Item"
                                                        }, {
                                                            name: "Harga Item"
                                                        }]
                                                    },
                                                    data: []
                                                }
                                            };

                                            for (var _i3 = 0; _i3 < staff[1].length; _i3++) {
                                                result.table.data.push([_this9.moment(staff[1][_i3].ts_date).format("DD MMM YYYY hh:mm:ss"), user.u_name, staff[1][_i3].m_name, staff[1][_i3].ti_item, staff[1][_i3].ti_quantity, _this9.parseCurrency(staff[1][_i3].ti_price, true)]);
                                            }

                                            return resolve(result);
                                        }

                                        if (param.convert) {
                                            var resultConvert = [];

                                            for (var _i4 = 0; _i4 < staff[1].length; _i4++) {
                                                var paramConvert = {
                                                    "Tanggal": _this9.moment(staff[1][_i4].ts_date).format("DD MMM YYYY hh:mm:ss"),
                                                    "Nama Staff": user.u_name,
                                                    "Nama Member": staff[1][_i4].m_name,
                                                    "Nama Item": staff[1][_i4].ti_item,
                                                    "Jumlah Item": staff[1][_i4].ti_quantity,
                                                    "Harga Item": _this9.parseCurrency(staff[1][_i4].ti_price, true)
                                                };

                                                resultConvert.push(paramConvert);
                                            }

                                            if (resultConvert.length >= staff[1].length) {
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
                            }).catch(function (err) {
                                return reject(err);
                            });
                        };

                        for (var i = 0; i < staff[1].length; i++) {
                            _loop2(i);
                        }
                    } else {
                        return resolve(result);
                    }
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return StaffController;
}(_controller.Controller);