import crypto from "crypto";

import { Response } from "../utils/response";
import { Build } from "../utils/build";

export class Controller {
	constructor(){
		this.build = new Build();
	}

	encrypt(data){
		return crypto.createHash("sha1").update(data).digest("hex");
	}
}