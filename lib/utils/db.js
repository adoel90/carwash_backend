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
		this.execQuery = false;
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

		let v = "$("+field.replace(".","_")+")";
		this.q_data[field.replace(".","_")] = value;
		if(this.q_where){
			this.q_where += stringFormat` ${operator} ${field}=${v}`;
		}else{
			this.q_where = stringFormat`WHERE ${field}=${v}`;
		}
	}

	whereLike(field, value, operator="AND"){
		if(!this.q_data){
			this.q_data = {};
		}

		let v = "$("+field.replace(".","_").replace("(", "_").replace(")","")+")";
		this.q_data[field.replace(".","_").replace("(", "_").replace(")","")] = value;
		if(this.q_where){
			this.q_where += stringFormat` ${operator} ${field} like ${v}`;
		}else{
			this.q_where = stringFormat`WHERE ${field} like ${v}`;
		}
	}

	whereNotNull(field, operator="AND"){
		if(this.q_where){
			this.q_where += stringFormat` ${operator} ${field} is not NULL`;
		}else{
			this.q_where = stringFormat`WHERE ${field} is not NULL`;
		}	
	}

	whereIsNull(field, operator="AND"){
		if(this.q_where){
			this.q_where += stringFormat` ${operator} ${field} is NULL`;
		}else{
			this.q_where = stringFormat`WHERE ${field} is NULL`;
		}	
	}

	whereAny(field, value, operator="AND"){
		if(!this.q_data){
			this.q_data = {};
		}

		let v = "any(array"+JSON.stringify(value).replace(/"/g, "'")+")";
		if(this.q_where){
			this.q_where += stringFormat` ${operator} ${field}=${v}`;
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

	setQuery(query, data){
		this.query = query;
		this.q_data = data;
		this.execQuery = true;
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

	push(flush=false){
		this.q_batch.push(this.execute());
		if(flush){
			this.q_data = {};
		}
	}

	build_query(){
		if(!this.execQuery){
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
		}
		
		return this.query;
	}

	execute(one=false, debug=false){
		this.build_query();

		let query = this.query;
		let data = this.q_data;

		if(debug){
			console.log(query, data);
		}
		if(one){
			return dbConn.one(query, data);
		}else{
			return dbConn.any(query, data);
		}
	}

	executeMany(){
		let queries = this.q_batch;
		return dbConn.tx(function (t) {
			return this.batch(queries);
		});
	}
}