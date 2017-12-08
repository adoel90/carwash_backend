import { Model } from "./model";

export class CardModel extends Model {
	constructor(){
		super();
	}

	/*** Generate card id ***/
	generateCardId(type){
		let c_id = this.moment(new Date).format("x");

		if(type<10){
			type = "00"+parseInt(type);
		}else if(type >= 10 && type < 100){
			type = "0"+parseInt(type);
		}

		return type+c_id;
	}

	getCardById(c_id) {
		this.db.init();
		this.db.select("card");
		this.db.join("card_type", "card_type.ct_id = card.ct_id");
		this.db.join("member", "member.c_id = card.c_id");
		this.db.where("card.c_id", c_id);

		return this.db.execute(true);
	}

	/*** Insert card data ***/
	insertCard(param){
		this.db.insert("card", param, "c_id");

		return this.db.execute(true);
	}

	/*** Get card type ***/
	getCardType(){
		this.db.init();
		this.db.select("card_type");
		// this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get card type by ct_id ***/
	getCardTypeById(ct_id){
		this.db.init();
		this.db.select("card_type");
		this.db.where("ct_id", ct_id);

		return this.db.execute(true);
	}

	/*** Get card type list ***/
	getCardTypeList(limit, offset){
		this.db.init();
		this.db.select("card_type", "count(*)");
		// this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("card_type");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert card type data ***/
	insertCardType(param){
		this.db.insert("card_type", param);

		return this.db.execute();
	}

	/*** Update card type data ***/
	updateCardType(ct_id, param){
		this.db.update("card_type", param);
		this.db.where("ct_id", ct_id);

		return this.db.execute();
	}

	/*** Update card data ***/
	updateCard(c_id, param) {
		this.db.update("card", param);
		this.db.where("c_id", c_id);

		return this.db.execute();
	}
}