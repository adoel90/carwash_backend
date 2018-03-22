import { Model } from "./model";
import { lang } from "moment";


export class AccessModel extends Model {
    constructor(){
        super();
    }

    /*** Get all access level ***/
    getAccessLevel(active){
        this.db.init();
        this.db.select("user_level");
        if(active) {
            this.db.whereIsNull("deleted_at");
        }

        return this.db.execute();
    }

    /*** Insert access level data ***/
    insertAccess(param) {
        this.db.init();
        this.db.insert("user_level", param, "ul_id");

        return this.db.execute(true);
    }

    /*** Update access level data ***/
    updateAccess(ul_id, param) {
        this.db.init();
        this.db.update("user_level", param);
        this.db.where("ul_id", ul_id);

        return this.db.execute();
    }

    /*** Insert access module ***/
    insertAccessModule(ul_id, module) {
        this.db.init();
        for(let i=0; i<module.length; i++){
            let param = {
                mod_id : module[i],
                ul_id : ul_id
            }
            this.db.insert("mod_access", param);
            this.db.push(true);
        }

        return this.db.executeMany();
    }

    /*** Delete access module ***/
    deleteAccessModule(ul_id) {
        this.db.init();
        this.db.delete("mod_access");
        this.db.where("ul_id", ul_id);

        return this.db.execute();
    }

    /*** Get access by id ***/
    getAccessById(id) {
        this.db.init();
        this.db.select("user_level");
        this.db.where("ul_id", id);

        return this.db.execute(true);
    }

    /*** Get access level module data ***/
    getAccessModule(ul_id) {
        this.db.init();
        this.db.select("mod_access");
        this.db.join("module", "module.mod_id = mod_access.mod_id");
        this.db.where("ul_id", ul_id);

        return this.db.execute();
    }

    /*** Get all module ***/
    getModule() {
        this.db.init();
        this.db.select("module");

        return this.db.execute();
    }
}