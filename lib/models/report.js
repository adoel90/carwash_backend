import { Model } from './model';

export class ReportModel extends Model {
    constructor() {
        super();
    }

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