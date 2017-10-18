import moment from "moment";
import jwt from "jwt-simple";
import config from "../../config.json";

export class Token {
	constructor(){
		this.JWTConfig = config.jwt;
	}

	encode(data){
		let token = jwt.encode(data, this.JWTConfig.jwtSecret);

		return token;
	}
}