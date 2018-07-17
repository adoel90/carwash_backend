import { Controller } from "./controller";
import { SaldoModel } from '../models/saldo';

export class SaldoController extends Controller {
  getAll(param) {
    return new Promise((resolve, reject) => {
      let model = new SaldoModel();
      
      model.getAll(param.limit, param.offset, param.card).then((data) => {
        let result = [];

        for(let i = 0; i < data.length; i++) {
          let param = this.build.balance(data[i]);

          result.push(param);
        }
        
        return resolve(result);
      }).catch((err) => {
        return reject(err);
      })
    });
  }

  getOne(type) {
    return new Promise((resolve, reject) => {
      let model = new SaldoModel();
      
      model.getOne(type).then((data) => {
        let result = [];

        for(let i = 0; i < data.length; i++) {
          let param = this.build.balance(data[i]);

          result.push(param);
        }

        return resolve(result);
      }).catch((err) => {
        return reject(err);
      })
    });
  }

  createNewBalance(param) {
    return new Promise((resolve, reject) => {
      let saldoModel = new SaldoModel();

      let dataBalance = {
        ct_id: param.card,
        bonus: param.bonus,
        saldo: param.saldo
      }
      
      saldoModel.insert(dataBalance).then(() => {
        return resolve(true);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  updateBalance(param) {
    return new Promise((resolve, reject) => {
      let saldoModel = new SaldoModel();
      
      let dataBalance = {
        ct_id: param.card,
        bonus: param.bonus,
        saldo: param.saldo,
        updated_at: this.moment(new Date).format()
      }
      
      saldoModel.update(param.id, dataBalance).then(() => {
        return resolve(true);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  deleteBalance(param) {
    return new Promise((resolve, reject) => {
      let saldoModel = new SaldoModel();
      
      saldoModel.destroy(param.id).then(() => {
        return resolve(true);
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  changeStatusBalance(param) {
    return new Promise((resolve, reject) => {
      let saldoModel = new SaldoModel();

      saldoModel.getBalanceId(param.id).then((balance) => {
        let balanceParam = {
          deleted_at: balance.deleted_at ? null : this.moment(new Date).format()
        }

        saldoModel.update(param.id, balanceParam).then(() => {
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