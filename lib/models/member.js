import { Model } from "./model";

export class MemberModel extends Model {
	constructor(){
		super();
	}

	/*** Get member list ***/
	getMemberList(limit, offset){
		this.db.select("member", "count(*)");
		this.db.push();

		this.db.select("member");
		this.db.join("card", "card.c_id = member.c_id");
		this.db.join("card_type", "card.ct_id = card_type.ct_id");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert member data ***/
	insertMember(param){
		this.db.insert("member", param, "m_id");

		return this.db.execute(true);
	}

	/*** Update member data ***/
	updateMember(m_id, param){
		this.db.update("member", param);
		this.db.where("m_id", m_id);

		return this.db.execute();
	}
}