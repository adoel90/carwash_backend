import { Model } from "./model";

export class CafeModel extends Model {
	constructor(){
		super();
	}

	/*** Get cafe type ***/
	getCafeType(){
		this.db.init();
		this.db.select("cafe");
		// this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get cafe type by ct_id ***/
	getCafeTypeById(cf_id) {
		this.db.init();
		this.db.select("cafe");
		this.db.where("cf_id", cf_id);

		return this.db.execute(true);
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
		this.db.init();
		this.db.insert("cafe", param, "cf_id");

		return this.db.execute(true);
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

	/*** Get cafe transaction report ***/
	cafeTransactoinReport(start, end, cafe) {
		this.db.init();
		this.db.select("transaction_cafe", "date(tc_date), sum(tcm_quantity * tcm_price)");
		this.db.join("transaction_cafe_menu", "transaction_cafe_menu.tc_id = transaction_cafe.tc_id");
		this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
		this.db.whereBetween("date(tc_date)", start, end);
		if(cafe) {
			this.db.where("cafe.cf_id", cafe);
		}
		this.db.group("date(tc_date)");

		return this.db.execute();
	}


	/*** Get cafe transaction by id ***/
	getCafeTransactionById(id){
		this.db.init();
		this.db.select("transaction_cafe");
		this.db.join("member", "member.m_id = transaction_cafe.m_id");
		this.db.where("tc_id", id);

		return this.db.execute(true);
	}

	/*** Get cafe transaction menu by tc_id ***/
	getCafeTransactionMenuById(tc_id) {
		this.db.init();
		this.db.select("transaction_cafe_menu");
		this.db.join("menu", "menu.mn_id = transaction_cafe_menu.mn_id");
		this.db.join("cafe", "cafe.cf_id = menu.cf_id");
		this.db.where("tc_id", tc_id);

		return this.db.execute();
	}

	/*** Get cafe transaction data ***/
	getCafeTransaction(m_id) {
		this.db.init();
		this.db.select("transaction_cafe");
		if(m_id) {
			this.db.where("m_id", m_id);
		}

		return this.db.execute();
	}

	/* getCafeQueue(cf_id) {
		if(!cf_id) {
			return null ;
		}
		let q = $queue[cf_id] + 1;
		$queue[cf_id] += 1;
		
		this.db.init();
		this.db.select("cafe");
		this.db.where("cf_id", cf_id);
		this.db.execute(true).then((cafe) => {
			if(q > cafe.cf_queue) {
				let u = {
					cf_queue : q
				}
				this.db.init();
				this.db.update("cafe", u);
				this.db.where("cf_id", cf_id);

				this.db.execute().catch((err) => {
					console.log(err);
				});
			}
		}).catch((err) => {
			console.log(err);
		});
		
		return q;
	} */

	getCafeQueue(cf_id) {
		return new Promise((resolve, reject) => {
			this.db.init();
			this.db.select("cafe");
			this.db.where("cf_id", cf_id);
			this.db.execute(true).then((cafe) => {
				let q = parseInt(cafe.cf_queue) + 1;
				let u = {
					cf_queue : q
				}
				this.db.init();
				this.db.update("cafe", u);
				this.db.where("cf_id", cf_id);

				this.db.execute().then(() => {
					return resolve(q);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*** Report owner cafe by Type ***/
	getGraphReportTransactionByType(type, start, end, cafe) {
		this.db.init();
		this.db.select("transaction_cafe", "date(tc_date), sum(tc_total)");
		this.db.group("date(tc_date)");
		this.db.order("date(tc_date)");
		this.db.whereBetween("date(tc_date)", start, end);
		if(cafe){
			this.db.where("cf_id", cafe);
		}
		
		return this.db.execute();
	}
}