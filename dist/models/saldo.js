'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SaldoModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('./model');

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
    key: 'getAll',
    value: function getAll(limit) {
      this.db.select('saldo');
      this.db.order('created_at', true);
      this.db.limit(limit);

      return this.db.execute();
    }
  }, {
    key: 'getOne',
    value: function getOne(type) {
      this.db.select('saldo', 'id, saldo, created_at');
      this.db.where('ct_id', type);

      return this.db.execute();
    }
  }, {
    key: 'insert',
    value: function insert(saldo) {
      this.db.init();
      var data = { saldo: saldo };

      this.db.insert('saldo', data);
      this.db.push(true);

      return this.db.executeMany();
    }
  }, {
    key: 'update',
    value: function update(id, saldo) {
      this.db.init();
      var data = { saldo: saldo };

      this.db.update('saldo', data);
      this.db.where('id', id);
      this.db.push(true);

      return this.db.executeMany();
    }
  }, {
    key: 'destroy',
    value: function destroy(id) {
      this.db.delete('saldo');
      this.db.where('id', id);

      return this.db.execute();
    }
  }]);

  return SaldoModel;
}(_model.Model);