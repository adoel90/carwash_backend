import moment from "moment";

import { Db } from "../utils/db";

export class Model {
	constructor(){
		this.db = new Db();
		this.db.init();
		this.db.initBatch();
		this.moment = moment;
	}

	getQueue() {
		this.db.init();
		this.db.select("cafe");

		return this.db.execute();
	}
}