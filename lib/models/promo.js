import { Model } from './model';

export class PromoModel extends Model {
      constructor() {
            super();
      }
      
      /*** Get Promo Store List ***/
      getPromoList (id, start, end) {
            this.db.init();
            this.db.select("promo", "count(*)");
            this.db.where("store_id", id);
            if(start && end) {
                  this.db.whereBetween("date(p_date)", start, end);
            }
            this.db.push();

            this.db.select("promo");
            this.db.order("p_id");
            this.db.push();

            return this.db.executeMany();
      }

      /*** Get Promo Store Detail ***/
      getPromoDetail (id) {
            this.db.init();
            this.db.select("promo");
            this.db.where("p_id", id);

            return this.db.execute(true);
      }

      /*** Create Promo Store ***/
      createPromo (data) {
            this.db.init();
            this.db.insert("promo", data);

            return this.db.execute();
      }

      /*** Update Promo Store ***/
      updatePromo (data, id) {
            this.db.init();
            this.db.update("promo", data);
            this.db.where("p_id", id);

            return this.db.execute();
      }
}