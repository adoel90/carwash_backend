import { Controller } from "./controller";
import { CafeModel } from "../models/cafe";
import { ServiceModel } from "../models/service";

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

            cafeModel.getCafeTransactionReport(param.limit, param.offset, param.start_date, param.end_date, param.cafe).then((transaction) => {
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

    /* 
    ** Get report service transaction
    ** GET :: /report/service/transaction
    */
    serviceTransactionReport(param) {
        return new Promise((resolve, reject) => {
            let serviceModel = new ServiceModel();

            
            serviceModel.getServiceTransactionReport(param.limit, param.offset, param.start_date, param.end_date, param.service).then((transaction) => {
                let result = {
                    row : transaction[0][0].count,
                    transaction : []
                }

                for(let i=0; i<transaction[1].length; i++){
                    let trans = this.build.transactionService(transaction[1][i]);
                    trans.service = this.build.service(transaction[1][i]);
                    trans.type = this.build.serviceType(transaction[1][i]);
                    result.transaction.push(trans);
                }

                return resolve(result);
            }).catch((err) => {
                return this.error(res, err);
            });
        })
    }
}