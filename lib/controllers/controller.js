import crypto from "crypto";
import moment from "moment";

import { Response } from "../utils/response";
import { Build } from "../utils/build";
import { rewriteImage } from "../utils/util";

export class Controller {
	constructor(){
		this.build = new Build();
		this.moment = moment;
		this.rewriteImage = rewriteImage;
	}

	encrypt(data){
		return crypto.createHash("sha1").update(data).digest("hex");
	}
}