import { Model } from "./model";

export class CafeModel extends Model {
	constructor(){
		super();
	}

	/*** Get cafe type ***/
	getCafeType(){
		this.db.select("cafe");
		// this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get cafe type list ***/
	getCafeTypeList(limit, offset){
		this.db.select("cafe", "count(*)");
		// this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("cafe");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Insert cafe data ***/
	insertCafe(param){
		this.db.insert("cafe", param);

		return this.db.execute();
	}

	/*** Update cafe data ***/
	updateCafe(cf_id, param){
		this.db.update("cafe", param);
		this.db.where("cf_id", cf_id);

		return this.db.execute();
	}

	/*** Insert cafe transaction ***/
	insertCafeTransaction(param){
		this.db.insert("transaction_cafe", param, "tc_id");

		return this.db.execute(true);
	}

	/*** Insert cafe transaction menu ***/
	insertCafeTransactionMenu(tc_id, menu) {
		this.db.init();
		for(let i=0; i<menu.length; i++){
			let param = {
				tc_id : tc_id,
				mn_id : menu[i].id,
				tcm_quantity : menu[i].quantity,
				tcm_price : menu[i].price
			}
			this.db.insert("transaction_cafe_menu", param);
			this.db.push(true);
		}

		return this.db.executeMany();
	}

	/*** Get cafe transaction report ***/
	getCafeTransactionReport(start, end, cafe) {
		this.db.init();
		this.db.select("transaction_cafe", "count(*)");
		this.db.join("transaction_cafe_menu", "transaction_cafe_menu.tc_id = transaction_cafe.tc_id");
		this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
		this.db.join("cafe", "cafe.cf_id = menu.cf_id");
		this.db.join("member", "member.m_id = transaction_cafe.m_id");
		this.db.whereBetween("date(tc_date)", start, end);
		if(cafe) {
			this.db.where("cafe.cf_id", cafe);
		}
		this.db.push();

		this.db.select("transaction_cafe");
		this.db.push();
		
		return this.db.executeMany();
	}

	/*** Get cafe transaction summary ***/
	getCafeTransactionSummary(start, end) {
		this.db.init();
		this.db.select("transaction_cafe", "cf_id, sum(tcm_quantity * tcm_price)");
		this.db.join("transaction_cafe_menu", "transaction_cafe_menu.tc_id = transaction_cafe.tc_id");
		this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
		this.db.whereBetween("date(tc_date)", start, end);
		this.db.group("cf_id");

		return this.db.execute();
	}
}