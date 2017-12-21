import { Model } from "./model";

export class MemberModel extends Model {
	constructor(){
		super();
	}

	/*** Get member list ***/
	getMemberList(limit, offset, name){
		this.db.select("member", "count(*)");
		if(name){
			this.db.whereLike("lower(m_name)", "%"+name.toLowerCase()+"%");
		}
		// this.db.whereIsNull("member.deleted_at");
		this.db.push();

		this.db.select("member", "member.deleted_at as deleted, *");
		this.db.join("card", "card.c_id = member.c_id");
		this.db.join("card_type", "card.ct_id = card_type.ct_id");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	getMember(name){
		this.db.select("member", "member.deleted_at as deleted, *");
		this.db.join("card", "card.c_id = member.c_id");
		this.db.join("card_type", "card.ct_id = card_type.ct_id");
		if(name){
			this.db.whereLike("lower(m_name)", "%"+name.toLowerCase()+"%");
		}
		// this.db.whereIsNull("member.deleted_at");
		this.db.push();

		return this.db.execute();
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

	/*** Get member by c_id ***/
	getMemberByCardId(c_id){
		this.db.init();
		this.db.select("member", "card.deleted_at as card_delete, member.deleted_at as member_delete, *");
		this.db.join("card", "card.c_id = member.c_id");
		this.db.join("card_type", "card.ct_id = card_type.ct_id");
		this.db.where("member.c_id", c_id);

		return this.db.execute(true);
	}

	/*** Get member by m_id ***/
	getMemberById(m_id){
		this.db.init();
		this.db.select("member", "member.deleted_at as deleted, *");
		this.db.where("m_id", m_id);
		this.db.join("card", "card.c_id = member.c_id");
		this.db.join("card_type", "card_type.ct_id = card.ct_id");

		return this.db.execute(true);
	}

	/*** Increase member balance ***/
	increaseBalance(m_id, balance){
		this.db.init();
		this.db.setQuery("UPDATE member SET m_balance = m_balance + $1 where m_id = $2", [balance, m_id]);

		return this.db.execute();
	}

	/*** Decrease member balance ***/
	decreaseBalance(m_id, balance){
		this.db.setQuery("UPDATE member SET m_balance = m_balance - $1 where m_id = $2", [balance, m_id]);

		return this.db.execute();
	}

	/*** Insert topup data ***/
	insertTopup(param) {
		this.db.init();
		this.db.insert("topup", param, "tp_id");

		return this.db.execute(true);
	}

	/*** Get topup data ***/
	getTopup(tp_id) {
		this.db.init();
		this.db.select("topup");
		this.db.join("member", "member.m_id = topup.m_id");
		this.db.where("tp_id", tp_id);

		return this.db.execute(true);
	}
}