import { Model } from "./model";

export class ServiceModel extends Model {
	constructor(){
		super();
	}

	/*** Get service type ***/
	getServiceType(){
		this.db.select("service_type");
		this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get list of service type ***/
	getServiceTypeList(limit, offset){
		this.db.select("service_type", "count(*)");
		this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("service_type");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
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
		this.db.whereIsNull("deleted_at");

		return this.db.execute();
	}

	/*** Get service data list ***/
	getServiceList(srvt_id, limit, offset){
		this.db.select("service", "count(*)");
		this.db.where("srvt_id", srvt_id);
		this.db.whereIsNull("deleted_at");
		this.db.push();

		this.db.select("service");
		this.db.limit(limit, offset);
		this.db.push();

		return this.db.executeMany();
	}

	/*** Get service data by srv_id ***/
	getServiceById(srv_id){
		this.db.select("service");
		this.db.where("srv_id", srv_id);

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
		this.db.insert("transaction_service", param);

		return this.db.execute();
	}
}