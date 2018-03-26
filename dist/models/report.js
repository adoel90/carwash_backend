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
        key: "getReportMemberList",
        value: function getReportMemberList(start, end) {
            this.db.init();
            this.db.select("member", "count(*)");
            this.db.join("card", "card.c_id = member.c_id", "LEFT");
            this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
            this.db.whereBetween("date(member.created_at)", start, end);
            this.db.push();

            this.db.select("member");
            this.db.order("m_id", true);
            this.db.push();

            return this.db.executeMany();
        }

        /*** Report owner cafe by Type ***/

    }, {
        key: "getGraphReportMember",
        value: function getGraphReportMember(type, start, end) {
            this.db.init();
            this.db.select("member", "date(created_at), count(*)");
            this.db.group("date(created_at)");
            this.db.order("date(created_at)");
            this.db.whereBetween("date(created_at)", start, end);

            return this.db.execute();
        }
    }]);

    return ReportModel;
}(_model.Model);