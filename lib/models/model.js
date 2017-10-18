import moment from "moment";

import { Db } from "../utils/db";

export class Model {
	constructor(){
		this.db = new Db();
		this.db.init();
		this.moment = moment;
	}
}