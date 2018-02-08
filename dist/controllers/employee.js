"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmployeeController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _employee = require("../models/employee");

var _url = require("url");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmployeeController = exports.EmployeeController = function (_Controller) {
    _inherits(EmployeeController, _Controller);

    function EmployeeController() {
        _classCallCheck(this, EmployeeController);

        return _possibleConstructorReturn(this, (EmployeeController.__proto__ || Object.getPrototypeOf(EmployeeController)).call(this));
    }

    /*
    ** Get all employee
    ** GET :: /cafe/employee/list
    */


    _createClass(EmployeeController, [{
        key: "employeeList",
        value: function employeeList(param) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var employeeModel = new _employee.EmployeeModel();

                employeeModel.listEmployee(param).then(function (employee) {
                    var result = {
                        row: employee[0][0].count,
                        employee: []
                    };

                    for (var i = 0; i < employee[1].length; i++) {
                        result.employee.push(_this2.build.employee(employee[1][i]));
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Get detail employee
        ** GET :: /cafe/employee/detail
        */

    }, {
        key: "employeeDetail",
        value: function employeeDetail(param) {
            return new Promise(function (resolve, reject) {
                var employeeModel = new _employee.EmployeeModel();

                employeeModel.getEmployeeById(param).then(function (employee) {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Create new employee
        ** POST :: /cafe/employee/create
        */

    }, {
        key: "createEmployee",
        value: function createEmployee(param) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var employeeModel = new _employee.EmployeeModel();

                var paramEmployee = {
                    emp_name: param.name,
                    emp_email: param.email,
                    emp_username: param.username,
                    emp_password: _this3.encrypt(param.password),
                    emp_access: param.access,
                    cf_id: param.cafe
                };

                employeeModel.createEmployee(paramEmployee).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Update employee
        ** PUT :: /cafe/employee/update
        */

    }, {
        key: "updateEmployee",
        value: function updateEmployee(param) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var employeeModel = new _employee.EmployeeModel();

                var paramEmployee = {
                    emp_name: param.name,
                    emp_email: param.email,
                    emp_username: param.username,
                    emp_password: _this4.encrypt(param.password),
                    emp_access: param.access,
                    cf_id: param.cafe
                };

                employeeModel.updateEmployee(paramEmployee, param.id).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Delete employee
        ** DELETE :: /cafe/employee/delete
        */

    }, {
        key: "deleteEmployee",
        value: function deleteEmployee(param) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var employeeModel = new _employee.EmployeeModel();

                var paramEmployee = {
                    cf_id: param.cafe,
                    deleted_at: _this5.moment(new Date()).format()
                };

                employeeModel.deleteEmployee(paramEmployee, param.id).then(function () {
                    return resolve(true);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return EmployeeController;
}(_controller.Controller);