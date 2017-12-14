import { Model } from "./model";


export class AccessModel extends Model {
    constructor(){
        super();
    }

    /*
    ** Get all access level
    ** GET :: /access
    */
    getAccessLevel(){
        this.db.init();
        this.db.select("user_level");

        return this.db.execute();
    }
}