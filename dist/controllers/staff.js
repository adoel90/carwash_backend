"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StaffController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _staff = require("../models/staff");

var _url = require("url");

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

                staffModel.listStaff(param.id).then(function (staff) {
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
            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                var paramStaff = {
                    u_name: param.name,
                    u_username: param.username,
                    u_password: param.password,
                    u_email: param.email,
                    ul_id: param.level,
                    store_id: param.store
                };

                staffModel.createStaff(paramStaff).then(function () {
                    return resolve(true);
                }).catch(function (err) {
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
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                var paramStaff = {
                    u_name: param.name,
                    u_username: param.username,
                    u_password: param.password,
                    u_email: param.email,
                    ul_id: param.level,
                    updated_at: _this4.moment(new Date()).format()
                };

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
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                var paramStaff = {
                    deleted_at: _this5.moment(new Date()).format()
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
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var staffModel = new _staff.StaffModel();

                staffModel.findStaff(param.id).then(function (staff) {
                    var paramStaff = {
                        deleted_at: staff.deleted_at ? null : _this6.moment(new Date()).format()
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
    }]);

    return StaffController;
}(_controller.Controller);