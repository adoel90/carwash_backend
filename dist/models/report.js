"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReportModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportModel = exports.ReportModel = function (_Model) {
    _inherits(ReportModel, _Model);

    function ReportModel() {
        _classCallCheck(this, ReportModel);

        return _possibleConstructorReturn(this, (ReportModel.__proto__ || Object.getPrototypeOf(ReportModel)).call(this));
    }

    /*** Get Report member list */


    _createClass(ReportModel, [{
        key: "getReportMember",
        value: function getReportMember(start, end) {
            this.db.init();
            this.db.select("member", "count(*)");
            this.db.join("card", "card.c_id = member.c_id", "LEFT");
            this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
            this.db.whereNotNull("m_name");
            this.db.whereBetween("date(member.created_at)", start, end);
            this.db.push();

            this.db.select("member", "member.*, card.*, card_type.*, member.created_at");
            this.db.order("member.m_name");
            this.db.push();

            return this.db.executeMany();
        }
    }, {
        key: "getOwnerByUserId",
        value: function getOwnerByUserId(id) {
            this.db.init();
            this.db.select("owner");
            this.db.join("store", "store.store_id = owner.store_id");
            this.db.where("owner.u_id", id);

            return this.db.execute();
        }
    }, {
        key: "calculateTotalPriceByStore",
        value: function calculateTotalPriceByStore(start, end, id) {
            this.db.init();
            this.db.select("transaction_store", "date(ts_date), sum(ts_total)");
            this.db.group("date(ts_date)");
            this.db.whereBetween("date(ts_date)", start, end);
            this.db.where("store_id", id);

            return this.db.execute();
        }

        /*** Get Report owner ***/

    }, {
        key: "getReportOwner",
        value: function getReportOwner(start, end) {
            this.db.init();
            this.db.select("store", "count(*)");
            this.db.join("owner", "store.store_id = owner.store_id", "LEFT");
            this.db.join("users", "users.u_id = owner.u_id", "LEFT");
            this.db.join("store_category", "store_category.cstore_id = store.cstore_id");
            this.db.where("owner.o_status", true);
            // this.db.join("transaction_store", "store.store_id = transaction_store.store_id");
            // this.db.whereBetween("date(ts_date)", start, end);
            this.db.push();

            this.db.select("store");
            this.db.order("store_name");
            this.db.push();

            return this.db.executeMany();
        }

        /*** Get total report owner */

    }, {
        key: "getTotalReportOwner",
        value: function getTotalReportOwner(start, end, id) {
            this.db.init();
            this.db.select("transaction_store", "sum(ts_total)");
            this.db.group("date(ts_date)");
            this.db.whereBetween("date(ts_date)", start, end);
            this.db.where("store_id", id);

            return this.db.execute();
        }

        /*** Get Report User ***/

    }, {
        key: "getReportUser",
        value: function getReportUser(start, end, user) {
            this.db.init();
            this.db.select("log", "count(*)");
            this.db.join("member", "member.m_id = log.m_id");
            this.db.whereNotNull("log.log_date");
            if (user) {
                this.db.where("log.created_by", user);
            }
            if (start && end) {
                this.db.whereBetween("date(log.log_date)", start, end);
            }
            this.db.push();

            this.db.select("log", "log.*, member.*, log.created_by");
            this.db.order("log.log_date");
            this.db.push();

            return this.db.executeMany();
        }

        /*** OLD ***/
        /*** Get Report member list */

    }, {
        key: "getReportMemberList",
        value: function getReportMemberList(start, end) {
            this.db.init();
            this.db.select("topup", "count(*)");
            this.db.join("member", "topup.m_id = member.m_id", "LEFT");
            this.db.join("card", "card.c_id = member.c_id", "LEFT");
            this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
            this.db.whereBetween("date(tp_date)", start, end);
            this.db.push();

            this.db.select("topup");
            this.db.order("tp_id", true);
            this.db.push();

            return this.db.executeMany();
        }

        /*** Report owner cafe by Type ***/

    }, {
        key: "getGraphReportMember",
        value: function getGraphReportMember(type, start, end) {
            this.db.init();
            this.db.select("topup", "date(tp_date), sum(tp_value)");
            this.db.group("date(tp_date)");
            this.db.order("date(tp_date)");
            this.db.whereBetween("date(tp_date)", start, end);

            return this.db.execute();
        }

        /*** */

    }, {
        key: "getLastTransactionMember",
        value: function getLastTransactionMember(id) {
            this.db.init();
            this.db.select("topup");
            this.db.where("m_id", id);
            this.db.order("tp_id", true);
            this.db.limit(1, 0);

            return this.db.execute();
        }
    }]);

    return ReportModel;
}(_model.Model);