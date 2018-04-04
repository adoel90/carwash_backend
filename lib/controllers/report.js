import { Controller } from "./controller";
import { CafeModel } from "../models/cafe";
import { ServiceModel } from "../models/service";
import { ReportModel } from "../models/report";

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

            /* cafeModel.getCafeTransactionReport(param.start_date, param.end_date, param.cafe).then((transaction) => {
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
            }); */

            cafeModel.cafeTransactoinReport(param.start_date, param.end_date, param.cafe).then((transaction) => {
                let result = this.build.reportRangeDate(param.start_date, param.end_date, transaction);

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

            serviceModel.getServiceTransactionReport(param.start_date, param.end_date, param.service).then((transaction) => {
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

    /*
    ** Get report summary cafe
    ** GET :: /report/summary/cafe
    */
    cafeSummaryReport(param) {
        return new Promise((resolve, reject) => {
            let cafeModel = new CafeModel();


            cafeModel.getCafeType().then((cafe) => {
                let cf = {};
                cf[0] = {
                    name : "Overall",
                    total : 0
                }

                for(let i=0; i<cafe.length; i++){
                    cf[cafe[i].cf_id] = {
                        name : cafe[i].cf_name,
                        total : 0
                    }
                }
``
                cafeModel.getCafeTransactionSummary(param.start_date, param.end_date).then((transaction) => {
                    let result = {};
                    for(let i=0; i<transaction.length; i++){
                        cf[transaction[i].cf_id].total = transaction[i].sum;
                        cf[0].total += parseFloat(transaction[i].sum);
                    }

                    for(let i in cf) {
                        result[cf[i].name] = {
                            total : cf[i].total
                        }
                    }
                    return resolve(result);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
    ** Get report summary services
    ** GET :: /report/summary/service
    */
    serviceSummaryReport(param) {
        return new Promise((resolve, reject) => {
            let serviceModel = new ServiceModel();

            serviceModel.getServiceType().then((type) => {
                let srv = {};
                srv[0] = {
                    name : "Overall",
                    total : 0
                }
                for(let i=0; i<type.length; i++){
                    srv[type[i].srvt_id] = {
                        name : type[i].srvt_name,
                        total : 0
                    }
                }

                serviceModel.getServiceTransactionSummary(param.start_date, param.end_date).then((transaction) => {
                    let result = {};
                    for(let i=0; i<transaction.length; i++){
                        srv[transaction[i].srvt_id].total = transaction[i].sum;
                        srv[0].total += parseFloat(transaction[i].sum);
                    }
                    
                    for(let i in srv){
                        result[srv[i].name] = {
                            total : srv[i].total
                        }
                    }

                    return resolve(result);
                }).catch((err) => {
                    return reject(err);
                });
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /* 
    ** Get report cafe transaction
    ** GET :: /report/member/list
    */
    getReportMember (params) {
        return new Promise((resolve, reject) => {
            let reportModel = new ReportModel();

            reportModel.getReportMemberList(params.start_date, params.end_date).then((report) => {
                let result = {
                    count : report[0][0].count,
                    report : []
                }

                console.log(report)

                for(let i=0; i<report[1].length; i++) {
                    result.report.push(this.build.reportMember(report[1][i]));
                }

                return resolve(result);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    /*
	** Get report member 
	** GET :: /store/report
	*/
	getReportMemberGraph(param) {
		return new Promise((resolve, reject) => {
			let reportModel = new ReportModel();

			let result = this.buildRangeMember(param.type, param.start_date, param.end_date);
			let format = "DD MMM YYYY";
			if (param.type == "month") {
				format = "MMM YYYY";
			} else if(param.type == "year") {
				format = "YYYY";
			}

			reportModel.getGraphReportMember(param.type, param.start_date, param.end_date).then((reportMember) => {
				for(let i=0; i<reportMember.length; i++){
					let date = this.moment(reportMember[i].date).format(format); 
					if(result[date]){
                        result[date].saldo += parseFloat(reportMember[i].sum);
					}
				}

				let data = [];
				for(let i in result) {
					result[i].name = i;
					data.push(result[i]);
				}
				
                return resolve(data);
			}).catch((err) => {
				return reject(err);
			});
		})
	}
}