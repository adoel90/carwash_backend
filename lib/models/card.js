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

	/*** Insert card data ***/
	insertCard(param){
		this.db.insert("card", param, "c_id");

		return this.db.execute(true);
	}

	/*** Get card type ***/
	getCardType(){
		this.db.select("card_type");

		return this.db.execute();
	}

	/*** Get card type by ct_id ***/
	getCardTypeById(ct_id){
		this.db.select("card_type");
		this.db.where("ct_id", ct_id);

		return this.db.execute(true);
	}
}