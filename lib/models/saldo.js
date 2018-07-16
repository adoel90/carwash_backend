import { Model } from "./model";

export class SaldoModel extends Model {
  getAll(limit) {
    this.db.select('saldo');
    this.db.order('created_at', true);
    this.db.limit(limit);

    return this.db.execute();
  }

  insert(saldo) {
    this.db.init();
    let data = { saldo: saldo }

    this.db.insert('saldo', data);
    this.db.push(true);

    return this.db.executeMany();
  }

  update(id, saldo) {
    this.db.init();
    let data = { saldo: saldo }

    this.db.update('saldo', data);
    this.db.where('id', id);
    this.db.push(true);

    return this.db.executeMany();
  }
  
  destroy(id) {
    this.db.delete('saldo');
    this.db.where('id', id);

    return this.db.execute();
  }
}