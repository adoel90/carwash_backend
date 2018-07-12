"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaldoController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require("./controller");

var _saldo = require("../models/saldo");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaldoController = exports.SaldoController = function (_Controller) {
  _inherits(SaldoController, _Controller);

  function SaldoController() {
    _classCallCheck(this, SaldoController);

    return _possibleConstructorReturn(this, (SaldoController.__proto__ || Object.getPrototypeOf(SaldoController)).apply(this, arguments));
  }

  _createClass(SaldoController, [{
    key: "getAll",
    value: function getAll(limit) {
      return new Promise(function (resolve, reject) {
        var model = new _saldo.SaldoModel();

        model.getAll(limit).then(function (data) {
          return resolve(data);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "insert",
    value: function insert(param) {
      return new Promise(function (resolve, reject) {
        var model = new _saldo.SaldoModel();

        if (Array.isArray(param) || param.length < 1) {
          for (var i = 0; i < param.length; i++) {
            model.insert(param[i]).then(function () {
              return resolve(true);
            }).catch(function (err) {
              return reject(err);
            });
          }
        } else {
          model.insert(param).then(function () {
            return resolve(true);
          }).catch(function (err) {
            return reject(err);
          });
        }
      });
    }
  }, {
    key: "update",
    value: function update(param) {
      return new Promise(function (resolve, reject) {
        var model = new _saldo.SaldoModel();

        if (Array.isArray(param.saldo) || param.saldo.length < 1) {
          for (var i = 0; i < param.saldo.length; i++) {
            model.update(param.id[i], param.saldo[i]).then(function () {
              return resolve(true);
            }).catch(function (err) {
              return reject(err);
            });
          }
        } else {
          model.update(param.id, param.saldo).then(function () {
            return resolve(true);
          }).catch(function (err) {
            return reject(err);
          });
        }
      });
    }
  }]);

  return SaldoController;
}(_controller.Controller);