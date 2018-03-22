"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AccessModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

var _moment = require("moment");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccessModel = exports.AccessModel = function (_Model) {
    _inherits(AccessModel, _Model);

    function AccessModel() {
        _classCallCheck(this, AccessModel);

        return _possibleConstructorReturn(this, (AccessModel.__proto__ || Object.getPrototypeOf(AccessModel)).call(this));
    }

    /*** Get all access level ***/


    _createClass(AccessModel, [{
        key: "getAccessLevel",
        value: function getAccessLevel(active) {
            this.db.init();
            this.db.select("user_level");
            if (active) {
                this.db.whereIsNull("deleted_at");
            }

            return this.db.execute();
        }

        /*** Insert access level data ***/

    }, {
        key: "insertAccess",
        value: function insertAccess(param) {
            this.db.init();
            this.db.insert("user_level", param, "ul_id");

            return this.db.execute(true);
        }

        /*** Update access level data ***/

    }, {
        key: "updateAccess",
        value: function updateAccess(ul_id, param) {
            this.db.init();
            this.db.update("user_level", param);
            this.db.where("ul_id", ul_id);

            return this.db.execute();
        }

        /*** Insert access module ***/

    }, {
        key: "insertAccessModule",
        value: function insertAccessModule(ul_id, module) {
            this.db.init();
            for (var i = 0; i < module.length; i++) {
                var param = {
                    mod_id: module[i],
                    ul_id: ul_id
                };
                this.db.insert("mod_access", param);
                this.db.push(true);
            }

            return this.db.executeMany();
        }

        /*** Delete access module ***/

    }, {
        key: "deleteAccessModule",
        value: function deleteAccessModule(ul_id) {
            this.db.init();
            this.db.delete("mod_access");
            this.db.where("ul_id", ul_id);

            return this.db.execute();
        }

        /*** Get access by id ***/

    }, {
        key: "getAccessById",
        value: function getAccessById(id) {
            this.db.init();
            this.db.select("user_level");
            this.db.where("ul_id", id);

            return this.db.execute(true);
        }

        /*** Get access level module data ***/

    }, {
        key: "getAccessModule",
        value: function getAccessModule(ul_id) {
            this.db.init();
            this.db.select("mod_access");
            this.db.join("module", "module.mod_id = mod_access.mod_id");
            this.db.where("ul_id", ul_id);

            return this.db.execute();
        }

        /*** Get all module ***/

    }, {
        key: "getModule",
        value: function getModule() {
            this.db.init();
            this.db.select("module");

            return this.db.execute();
        }
    }]);

    return AccessModel;
}(_model.Model);