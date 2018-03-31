"use strict";

Object.defineProperty(exports, "__esModule", {
      value: true
});
exports.PromoModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PromoModel = exports.PromoModel = function (_Model) {
      _inherits(PromoModel, _Model);

      function PromoModel() {
            _classCallCheck(this, PromoModel);

            return _possibleConstructorReturn(this, (PromoModel.__proto__ || Object.getPrototypeOf(PromoModel)).call(this));
      }

      /*** Get Promo Store List ***/


      _createClass(PromoModel, [{
            key: "getPromoList",
            value: function getPromoList(id, start, end) {
                  this.db.init();
                  this.db.select("promo", "count(*)");
                  this.db.where("store_id", id);
                  if (start && end) {
                        this.db.whereBetween("date(p_date)", start, end);
                  }
                  this.db.push();

                  this.db.select("promo");
                  this.db.order("p_id");
                  this.db.push();

                  return this.db.executeMany();
            }

            /*** Get Promo Store Detail ***/

      }, {
            key: "getPromoDetail",
            value: function getPromoDetail(id) {
                  this.db.init();
                  this.db.select("promo");
                  this.db.where("p_id", id);

                  return this.db.execute(true);
            }

            /*** Create Promo Store ***/

      }, {
            key: "createPromo",
            value: function createPromo(data) {
                  this.db.init();
                  this.db.insert("promo", data);

                  return this.db.execute();
            }

            /*** Update Promo Store ***/

      }, {
            key: "updatePromo",
            value: function updatePromo(data, id) {
                  this.db.init();
                  this.db.update("promo", data);
                  this.db.where("p_id", id);

                  return this.db.execute();
            }
      }]);

      return PromoModel;
}(_model.Model);