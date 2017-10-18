import { Controller } from "./controller";

import { MemberModel } from "../models/member";
import { CardModel } from "../models/card";

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

	/*
	** Create new member
	** POST :: /member/create
	*/
	createMember(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();
			let cardModel = new CardModel();

			let cardParam = {
				c_id : cardModel.generateCardId(param.card),
				ct_id : param.card
			}

			cardModel.getCardTypeById(param.card).then((card_type) => {
				cardModel.insertCard(cardParam).then((card) => {
					let memberParam = {
						m_name : param.name,
						m_phone : param.phone,
						m_email : param.email,
						m_address : param.address,
						m_balance : param.balance,
						c_id : card.c_id,
						mt_id : param.card
					}
					memberModel.insertMember(memberParam).then((member) => {
						return resolve(true);
					}).catch((err) => {
						return reject(err);
					});
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				if(err.code == 0){
					return reject(20);
				}
				return reject(err);
			});
		});
	}

	/*
	** Update member data
	** PUT :: /member/update
	*/
	updateMember(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			let memberParam = {
				m_name : param.name,
				m_phone : param.phone,
				m_email : param.email,
				m_address : param.address,
				updated_at : this.moment(new Date).format()
			}

			memberModel.updateMember(param.id, memberParam).then((member) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Delete member
	** PUT :: /member/delete
	*/
	deleteMember(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			let memberParam = {
				deleted_at : this.moment(new Date).format()
			}

			memberModel.updateMember(param.id, memberParam).then((member) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			})
		});
	}
}