import { Controller } from "./controller";

import { CardModel } from "../models/card";
import { type } from "os";
import { promises } from "fs";

export class CardController extends Controller {
	constructor(){
		super();
	}

	/*
	** Get card type
	** GET :: /card/type
	*/
	cardType(){
		return new Promise((resolve, reject) => {
			let cardModel = new CardModel();

			cardModel.getCardType().then((card) => {
				let result = [];
				for(let i=0; i<card.length; i++){
					result.push(this.build.card(card[i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Get list of card type
	** GET :: /card/type/list
	*/
	cardTypeList(param){
		return new Promise((resolve, reject) => {
			let cardModel = new CardModel();

			cardModel.getCardTypeList(param.limit, param.offset).then((card) => {
				let result = {
					row : card[0][0].count,
					card : []
				}
				for(let i=0; i<card[1].length; i++){
					result.card.push(this.build.card(card[1][i]));
				}

				return resolve(result);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Create new card type
	** POST :: /card/type/create
	*/
	createCardType(param){
		return new Promise((resolve, reject) => {
			let cardModel = new CardModel();

			let cardParam = {
				ct_name : param.name,
				ct_min : param.min,
				ct_bonus : param.bonus,
				ct_refund : param.refund,
				ct_charge : param.charge
			}

			cardModel.insertCardType(cardParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Update card type data
	** PUT :: /card/type/update
	*/
	updateCardType(param){
		return new Promise((resolve, reject) => {
			let cardModel = new CardModel();

			let cardParam = {
				ct_name : param.name,
				ct_min : param.min,
				ct_bonus : param.bonus,
				ct_refund : param.refund,
				ct_charge : param.charge,
				updated_at : this.moment(new Date).format()
			}
			cardModel.updateCardType(param.id, cardParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Delete card type data
	** PUT :: /card/type/delete
	*/
	deleteCardType(param){
		return new Promise((resolve, reject) => {
			let cardModel = new CardModel();

			let cardParam = {
				deleted_at : this.moment(new Date).format()
			}
			cardModel.updateCardType(param.id, cardParam).then((data) => {
				return resolve(true);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/*
	** Change card type deleted status
	** PUT :: /card/type/status
	*/
	updateCardTypeStatus(param) {
		return new Promise((resolve, reject) => {
			let cardModel = new CardModel();

			cardModel.getCardTypeById(param.id).then((type) => {
				let cardParam = {
					deleted_at : type.deleted_at ? null : this.moment(new Date).format()
				}
				cardModel.updateCardType(param.id, cardParam).then((data) => {
					return resolve(true);
				}).catch((err) => {
					return reject(err);
				});
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/**
	** Generate card id by type
	** POST :: /card/list/generate/id
	*/
	generateCardId(param) {
		return new Promise((resolve, reject) => {
			let cardModel = new CardModel();
			for (let i = 0; i < 10; i++) {
				cardModel.getCardTypeById(param).then((type) => {
					cardModel.generateCardId(type.ct_id).then(() => {
						cardModel.getCardFromLastInserted(10).then((data) => {
							return resolve(data);
						}).catch((err) => {
							return reject(err);
						});
					}).catch((err) => {
						return reject(err);
					});
				}).catch((err) => {
					return reject(err);
				});
			}
		});
	}
}