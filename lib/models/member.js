import { Model } from "./model";

export class MemberModel extends Model {
	constructor(){
		super();
	}

	getMemberList(limit, offset){
		this.db.select("member", "count(*)");
		this.db.push();

		this.db.select("member");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}
}