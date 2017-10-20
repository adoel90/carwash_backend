import passport from "passport";
import passportJwt from "passport-jwt";
import jwt from "jwt-simple";
import moment from "moment";

import config from "../../config.json";

import { Response } from "../utils/response";

export function initialize () {
	let STRATEGY = passportJwt.Strategy;
	let EXTRACTJWT = passportJwt.ExtractJwt;
	let JWTConfig = config.jwt;

	let params = {
		secretOrKey : JWTConfig.jwtSecret,
		jwtFromRequest : EXTRACTJWT.fromUrlQueryParameter('accessToken')
	}

	let strategy = new STRATEGY(params, (payload, done) => {
		return done(null, payload);
	});

	passport.use(strategy);
	
	return passport.initialize();
}

export function verifyToken (req, res, next) {
	let JWTConfig = config.jwt;
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err){
			console.log(err);
			return next(err);
		}

		if(!user){
			let response = Response.code(0);
			return res.status(response.get("status")).send({status: response.get("status"), message: response.get("message")});
		}else{
			let decode = jwt.decode(req.query.accessToken, JWTConfig.jwtSecret, "HS512")

			res.locals.user = decode;
			// console.log("here");
			return next();
		}
	})(req, res, next);
}

export function verifyMemberToken (req, res, next){
	let JWTConfig = config.jwt;
	passport.authenticate("jwt", {session: false}, (err, user, info) => {
		if(err){
			console.log(err);
			return next(err);
		}

		if(!user){
			let response = Response.code(0);
			return res.status(response.get("status")).send({status: response.get("status"), message: response.get("message")});
		}else{
			let decode = jwt.decode(req.query.accessToken, JWTConfig.jwtSecret, "HS512")

			if(!decode.card){
				let response = Response.code(0);
				if(decode.u_id){
					response = Response.code(3);
				}
				return res.status(response.get("status")).send({status: response.get("status"), message: response.get("message")});	
			}

			let now = moment(new Date).format("x");
			let expired = moment(decode.expired).format("x");
			if(now > expired){
				let response = Response.code(2);
				return res.status(response.get("status")).send({status: response.get("status"), message: response.get("message")});		
			}
			res.locals.member = decode;
			// console.log("here");
			return next();
		}
	})(req, res, next);	
}