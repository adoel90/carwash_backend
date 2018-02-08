import { Model } from './model';

export class EmployeeModel extends Model {
    constructor() {
        super();
    }

    /* Get list employee */
    listEmployee(param) {
        this.db.init();
        this.db.select("employee", "count(*)");
        this.db.push();
        
        this.db.select("employee");
        this.db.limit(param.limit, param.offset);
        this.db.push();

        return this.db.executeMany();
    }

    /* Get employee by ID */
    getEmployeeById(id) {
        this.db.init();
        this.db.select("employee");
        this.db.where("emp_id", id);

        return this.db.execute();
    }

    /* Get employee by username */
    getEmployeeByUsername(param) {
        this.db.init();
        this.db.select("employee");
        this.db.where("emp_username", param);

        return this.db.execute(true);
    }

    /* Create new employee */
    createEmployee(param) {
        this.db.init();
        this.db.insert("employee", param);

        return this.db.execute();
    }

    /* Update employee */
    updateEmployee(param, id) {
        this.db.init();
        this.db.update("employee", param);
        this.db.where("emp_id", id);

        return this.db.execute();
    }

    /* Delete employee */
    deleteEmployee(param, id) {
        this.db.init();
        this.db.update("employee", param);
        this.db.where("emp_id", id);

        return this.db.execute();
    }
}