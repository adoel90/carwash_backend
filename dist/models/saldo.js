"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaldoModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaldoModel = exports.SaldoModel = function (_Model) {
  _inherits(SaldoModel, _Model);

  function SaldoModel() {
    _classCallCheck(this, SaldoModel);

    return _possibleConstructorReturn(this, (SaldoModel.__proto__ || Object.getPrototypeOf(SaldoModel)).apply(this, arguments));
  }

  _createClass(SaldoModel, [{
    key: "getAll",
    value: function getAll(limit, offset, card) {
      this.db.select("saldo", "saldo.saldo, saldo.bonus, card_type.ct_id, card_type.ct_name, card_type.ct_refund, card_type.ct_charge");
      this.db.join("card_type", "card_type.ct_id = saldo.ct_id", "LEFT");
      if (card) {
        this.db.where("saldo.ct_id", card);
      }
      this.db.order("saldo.created_at", true);
      // this.db.limit(limit, offset);

      return this.db.execute();
    }
  }, {
    key: "getOne",
    value: function getOne(type) {
      this.db.select("saldo", "saldo.saldo, saldo.bonus, card_type.ct_id, card_type.ct_name, card_type.ct_refund, card_type.ct_charge");
      this.db.join("card_type", "card_type.ct_id = saldo.ct_id", "LEFT");
      this.db.where("card_type.ct_id", type);

      return this.db.execute();
    }
  }, {
    key: "insert",
    value: function insert(data) {
      this.db.init();
      this.db.insert('saldo', data);

      return this.db.execute();
    }
  }, {
    key: "update",
    value: function update(id, data) {
      this.db.init();
      this.db.update('saldo', data);
      this.db.where('id', id);

      return this.db.execute();
    }
  }, {
    key: "destroy",
    value: function destroy(id) {
      this.db.init();
      this.db.delete('saldo');
      this.db.where('id', id);

      return this.db.execute();
    }
  }, {
    key: "getBalanceId",
    value: function getBalanceId(id) {
      this.db.init();
      this.db.select("saldo");
      this.db.where("id", id);

      return this.db.execute(true);
    }
  }]);

  return SaldoModel;
}(_model.Model);