import formidable from "formidable";
import multer from "multer";

import { Response } from "../utils/response";

export class Routes {
	constructor(){
		this.form = new formidable.IncomingForm();
		this.upload = multer({dest: __dirname+'/../../public/'});
	}

	incomingForm(){
		return new formidable.IncomingForm();
	}

	checkParameters(parameter){
		for(var i in parameter){
			if(typeof(parameter[i]) === "undefined"){
				console.log(i);
				return false;
			}
		}
		return true;
	}

	success(res, data=null, message=null){
		return res.status(200).send({status:200, message:message, data:data});
	}

	error(res, code){
		let error = Response.code(code);
		console.log(code);
		return res.status(error.get("status")).send({status: error.get("status"), message: error.get("message")});
	}
}