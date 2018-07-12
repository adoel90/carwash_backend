import { Controller } from "./controller";
import { SaldoModel } from '../models/saldo';

export class SaldoController extends Controller {
  getAll(limit) {
    return new Promise((resolve, reject) => {
      let model = new SaldoModel();
      
      model.getAll(limit).then((data) => {
        return resolve(data);
      }).catch((err) => {
        return reject(err);
      })
    });
  }

  insert(param) {
    return new Promise((resolve, reject) => {
      let model = new SaldoModel();

      if (Array.isArray(param) || param.length < 1) {
        for (let i = 0; i < param.length; i++) {
          model.insert(param[i]).then(() => {
            return resolve(true);
          }).catch((err) => {
            return reject(err);
          });
        }
      } else {
        model.insert(param).then(() => {
          return resolve(true);
        }).catch((err) => {
          return reject(err);
        });
      }
    });
  }

  update(param) {
    return new Promise((resolve, reject) => {
      let model = new SaldoModel();
      
      if (Array.isArray(param.saldo) || param.saldo.length < 1) {
        for (let i = 0; i < param.saldo.length; i++) {
          model.update(param.id[i], param.saldo[i]).then(() => {
            return resolve(true);
          }).catch((err) => {
            return reject(err);
          });
        }
      } else {
        model.update(param.id, param.saldo).then(() => {
          return resolve(true);
        }).catch((err) => {
          return reject(err);
        });
      }
    });
  }
}