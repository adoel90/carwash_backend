"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LogModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require("./model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogModel = exports.LogModel = function (_Model) {
    _inherits(LogModel, _Model);

    function LogModel() {
        _classCallCheck(this, LogModel);

        return _possibleConstructorReturn(this, (LogModel.__proto__ || Object.getPrototypeOf(LogModel)).call(this));
    }

    /*** create log user ***/


    _createClass(LogModel, [{
        key: "createLogUser",
        value: function createLogUser(data) {
            this.db.init();
            this.db.insert("log", data);

            return this.db.execute();
        }
    }]);

    return LogModel;
}(_model.Model);