import { Controller } from "./controller";

import { MemberModel } from "../models/member";

export class MemberController extends Controller{
	constructor(){
		super();
	}

	/*
	** Get member list
	** GET :: /member/list
	*/
	memberList(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			memberModel.getMemberList(param.limit, param.offset).then((member) =>{
				let result = {
					row : member[0][0].count,
					data : []
				}

				for(let i=0; i<member[1].length; i++){
					result.data.push(this.build.member(member[1][i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}