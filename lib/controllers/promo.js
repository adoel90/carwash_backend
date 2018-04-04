import { Controller } from './controller';
import { PromoModel } from '../models/promo';

export class PromoController extends Controller {
      constructor() {
            super();
      }

      /*
      ** Get list promo
      ** GET :: /store/promo/list
      */
      getPromo (param) {
            return new Promise((resolve, reject) => {
                  let promoModel = new PromoModel();
                  
                  promoModel.getPromo(param.id, param.active).then((promo) => {
                        let result = {
                              row: promo[0][0].count,
                              promo: []
                        }

                        for(let i=0; i<promo[1].length; i++) {
                              result.promo.push(this.build.promo(promo[1][i]));
                        }

                        return resolve(result);
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }
      
      /*
      ** Get list promo
      ** GET :: /store/promo/list
      */
      getPromoList (param) {
            return new Promise((resolve, reject) => {
                  let promoModel = new PromoModel();
                  
                  promoModel.getPromoList(param.id, param.start_date, param.end_date, param.active).then((promo) => {
                        let result = {
                              row: promo[0][0].count,
                              promo: []
                        }

                        for(let i=0; i<promo[1].length; i++) {
                              result.promo.push(this.build.promo(promo[1][i]));
                        }

                        return resolve(result);
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }

      /*
      ** Get promo detail
      ** GET :: /store/promo/detail
      */
      getPromoDetail(param) {
            return new Promise((resolve, reject) => {
                  let promoModel = new PromoModel();

                  promoModel.getPromoDetail(param.id).then((promo) => {
                        let result = this.build.promo(promo)
                        
                        return resolve(result);
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }

      /*
      ** Create new promo
      ** POST :: /store/promo/create
      */
      createNewPromo(param) {
            return new Promise((resolve, reject) => {
                  let promoModel = new PromoModel();

                  let paramPromo = {
                        store_id : param.store,
                        p_price : param.price,
                        p_date : param.date ? param.date : this.moment(new Date).format()
                  }

                  promoModel.createPromo(paramPromo).then(() => {
                        return resolve(true);
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }

      /*
      ** Update promo
      ** PUT :: /store/promo/update
      */
      updatePromo(param) {
            return new Promise((resolve, reject) => {
                  let promoModel = new PromoModel();

                  let paramPromo = {
                        p_price : param.price
                  }

                  promoModel.updatePromo(paramPromo, param.id).then(() => {
                        return resolve(true);
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }

      /*
      ** Delete promo
      ** PUT :: /store/promo/delete
      */
      deletePromo(param) {
            return new Promise((resolve, reject) => {
                  let promoModel = new PromoModel();

                  let paramPromo = {
                        deleted_at : this.moment(new Date).format()
                  }

                  promoModel.updatePromo(paramPromo, param.id).then(() => {
                        return resolve(true);
                  }).catch((err) => {
                        return reject(err);
                  });
            });
      }

      /*
      ** Change status promo
      ** PUT :: /store/promo/status
      */
      changeStatusPromo(param) {
            return new Promise((resolve, reject) => {
                  let promoModel = new PromoModel();

                  promoModel.getPromoDetail(param.id).then((promo) => {
                        let paramPromo = {
                              deleted_at : promo.deleted_at ? null : this.moment(new Date).format()
                        }

                        promoModel.updatePromo(paramPromo, param.id).then(() => {
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