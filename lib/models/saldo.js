import { Model } from "./model";

export class SaldoModel extends Model {
  getAll(limit, offset, card) {
    this.db.select("saldo");
    this.db.join("card_type", "card_type.ct_id = saldo.ct_id", "LEFT");
    if(card) {
      this.db.where("saldo.ct_id", card);
    }
    this.db.order("saldo.created_at", true);
    // this.db.limit(limit, offset);

    return this.db.execute();
  }

  getOne(type) {
    this.db.select("saldo");
    this.db.join("card_type", "card_type.ct_id = saldo.ct_id", "LEFT");
    this.db.where("ct_id", type);

    return this.db.execute();
  }

  insert(data) {
    this.db.init();
    this.db.insert('saldo', data);

    return this.db.execute();
  }

  update(id, data) {
    this.db.init();
    this.db.update('saldo', data);
    this.db.where('id', id);

    return this.db.execute();
  }
  
  destroy(id) {
    this.db.init();
    this.db.delete('saldo');
    this.db.where('id', id);

    return this.db.execute();
  }

  getBalanceId(id) {
    this.db.init();
		this.db.select("saldo");
		this.db.where("id", id);

		return this.db.execute(true);
  }
}
