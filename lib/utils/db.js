import { stringFormat } from "./util";


export class Db {
	consturctor(){
		this.util = new Util();
		this.init();
	}

	init(){
		this.query = null;
		this.q_select = null;
		this.q_join = null;
		this.q_where = null;
		this.q_group = null;
		this.q_order = null;
		this.q_limit = null;
		this.q_insert = null;
		this.q_update = null;
		this.q_delete = null;
		this.q_batch = [];
	}

	select(table, fields="*", alias){
		this.q_select = stringFormat`SELECT ${fields} FROM ${table} ${alias}`;
	}

	join(table, on, type="", alias){
		let join_type = ["LEFT", "RIGHT", "INNER"];
		let q_join = null;
		if(!join_type.includes(type.toUpperCase())){
			type = "";
		}

		q_join = stringFormat`${type.toUpperCase()} JOIN ${table} ${alias} ON ${on}`;
		if(this.q_join){
			this.q_join += stringFormat` ${q_join}`;
		}else{
			this.q_join = q_join;
		}
	}

	where(field, value, operator="AND"){
		if(!this.q_data){
			this.q_data = {};
		}

		let v = "$("+field+")";
		this.q_data[field] = value;
		if(this.q_where){
			this.q_where += stringFormat` ${operator} ${field}=${v}'`;
		}else{
			this.q_where = stringFormat`WHERE ${field}=${v}`;
		}
	}

	group(by){
		this.q_group = stringFormat`GROUP BY ${by}`;
	}

	order(by, reverse=false){
		let order_type = "ASC";
		if(reverse){
			order_type = "DESC";
		}

		this.q_order = stringFormat`ORDER BY ${by} ${order_type}`;
	}

	limit(limit, offset){
		if(limit !== null && offset !== null){
			this.q_limit = stringFormat`LIMIT ${limit} OFFSET ${offset}`;
		}else{
			this.q_limit = stringFormat`LIMIT ${limit}`;
		}
	}

	query(query){
		this.query = query;
	}

	insert(table, param, primary_key){
		let fields = [];
		let values = [];
		if(!this.q_data){
			this.q_data = {};
		}
		for(let key in param){
			fields.push(key);
			values.push("$("+key+")");
			this.q_data[key] = param[key];
		}
		this.q_insert = stringFormat`INSERT INTO ${table}(${fields.join()}) VALUES (${values.join()})`;
		if(primary_key){
			this.q_insert += stringFormat` RETURNING ${primary_key}`;
		}
	}

	update(table, param){
		let update_set = [];
		if(!this.q_data){
			this.q_data = {};
		}
		for(let key in param){
			let v = "$("+key+")";
			this.q_data[key] = param[key];
			update_set.push(stringFormat`${key}=${v}`);
		}

		this.q_update = stringFormat`UPDATE ${table} SET ${update_set.join()}`;
	}

	delete(table){
		this.q_delete = stringFormat`DELETE FROM ${table}`;
	}

	push(){
		this.q_batch.push(this.execute());
	}

	build_query(){
		if(this.q_insert){
			this.query = this.q_insert;
		}
		else if(this.q_update && this.q_where){
			this.query = stringFormat`${this.q_update} ${this.q_where}`;
		}
		else if(this.q_delete && this.q_where){
			this.query = stringFormat`${this.q_delete} ${this.q_where}`;
		}
		else{
			this.query = stringFormat`${this.q_select} ${this.q_join} ${this.q_where} ${this.q_group} ${this.q_order} ${this.q_limit}`;
		}

		return this.query;
	}

	execute(one=false){
		this.build_query();

		if(one){
			return dbConn.one(this.query, this.q_data);
		}else{
			return dbConn.any(this.query, this.q_data);
		}
	}

	executeMany(){
		let queries = this.q_batch;
		return dbConn.tx(function (t) {
			return this.batch(queries);
		});
	}
}