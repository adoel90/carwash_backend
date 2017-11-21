import { Controller } from "./controller";
import { CafeModel } from "../models/cafe";


export class ReportController extends Controller {
    constructor(){
        super();
    }

    /* 
    ** Get report cafe transaction
    ** GET :: /report/cafe/transaction
    */
    cafeTransactionReport(param) {
        return new Promise((resolve, reject) => {
            let cafeModel = new CafeModel();

            cafeModel.getCafeTransactionReport(param.limit, param.offset, param.cafe).then((transaction) => {
                let result = {
                    row : transaction[0][0].count,
                    transaction : []
                }

                for(let i=0; i<transaction[1].length; i++){
                    let trans = this.build.transactionCafe(transaction[1][i]);
                    trans.menu = this.build.menu(transaction[1][i]);
                    delete trans.menu.price;
                    
                    trans.quantity = transaction[1][i].tcm_quantity;
                    trans.price = transaction[1][i].tcm_price;
                    trans.cafe = this.build.cafeType(transaction[1][i]);
                    result.transaction.push(trans);
                }

                return resolve(result);
            }).catch((err) => {
                return reject(err);
            });
        });
    }
}