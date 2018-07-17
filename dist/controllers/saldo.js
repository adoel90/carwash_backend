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
    value: function getAll(param) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var model = new _saldo.SaldoModel();

        model.getAll(param.limit, param.offset, param.card).then(function (data) {
          var result = [];

          for (var i = 0; i < data.length; i++) {
            var _param = _this2.build.balance(data[i]);

            result.push(_param);
          }

          return resolve(result);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "getOne",
    value: function getOne(type) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var model = new _saldo.SaldoModel();

        model.getOne(type).then(function (data) {
          var result = [];

          for (var i = 0; i < data.length; i++) {
            var param = _this3.build.balance(data[i]);

            result.push(param);
          }

          return resolve(result);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "createNewBalance",
    value: function createNewBalance(param) {
      return new Promise(function (resolve, reject) {
        var saldoModel = new _saldo.SaldoModel();

        var dataBalance = {
          ct_id: param.card,
          bonus: param.bonus,
          saldo: param.saldo
        };

        saldoModel.insert(dataBalance).then(function () {
          return resolve(true);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "updateBalance",
    value: function updateBalance(param) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var saldoModel = new _saldo.SaldoModel();

        var dataBalance = {
          ct_id: param.card,
          bonus: param.bonus,
          saldo: param.saldo,
          updated_at: _this4.moment(new Date()).format()
        };

        saldoModel.update(param.id, dataBalance).then(function () {
          return resolve(true);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "deleteBalance",
    value: function deleteBalance(param) {
      return new Promise(function (resolve, reject) {
        var saldoModel = new _saldo.SaldoModel();

        saldoModel.destroy(param.id).then(function () {
          return resolve(true);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "changeStatusBalance",
    value: function changeStatusBalance(param) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        var saldoModel = new _saldo.SaldoModel();

        saldoModel.getBalanceId(param.id).then(function (balance) {
          var balanceParam = {
            deleted_at: balance.deleted_at ? null : _this5.moment(new Date()).format()
          };

          saldoModel.update(param.id, balanceParam).then(function () {
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

  return SaldoController;
}(_controller.Controller);