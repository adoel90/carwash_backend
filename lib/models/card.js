import { Model } from "./model";

export class CardModel extends Model {
	constructor(){
		super();
	}

	getLastRow(limit, where) {
		this.db.init();
		this.db.select("member");
		this.db.order("created_at", true);
		this.db.where("m_id", where);
		this.db.limit(limit);

		return this.db.execute();
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
		this.db.order("card_type.deleted_at IS NULL", true);
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

	/*** Get saldo by ct_id ***/
	getSaldoByCtId(ct_id){
		this.db.init();
		this.db.select("saldo");
		this.db.where("ct_id", ct_id);

		return this.db.execute(true);
	}

	/*** Get card type list ***/
	getCardTypeList(limit, offset){
		this.db.init();
		this.db.select("card_type", "count(*)");
		this.db.push();

    this.db.select("card_type");
    // this.db.join("saldo", "card_type.ct_id = saldo.ct_id");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert card type data ***/
	insertCardType(param){
		this.db.init();
		this.db.insert("card_type", param, "ct_id");
		this.db.push(true);

		return this.db.executeMany();
	}

	/*** Update card type data ***/
	updateCardType(ct_id, param){
		this.db.init();
		this.db.update("card_type", param);
		this.db.where("ct_id", ct_id);
		// this.db.push(true);

		return this.db.execute();
  }

	/*** Update card data ***/
	updateCard(c_id, param) {
		this.db.update("card", param);
		this.db.where("c_id", c_id);

		return this.db.execute();
	}

	createItemTopUp(ct_id, item) {
		for (let i = 0; i < item.length; i++) {
			this.db.init();

			let param = {
				ct_id : ct_id,
				saldo : item[i].saldo,
				bonus : item[i].bonus,
				created_at : this.moment(new Date).format()
			}

			this.db.insert('saldo', param);
			this.db.push(true);
		}

		return this.db.executeMany();
	}

	deleteItemTopUp(id) {
		this.db.init();
		this.db.delete('saldo');
		this.db.where('ct_id', id);

		return this.db.execute();
  }
  
  /*** Saldo List by Card Type ID ***/
  saldoListByCardTypeId(id) {
    this.db.init();
    this.db.select("saldo", "id, saldo, bonus");
    this.db.where("ct_id", id);

    return this.db.execute();
  }
}