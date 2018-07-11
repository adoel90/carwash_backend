import crypto from "crypto";
import moment from "moment";

import { Response } from "../utils/response";
import { Build } from "../utils/build";
import { rewriteImage, buildRange, buildRangeMember } from "../utils/util";
import { parseCurrency } from "../utils/util";

export class Controller {
	constructor(){
		this.build = new Build();
		this.moment = moment;
		this.rewriteImage = rewriteImage;
		this.buildRange = buildRange;
		this.buildRangeMember = buildRangeMember;
		this.parseCurrency = parseCurrency;
	}

	encrypt(data){
		return crypto.createHash("sha1").update(data).digest("hex");
  }
}