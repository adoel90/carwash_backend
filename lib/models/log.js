import { Model } from './model';

export class LogModel extends Model {
    constructor() {
        super();
    }
    
    /*** create log user ***/
    createLogUser(data) {
        this.db.init();
        this.db.insert("log", data);

        return this.db.execute();
    }
}