import { Model } from './model';

export class ReportModel extends Model {
    constructor() {
        super();
    }

    /*** Get Report member list */
    getReportMemberList (start, end) {
        this.db.init();
        this.db.select("member", "count(*)");
        this.db.join("card", "card.c_id = member.c_id", "LEFT");
        this.db.join("card_type", "card_type.ct_id = card.ct_id", "LEFT");
        this.db.whereBetween("date(member.created_at)", start, end);
        this.db.push();

        this.db.select("member");
        this.db.order("m_id", true);
        this.db.push();

        return this.db.executeMany();
    }
    
    /*** Report owner cafe by Type ***/
	getGraphReportMember(type, start, end) {
		this.db.init();
		this.db.select("member", "date(created_at), count(*)");
		this.db.group("date(created_at)");
		this.db.order("date(created_at)");
		this.db.whereBetween("date(created_at)", start, end);
		
		return this.db.execute();
	}
}