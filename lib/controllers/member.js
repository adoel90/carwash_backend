import { Token } from "../utils/token";

import { Controller } from "./controller";

import { MemberModel } from "../models/member";
import { CardModel } from "../models/card";
import { CafeModel } from "../models/cafe";
import { ServiceModel } from "../models/service";

export class MemberController extends Controller{
	constructor(){
		super();
	}

	/*
	** Get member list
	** GET :: /member
	*/
	memberAll(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			memberModel.getMember(param.name).then((member) =>{
				let result = []

				for(let i=0; i<member.length; i++){
					result.push(this.build.member(member[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get member list
	** GET :: /member/list
	*/
	memberList(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			memberModel.getMemberList(param.limit, param.offset, param.name).then((member) =>{
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
	** Get member detail data
	** GET :: /member/detail
	*/
	memberDetail(param) {
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();
			let cafeModel = new CafeModel();
			let serviceModel = new ServiceModel();

			memberModel.getMemberById(param.id).then((member) => {
				let result = this.build.member(member);
				if(!param.transaction) {
					return resolve(result);
				}

				result.transaction = [];
				serviceModel.getServiceTransaction(param.id).then((service) => {
					cafeModel.getCafeTransaction(param.id).then((cafe) => {
						for(let i=0; i<service.length; i++) {
							let a = this.build.transactionService(service[i]);
							a.timestamp = this.moment(a.date).format("x");
							a.type = "service";
							result.transaction.push(a);
						}
						for(let i=0; i<cafe.length; i++) {
							let a = this.build.transactionCafe(cafe[i]);
							a.timestamp = this.moment(a.date).format("x");
							a.type = "cafe"
							result.transaction.push(a);
						}
						
						result.transaction.sort(function(a,b) { return (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0) });
						return resolve(result);
					}).catch((err) => {
						return reject(err);
					});
				}).catch((err) => {
					return reject(err);
				});
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
	** Change member status
	** PUT :: /member/status
	*/
	changeMemberStatus(param) {
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			memberModel.getMemberById(param.id).then((member) => {
				let memberParam = {
					deleted_at : member.deleted ? null : this.moment(new Date).format()
				}
				memberModel.updateMember(param.id, memberParam).then(() => {
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
	** Authenticate member by card id
	** POST :: /member/authenticate
	*/
	memberAuthenticate(param){
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();
			let token = new Token();

			memberModel.getMemberByCardId(param.c_id).then((member) => {
				if(member.card_delete){
					return reject(21);
				}
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
			memberModel.getMemberById(param.id).then((member) => {
				cardModel.getCardTypeById(param.type).then((card) => {
					if(param.balance < card.ct_min) {
						return reject(32);
					}
					let bonus = parseInt(param.balance / parseFloat(card.ct_min));
					param.balance += parseFloat(card.ct_bonus * bonus);
					let tpParam = {
						m_id : param.id,
						tp_value : param.balance,
						tp_before : member.m_balance
					}
					memberModel.insertTopup(tpParam).then((topup) => {
						memberModel.increaseBalance(param.id, param.balance).then(() => {		
							member = this.build.member(member);
							member.balance = parseFloat(member.balance) + parseFloat(param.balance);
							member.transaction = topup.tp_id;
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

	/*
	** Refund member card
	** POST :: /member/refund
	*/
	refundMember(param) {
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();
			let cardModel = new CardModel();

			cardModel.getCardById(param.card).then((card) => {
				if(!card.ct_refund){
					return reject(22);
				}
				memberModel.getMemberById(card.m_id).then((member) => {
					let memberParam = {
						c_id : null
					}
					memberModel.updateMember(card.m_id, memberParam).then(() => {
						let cardParam = {
							deleted_at : this.moment(new Date).format()
						}
						cardModel.updateCard(param.card, cardParam).then(() => {
							return resolve(true);
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
				return reject(err);
			});	
		});
	}

	/*
	** Get topup data
	** GET :: /member/topup/print
	*/
	topupData(param) {
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			memberModel.getTopup(param.id).then((topup) => {
				let member = this.build.member(topup);
				member.before = topup.tp_before;
				member.topup = topup.tp_value;

				return resolve(member);
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}