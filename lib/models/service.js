import { Model } from "./model";

export class ServiceModel extends Model {
	constructor(){
		super();
	}

	/*** Get service type ***/
	getServiceType(){
		this.db.select("service_type");
		// this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get list of service type ***/
	getServiceTypeList(limit, offset){
		this.db.select("service_type", "count(*)");
		// this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("service_type");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	getServiceQueue(srvt_id) {
		return new Promise((resolve, reject) => {
			this.db.init();
			this.db.select("service_type");
			this.db.limit(1,0);
			this.db.execute(true).then((service) => {
				service.srvt_queue = service.srvt_queue ? service.srvt_queue : 0;
				let q = parseInt(service.srvt_queue) + 1;
				let u = {
					srvt_queue : q
				}
				this.db.init();
				this.db.update("service_type", u);

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

	/*** Get service transaction report data ***/
	getServiceTransactionReport(start, end, service) {
		this.db.init();
		this.db.select("transaction_service", "count(*)");
		this.db.join("member", "transaction_service.m_id = member.m_id");
		this.db.join("service", "service.srv_id = transaction_service.tsrv_id");
		this.db.join("service_type", "service_type.srvt_id = service.srvt_id");
		this.db.whereBetween("date(tsrv_date)", start, end);
		if(service) {
			this.db.where("service.srvt_id", service);
		}
		this.db.push();
		
		this.db.select("transaction_service");
		this.db.order("tsrv_date");
		this.db.limit(limit, offset);
		this.db.push();
		
		return this.db.executeMany();
	}

	/*** Insert service type data ***/
	insertServiceType(param){
		this.db.insert("service_type", param, "srvt_id");

		return this.db.execute();
	}

	/*** Update service type data ***/
	updateServiceType(srvt_id, param){
		this.db.update("service_type", param);
		this.db.where("srvt_id", srvt_id);

		return this.db.execute();
	}

	/*** Get service data ***/
	getService(srvt_id){
		this.db.select("service");
		this.db.where("srvt_id", srvt_id);
		// this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get service transaction data ***/
	getServiceTransaction(m_id) {
		this.db.init();
		this.db.select("transaction_service");
		if(m_id) {
			this.db.where("m_id", m_id);
		}
		return this.db.execute();
	}

	/*** Get service data list ***/
	getServiceList(srvt_id, limit, offset){
		this.db.select("service", "count(*)");
		this.db.where("srvt_id", srvt_id);
		// this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("service");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Get service data by srv_id ***/
	getServiceById(srv_id){
		this.db.init();
		this.db.select("service");
		this.db.where("srv_id", srv_id);

		return this.db.execute(true);
	}

	/*** Get service type by srvt_id ***/
	getServiceTypeById(srvt_id){
		this.db.init();
		this.db.select("service_type");
		this.db.where("srvt_id", srvt_id);

		return this.db.execute(true);
	}

	/*** Insert service data ***/
	insertService(param){
		this.db.insert("service", param);

		return this.db.execute();
	}

	/*** Update service data ***/
	updateService(srv_id, param){
		this.db.update("service", param);
		this.db.where("srv_id", srv_id);

		return this.db.execute();
	}

	/*** Insert service transaction data ***/
	insertServiceTransaction(param){
		this.db.insert("transaction_service", param, "tsrv_id");

		return this.db.execute(true);
	}

	/*** Get summary transaction services ***/
	getServiceTransactionSummary(start, end) {
		this.db.init();
		this.db.select("transaction_service", "service_type.srvt_id, sum(tsrv_price)");
		this.db.join("service", "service.srv_id = transaction_service.srv_id");
		this.db.join("service_type", "service_type.srvt_id = service.srvt_id");
		this.db.whereBetween("date(tsrv_date)", start, end);
		this.db.group("service_type.srvt_id");

		return this.db.execute();
	}

	/*** Get service transaction data ***/
	getServiceTransactionById(id) {
		this.db.init();
		this.db.select("transaction_service");
		this.db.join("service", "service.srv_id = transaction_service.srv_id");
		this.db.join("service_type", "service_type.srvt_id = service.srvt_id");
		this.db.join("member", "member.m_id = transaction_service.m_id");
		this.db.where("tsrv_id", id);

		return this.db.execute(true);
	}
}