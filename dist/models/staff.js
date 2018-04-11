"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StaffModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaffModel = exports.StaffModel = function (_Model) {
    _inherits(StaffModel, _Model);

    function StaffModel() {
        _classCallCheck(this, StaffModel);

        return _possibleConstructorReturn(this, (StaffModel.__proto__ || Object.getPrototypeOf(StaffModel)).call(this));
    }

    /*--- Get list Staff ---*/


    _createClass(StaffModel, [{
        key: "listStaff",
        value: function listStaff(id, active) {
            this.db.init();
            this.db.select("users", "count(*)");
            this.db.join("user_level", "user_level.ul_id = users.ul_id");
            this.db.join("owner", "users.u_id = owner.u_id");
            this.db.where("owner.store_id", id);
            if (active) {
                this.db.whereIsNull("users.deleted_at");
            }
            this.db.push();

            this.db.select("users", "users.*, user_level.*, owner.*, users.deleted_at");
            this.db.push();

            return this.db.executeMany();
        }

        /*--- Get staff by ID ---*/

    }, {
        key: "getStaffById",
        value: function getStaffById(id) {
            this.db.init();
            this.db.select("users");
            this.db.join("user_level", "user_level.ul_id = users.ul_id");
            this.db.where("u_id", id);

            return this.db.execute(true);
        }

        /*--- Get detail staff without access ---*/

    }, {
        key: "findStaff",
        value: function findStaff(id) {
            this.db.init();
            this.db.select("users");
            // this.db.join("user_level", "user_level.ul_id = users.ul_id");
            this.db.where("u_id", id);

            return this.db.execute(true);
        }

        /*--- Create new Staff ---*/

    }, {
        key: "createStaff",
        value: function createStaff(param) {
            this.db.init();
            this.db.insert("users", param, "u_id");

            return this.db.execute(true);
        }

        /*--- Update staff ---*/

    }, {
        key: "updateStaff",
        value: function updateStaff(param, id) {
            this.db.init();
            this.db.update("users", param);
            this.db.where("u_id", id);

            return this.db.execute();
        }

        /*--- Add job ---*/

    }, {
        key: "addJob",
        value: function addJob(param) {
            this.db.init();
            this.db.insert("owner", param);

            return this.db.execute();
        }

        /*--- Update job ---*/

    }, {
        key: "changeJob",
        value: function changeJob(param, id) {
            this.db.init();
            this.db.update("owner", param);
            this.db.where("o_id", id);

            return this.db.execute();
        }

        /*--- Delete job ---*/

    }, {
        key: "deleteJob",
        value: function deleteJob(id) {
            this.db.init();
            this.db.delete("owner");
            this.db.where("o_id", id);

            return this.db.execute();
        }
    }]);

    return StaffModel;
}(_model.Model);