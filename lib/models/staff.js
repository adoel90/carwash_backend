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
        
        this.db.select("users", "users.*, user_level.*, owner.*, users.deleted_at");
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

    /*--- Get report staff by transaction ---*/
    getReportStaffByTransaction(staff, store, start, end) {
        this.db.init();
        this.db.select("transaction_store", "count(*)");
        this.db.join("member", "member.m_id = transaction_store.m_id");
        this.db.join("store", "transaction_store.store_id = store.store_id");
        this.db.whereNotNull("transaction_store.created_by");
        if(staff) {
            this.db.where("transaction_store.created_by", staff);
        }
        if(store) {
            this.db.where("transaction_store.store_id", store);
        }
        if(start && end) {
            this.db.whereBetween("date(transaction_store.ts_date)", start, end);
        }
        this.db.push();

        this.db.select("transaction_store", "transaction_store.*, member.*, store.*, transaction_store.created_by");
        this.db.order("transaction_store.ts_date", true);
        this.db.push();

        return this.db.executeMany();
    }

    /*--- Get report staff by transaction ---*/
    getReportStaffByTransactionItem(staff, store, start, end, id) {
        this.db.init();
        this.db.select("transaction_item", "count(*)");
        this.db.join("transaction_store", "transaction_store.ts_id = transaction_item.ts_id");
        this.db.join("member", "member.m_id = transaction_store.m_id");
        this.db.join("store", "transaction_store.store_id = store.store_id");
        // this.db.whereNotNull("transaction_store.created_by");
        if(staff) {
            this.db.where("transaction_store.created_by", staff);
        }
        if(store) {
            this.db.where("transaction_store.store_id", store);
        }
        if(start && end) {
            this.db.whereBetween("date(transaction_store.ts_date)", start, end);
        }
        if(id) {
            this.db.where("transaction_item.ts_id", id);
        }
        this.db.push();

        this.db.select("transaction_item", "transaction_item.*, transaction_store.*, member.*, store.*, transaction_store.created_by");
        this.db.order("transaction_store.ts_date", true);
        this.db.push();

        return this.db.executeMany();
    }

    /*--- Get detail transaction item ---*/
    getDetailTransactionItem(id) {
        this.db.init();
        this.db.select("transaction_item");
        this.db.where("ts_id", id);

        return this.db.execute();
    }
}