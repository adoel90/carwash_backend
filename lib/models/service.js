import { Model } from "./model";

export class ServiceModel extends Model {
	constructor(){
		super();
	}

	/*** Get service type ***/
	getServiceType(){
		this.db.select("service_type");

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

	/*** Insert service type data ***/
	insertServiceType(param){
		this.db.insert("service_type", param, "srvt_id");

		return this.db.execute();
	}

	updateServiceType(srvt_id, param){
		this.db.update("service_type", param);
		this.db.where("srvt_id", srvt_id);

		return this.db.execute();
	}
}