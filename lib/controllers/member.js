import { Token } from "../utils/token";

import { Controller } from "./controller";

import { MemberModel } from "../models/member";
import { CardModel } from "../models/card";
import { CafeModel } from "../models/cafe";
import { ServiceModel } from "../models/service";
import { StoreModel } from "../models/store";
import { LogModel } from "../models/log";

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
			let storeModel = new StoreModel();

			memberModel.getMemberById(param.id).then((member) => {
				let result = this.build.member(member);
				if(!param.transaction) {
					return resolve(result);
				}

				result.transaction = [];
				// serviceModel.getServiceTransaction(param.id).then((service) => {
				// 	cafeModel.getCafeTransaction(param.id).then((cafe) => {
						storeModel.getStoreTransaction(param.id).then((store) => {
							memberModel.getTopupTransaction(param.id).then((topup) => {
								// for(let i=0; i<service.length; i++) {
								// 	let a = this.build.transactionService(service[i]);
								// 	a.timestamp = this.moment(a.date).format("x");
								// 	a.type = "service";
								// 	result.transaction.push(a);
								// }
								// for(let i=0; i<cafe.length; i++) {
								// 	let a = this.build.transactionCafe(cafe[i]);
								// 	a.timestamp = this.moment(a.date).format("x");
								// 	a.type = "cafe";
								// 	result.transaction.push(a);
								// }
								for(let i=0; i<store.length; i++) {
									let a = this.build.transactionStore(store[i]);
									a.timestamp = this.moment(a.date).format("x");
									a.type = "store";
									result.transaction.push(a);
								}
								for(let i=0; i<topup.length; i++) {
									let a = this.build.topup(topup[i]);
									a.timestamp = this.moment(a.date).format("x");
									a.type = "topup";
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
				// 	}).catch((err) => {
				// 		return reject(err);
				// 	});
				// }).catch((err) => {
				// 	return reject(err);
				// });
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
			let logModel = new LogModel();

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
						m_payment : param.payment,
						c_id : card.c_id,
					}
					memberModel.insertMember(memberParam).then((member) => {
						let logParam = {
							m_id : member.m_id,
							log_value : parseFloat(card_type.ct_min) + parseFloat(card_type.ct_bonus),
							log_before : 0,
							log_payment : param.payment,
							created_by : param.staff,
							log_description : "Buat Member"
						}

						logModel.createLogUser(logParam).then(() => {
							memberModel.getMemberById(member.m_id).then((m) => {
								member = this.build.member(m);
								member.payment = param.payment;
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
			let logModel = new LogModel();

			let memberParam = {
				m_name : param.name,
				m_phone : param.phone,
				m_email : param.email,
				m_address : param.address,
				m_balance : param.balance,
				updated_at : this.moment(new Date).format()
			}

			memberModel.getMemberById(param.id).then((member) => {
				memberModel.updateMember(param.id, memberParam).then(() => {
					let logParam = {
						m_id : param.id,
						log_value : member.ct_min,
						log_before : 0,
						log_payment : null,
						created_by : param.user,
						log_description : "Buat Member"
					}

					logModel.createLogUser(logParam).then(() => {
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
				if(member.card_delete || member.member_delete){
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
			let logModel = new LogModel();

			param.balance = parseFloat(param.balance);
			memberModel.getMemberById(param.id).then((member) => {
				cardModel.getCardTypeById(param.type).then((card) => {
					if(param.balance < card.ct_min) {
						return reject(32);
					}

					let bonus = 0;
					if (card.ct_min > 0) {
						bonus = (param.balance / parseFloat(card.ct_min));
					}
					
					param.balance += parseFloat(card.ct_bonus * bonus);
					let tpParam = {
						m_id : param.id,
						tp_value : param.balance,
						tp_before : member.m_balance ? member.m_balance : 0,
						tp_payment : param.payment,
						created_by : param.staff
					}
					
					memberModel.insertTopup(tpParam).then((topup) => {
						let logParam = {
							m_id : param.id,
							log_value : param.balance,
							log_before : member.m_balance ? member.m_balance : 0,
							log_payment : param.payment,
							created_by : param.staff,
							log_description : "Topup"
						}

						logModel.createLogUser(logParam).then(() => {
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
			let logModel = new LogModel();

			cardModel.getCardById(param.card).then((card) => {
				if(!card.ct_refund){
					return reject(22);
				}
				
				memberModel.getMemberById(card.m_id).then((member) => {
					let memberParam = {
						c_id : null,
						m_balance : 0
					}
					let tpParam = {
						m_id: member.m_id,
						tp_value : parseFloat(member.m_balance) * -1,
						tp_before : member.m_balance,
						tp_payment : -1,
						created_by : param.staff
					}

					memberModel.updateMember(card.m_id, memberParam).then(() => {
						let cardParam = {
							deleted_at : this.moment(new Date).format()
						}
						memberModel.insertTopup(tpParam).then((topup) => {
							let logParam = {
								m_id: member.m_id,
								log_value : parseFloat(member.m_balance) * -1,
								log_before : member.m_balance,
								log_payment : -1,
								created_by : param.staff,
								log_description : "Refund"
							}

							logModel.createLogUser(logParam).then(() => {
								cardModel.updateCard(param.card, cardParam).then(() => {
									return resolve(topup.tp_id);
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
				member.payment = topup.tp_payment;

				memberModel.getTopupCount().then((queue) => {
					member.queue = parseInt(queue[0].count);

					return resolve(member);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get tier data
	** GET :: /tier/list
	*/
	getTierList (param) {
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			memberModel.getTier().then((tier) => {
				let result = {
					tier : []
				}

				for (let i=0; i<tier.length; i++) {
					result.tier.push(this.build.tierPrice(tier[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/**
	 * Delete member data where name is null and where ct_id
	 * DELETE :: /member/remove
	 */
	removeMember(ct_id) {
		return new Promise((resolve, reject) => {
			let memberModel = new MemberModel();

			memberModel.removeMember(ct_id).then(() => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}
}