import { Model } from './model';

export class StaffModel extends Model {
    constructor() {
        super();
    }

    /*--- Get list Staff ---*/
    listStaff(id, active) {
        this.db.init();
        this.db.select("users", "count(*)");
        this.db.join("user_level", "user_level.ul_id = users.ul_id");
        this.db.join("owner", "users.u_id = owner.u_id");
        this.db.where("owner.store_id", id);
        if(active) {
            this.db.whereIsNull("users.deleted_at");
        }
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
        this.db.insert("users", param, "u_id");

        return this.db.execute(true);
    }

    /*--- Update staff ---*/
    updateStaff (param, id) {
        this.db.init();
        this.db.update("users", param);
        this.db.where("u_id", id);

        return this.db.execute();
    }

    /*--- Add job ---*/
    addJob (param) {
        this.db.init();
        this.db.insert("owner", param);
        
        return this.db.execute();
    }

    /*--- Update job ---*/
    changeJob(param, id) {
        this.db.init();
        this.db.update("owner", param);
        this.db.where("o_id", id);

        return this.db.execute();
    }

    /*--- Delete job ---*/
    deleteJob(id) {
        this.db.init();
        this.db.delete("owner");
        this.db.where("o_id", id);

        return this.db.execute();
    }
}