"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AccessController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _access = require("../models/access");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccessController = exports.AccessController = function (_Controller) {
    _inherits(AccessController, _Controller);

    function AccessController() {
        _classCallCheck(this, AccessController);

        return _possibleConstructorReturn(this, (AccessController.__proto__ || Object.getPrototypeOf(AccessController)).call(this));
    }

    /*
    ** Get all access level
    ** GET :: /access
    */


    _createClass(AccessController, [{
        key: "getAllAccess",
        value: function getAllAccess(param) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var accessModel = new _access.AccessModel();

                accessModel.getAccessLevel().then(function (access) {
                    var result = [];
                    for (var i = 0; i < access.length; i++) {
                        result.push(_this2.build.accessLevel(access[i]));
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /*
        ** Get access level detail
        ** GET :: /access/detail
        */

    }, {
        key: "accessDetail",
        value: function accessDetail(param) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var accessModel = new _access.AccessModel();

                accessModel.getAccessById(param.id).then(function (access) {
                    var result = _this3.build.accessLevel(access);
                    result.module = [];
                    accessModel.getAccessModule(param.id).then(function (module) {
                        for (var i = 0; i < module.length; i++) {
                            result.module.push(_this3.build.module(module[i]));
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
        ** Create new access level
        ** POST :: /access/create
        */

    }, {
        key: "createAccess",
        value: function createAccess(param) {
            return new Promise(function (resolve, reject) {
                var accessModel = new _access.AccessModel();

                var accessParam = {
                    ul_name: param.name
                };
                accessModel.insertAccess(accessParam).then(function (access) {
                    accessModel.insertAccessModule(access.ul_id, param.module).then(function () {
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
        ** Update access level data
        ** PUT :: /access/update
        */

    }, {
        key: "updateAccess",
        value: function updateAccess(param) {
            return new Promise(function (resolve, reject) {
                var accessModel = new _access.AccessModel();

                var accessParam = {
                    ul_name: param.name
                };
                accessModel.updateAccess(param.id, accessParam).then(function () {
                    accessModel.deleteAccessModule(param.id).then(function () {
                        accessModel.insertAccessModule(param.id, param.module).then(function () {
                            return resolve(true);
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

        /*
        ** Change status access level
        ** PUT :: /access/status
        */

    }, {
        key: "statusAccess",
        value: function statusAccess(param) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var accessModel = new _access.AccessModel();

                accessModel.getAccessById(param.id).then(function (access) {
                    var accessParam = {
                        deleted_at: access.deleted_at ? null : _this4.moment(new Date()).format()
                    };
                    accessModel.updateAccess(param.id, accessParam).then(function () {
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
        ** Get all module
        ** GET :: /module
        */

    }, {
        key: "allModule",
        value: function allModule(param) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var accessModel = new _access.AccessModel();

                accessModel.getModule().then(function (module) {
                    var result = [];
                    for (var i = 0; i < module.length; i++) {
                        result.push(_this5.build.module(module[i]));
                    }

                    return resolve(result);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return AccessController;
}(_controller.Controller);