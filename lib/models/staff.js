import { Model } from './model';

export class StaffModel extends Model {
    constructor() {
        super();
    }

    /*--- Get list Staff ---*/
    listStaff(id) {
        this.db.init();
        this.db.select("users", "count(*)");
        this.db.join("user_level", "user_level.ul_id = users.ul_id");
        this.db.where("store_id", id);
        this.db.push();
        
        this.db.select("users");
        this.db.push();

        return this.db.executeMany();
    }

    /*--- Get staff by ID ---*/
    getStaffById (id) {
        this.db.init();
        this.db.select("users");
        this.db.join("user_level", "user_level.ul_id = users.ul_id");
        this.db.where("u_id", id);

        return this.db.execute(true);
    }

    /*--- Get detail staff without access ---*/
    findStaff (id) {
        this.db.init();
        this.db.select("users");
        // this.db.join("user_level", "user_level.ul_id = users.ul_id");
        this.db.where("u_id", id);

        return this.db.execute(true);
    }

    /*--- Create new Staff ---*/
    createStaff (param) {
        this.db.init();
        this.db.insert("users", param);

        return this.db.execute();
    }

    /*--- Update staff ---*/
    updateStaff (param, id) {
        this.db.init();
        this.db.update("users", param);
        this.db.where("u_id", id);

        return this.db.execute();
    }
}