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

            accessModel.getAccessLevel().then((access) => {
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
}