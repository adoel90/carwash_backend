import { Controller } from "./controller";
import { AccessModel } from "../models/access";

export class AccessController extends Controller {
    constructor(){
        super();
    }

    /*
    ** Get all access level
    ** GET :: /access
    */
    getAllAccess(param) {
        return new Promise((resolve, reject) => {
            let accessModel = new AccessModel();

            accessModel.getAccessLevel(param.active).then((access) => {
                let result = [];
                for(let i=0; i<access.length; i++){
                    result.push(this.build.accessLevel(access[i]));
                }

                return resolve(result);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Get access level detail
    ** GET :: /access/detail
    */
    accessDetail(param) {
        return new Promise((resolve, reject) => {
            let accessModel = new AccessModel();

            accessModel.getAccessById(param.id).then((access) => {
                let result = this.build.accessLevel(access);
                result.module = [];
                accessModel.getAccessModule(param.id).then((module) => {
                    for(let i=0; i<module.length; i++){
                        result.module.push(this.build.module(module[i]));
                    }

                    return resolve(result);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Create new access level
    ** POST :: /access/create
    */
    createAccess(param) {
        return new Promise((resolve, reject) => {
            let accessModel = new AccessModel();

            let accessParam = {
                ul_name : param.name
            }
            accessModel.insertAccess(accessParam).then((access) => {
                accessModel.insertAccessModule(access.ul_id, param.module).then(() => {
                    return resolve(true);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Update access level data
    ** PUT :: /access/update
    */
    updateAccess(param) {
        return new Promise((resolve, reject) => {
            let accessModel = new AccessModel();

            let accessParam = {
                ul_name : param.name
            }
            accessModel.updateAccess(param.id, accessParam).then(() => {
                accessModel.deleteAccessModule(param.id).then(() => {
                    accessModel.insertAccessModule(param.id, param.module).then(() => {
                        return resolve(true);
                    }).catch((err) => {
                        return reject(err);
                    });
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Change status access level
    ** PUT :: /access/status
    */
    statusAccess(param) {
        return new Promise((resolve, reject) => {
            let accessModel = new AccessModel();

            accessModel.getAccessById(param.id).then((access) => {
                let accessParam = {
                    deleted_at : access.deleted_at ? null : this.moment(new Date).format()
                }
                accessModel.updateAccess(param.id, accessParam).then(() => {
                    return resolve(true);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Get all module
    ** GET :: /module
    */
    allModule(param) {
        return new Promise((resolve, reject) => {
            let accessModel = new AccessModel();

            accessModel.getModule().then((module) => {
                let result = [];
                for(let i=0; i<module.length; i++){
                    result.push(this.build.module(module[i]));
                }

                return resolve(result);
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}