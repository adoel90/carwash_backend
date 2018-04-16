import { Model } from './model';

export class ReportModel extends Model {
    constructor() {
        super();
    }

    /*** Get Report member list */
    getReportMember (start, end) {
        this.db.init();
        this.db.select("member", "count(*)");
        this.db.join("card", "card.c_id = member.c_id", "LEFT");
        this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
        this.db.whereBetween("date(member.created_at)", start, end);
        this.db.push();

        this.db.select("member", "member.*, card.*, card_type.*, member.created_at");
        this.db.order("member.created_at", true);
        this.db.push();

        return this.db.executeMany();
    }

    getOwnerByUserId(id) {
        this.db.init();
        this.db.select("owner");
        this.db.join("store", "store.store_id = owner.store_id");
        this.db.where("owner.u_id", id);

        return this.db.execute();
    }

    calculateTotalPriceByStore (id) {
        this.db.init();
        this.db.select("transaction_store", "sum(ts_total)");
        this.db.where("store_id", id);

        return this.db.execute();
    }

    /*** Get Report owner ***/
    getReportOwner (start, end) {
        this.db.init();
        this.db.select("users", "count(*)");
        this.db.join("owner", "users.u_id = owner.u_id");
        this.db.join("store", "store.store_id = owner.store_id");
        this.db.join("store_category", "store_category.cstore_id = store.cstore_id");
        this.db.join("transaction_store", "store.store_id = transaction_store.store_id");
        this.db.whereBetween("date(ts_date)", start, end);
        this.db.push();

        this.db.select("users");
        this.db.push();

        return this.db.executeMany();
    }

    /*** Get Report User ***/
    getReportUser (start, end, user) {
        this.db.init();
        this.db.select("log", "count(*)");
        this.db.join("member", "member.m_id = log.m_id");
        this.db.whereNotNull("log.created_by");
        if(user) {
            this.db.where("log.created_by", user);
        }
        if(start && end) {
            this.db.whereBetween("date(log.log_date)", start, end);
        }
        this.db.push();

        this.db.select("log", "log.*, member.*, log.created_by");
        this.db.order("log.log_date", true);
        this.db.push();

        return this.db.executeMany();

    }

    /*** OLD ***/
    /*** Get Report member list */
    getReportMemberList (start, end) {
        this.db.init();
        this.db.select("topup", "count(*)");
        this.db.join("member", "topup.m_id = member.m_id", "LEFT");
        this.db.join("card", "card.c_id = member.c_id", "LEFT");
        this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
        this.db.whereBetween("date(tp_date)", start, end);
        this.db.push();

        this.db.select("topup");
        this.db.order("tp_id", true);
        this.db.push();

        return this.db.executeMany();
    }
    
    /*** Report owner cafe by Type ***/
	getGraphReportMember(type, start, end) {
		this.db.init();
		this.db.select("topup", "date(tp_date), sum(tp_value)");
		this.db.group("date(tp_date)");
		this.db.order("date(tp_date)");
		this.db.whereBetween("date(tp_date)", start, end);
		
		return this.db.execute();
	}
}