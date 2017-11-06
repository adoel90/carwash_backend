import { Token } from "../utils/token";

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
					member : []
				}

				for(let i=0; i<member[1].length; i++){
					result.member.push(this.build.member(member[1][i]));
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
						m_balance : parseFloat(card_type.ct_min) + parseFloat(card_type.ct_bonus),
						c_id : card.c_id,
					}
					memberModel.insertMember(memberParam).then((member) => {
						memberModel.getMemberById(member.m_id).then((m) => {
							member = this.build.member(m);
							return resolve(member);
						}).catch((err) => {
							return reject(err);
						});
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

	/*
	** Authenticate member by card id
	** POST :: /member/authenticate
	*/
	memberAuthenticate(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();
			let token = new Token();

			memberModel.getMemberByCardId(param.c_id).then((member) => {
				let memberToken = {
					id : member.m_id,
					card : member.c_id,
					type : member.ct_id,
					expired : this.moment(new Date).add("10", "minutes")
				}

				let result = {
					accessToken : token.encode(memberToken),
					member : this.build.member(member)
				};

				return resolve(result);
			}).catch((err) => {
				if(err.code == 0){
					return reject(30);
				}
				return reject(err);
			});
		});
	}

	/*
	** Topup member balance
	** POST :: /member/topup
	*/
	topupMember(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();
			let cardModel = new CardModel();

			param.balance = parseFloat(param.balance);
			cardModel.getCardTypeById(param.type).then((card) => {
				let bonus = parseInt(param.balance / parseFloat(card.ct_min));
				param.balance += parseFloat(card.ct_bonus * bonus);
				memberModel.increaseBalance(param.id, param.balance).then((topup) => {
					return resolve(true);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Change member card
	** PUT :: /member/card/change
	*/
	changeCard(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();
			let cardModel = new CardModel();

			let cardParam = {
				c_id : cardModel.generateCardId(param.card),
				ct_id : param.card
			}
			cardModel.insertCard(cardParam).then((card) => {
				let memberParam = {
					c_id : cardParam.c_id
				}
				memberModel.updateMember(param.member, memberParam).then((member) => {
					return resolve(true);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}