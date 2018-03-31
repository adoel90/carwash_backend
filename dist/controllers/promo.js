'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.PromoController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controller = require('./controller');

var _promo = require('../models/promo');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PromoController = exports.PromoController = function (_Controller) {
      _inherits(PromoController, _Controller);

      function PromoController() {
            _classCallCheck(this, PromoController);

            return _possibleConstructorReturn(this, (PromoController.__proto__ || Object.getPrototypeOf(PromoController)).call(this));
      }

      /*
      ** Get list promo
      ** GET :: /store/promo/list
      */


      _createClass(PromoController, [{
            key: 'getPromoList',
            value: function getPromoList(param) {
                  var _this2 = this;

                  return new Promise(function (resolve, reject) {
                        var promoModel = new _promo.PromoModel();

                        promoModel.getPromoList(param.id, param.start_date, param.end_date).then(function (promo) {
                              var result = {
                                    row: promo[0][0].count,
                                    promo: []
                              };

                              for (var i = 0; i < promo[1].length; i++) {
                                    result.promo.push(_this2.build.promo(promo[1][i]));
                              }

                              return resolve(result);
                        }).catch(function (err) {
                              return reject(err);
                        });
                  });
            }

            /*
            ** Get promo detail
            ** GET :: /store/promo/detail
            */

      }, {
            key: 'getPromoDetail',
            value: function getPromoDetail(param) {
                  var _this3 = this;

                  return new Promise(function (resolve, reject) {
                        var promoModel = new _promo.PromoModel();

                        promoModel.getPromoDetail(param.id).then(function (promo) {
                              var result = _this3.build.promo(promo);

                              return resolve(result);
                        }).catch(function (err) {
                              return reject(err);
                        });
                  });
            }

            /*
            ** Create new promo
            ** POST :: /store/promo/create
            */

      }, {
            key: 'createNewPromo',
            value: function createNewPromo(param) {
                  var _this4 = this;

                  return new Promise(function (resolve, reject) {
                        var promoModel = new _promo.PromoModel();

                        var paramPromo = {
                              store_id: param.store,
                              p_price: param.price,
                              p_date: param.date ? param.date : _this4.moment(new Date()).format()
                        };

                        promoModel.createPromo(paramPromo).then(function () {
                              return resolve(true);
                        }).catch(function (err) {
                              return reject(err);
                        });
                  });
            }

            /*
            ** Update promo
            ** PUT :: /store/promo/update
            */

      }, {
            key: 'updatePromo',
            value: function updatePromo(param) {
                  return new Promise(function (resolve, reject) {
                        var promoModel = new _promo.PromoModel();

                        var paramPromo = {
                              p_price: param.price
                        };

                        promoModel.updatePromo(paramPromo, param.id).then(function () {
                              return resolve(true);
                        }).catch(function (err) {
                              return reject(err);
                        });
                  });
            }

            /*
            ** Delete promo
            ** PUT :: /store/promo/delete
            */

      }, {
            key: 'deletePromo',
            value: function deletePromo(param) {
                  var _this5 = this;

                  return new Promise(function (resolve, reject) {
                        var promoModel = new _promo.PromoModel();

                        var paramPromo = {
                              deleted_at: _this5.moment(new Date()).format()
                        };

                        promoModel.updatePromo(paramPromo, param.id).then(function () {
                              return resolve(true);
                        }).catch(function (err) {
                              return reject(err);
                        });
                  });
            }

            /*
            ** Change status promo
            ** PUT :: /store/promo/status
            */

      }, {
            key: 'changeStatusPromo',
            value: function changeStatusPromo(param) {
                  var _this6 = this;

                  return new Promise(function (resolve, reject) {
                        var promoModel = new _promo.PromoModel();

                        promoModel.getPromoDetail(param.id).then(function (promo) {
                              var paramPromo = {
                                    deleted_at: promo.deleted_at ? null : _this6.moment(new Date()).format()
                              };

                              promoModel.updatePromo(paramPromo, param.id).then(function () {
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

      return PromoController;
}(_controller.Controller);