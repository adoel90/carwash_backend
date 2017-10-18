import { Db } from "../utils/db";

export class Model {
	constructor(){
		this.db = new Db();
	}
}