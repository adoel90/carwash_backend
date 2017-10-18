import { Controller } from "./controller";

import { CardModel } from "../models/card";

export class CardController extends Controller {
	constructor(){
		super();
	}

	/*
	** Get list of card type
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
}