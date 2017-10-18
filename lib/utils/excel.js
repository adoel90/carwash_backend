import exceljs from "exceljs";
import { stringFormat } from "../utils/util";

export class Excel{
	constructor(){
		this._column = "A";
		this._row = 1;
		this._headers = [];
		this._columns = [];
		this._data = [];
		this._rowspan = 0;
	}

	currentCell(){
		return stringFormat`${this._column}${this._row}`;
	}

	currentRow(){
		return this._row;
	}

	currentColumn(){
		return this._column;
	}

	nextCell(column, row){
		let c = this._column;
		let r = this._row;
		if(column){
			c = this.nextColumn(column);
		}
		if(row){
			r = this.nextRow(row);
		}

		return stringFormat`${c}${r}`;
	}

	nextRow(length=1){
		return this._row + length;
	}

	nextColumn(length=1){
		return String.fromCharCode(this._column.charCodeAt(0)+ length);
	}

	toNextColumn(length=1){
		this._column = String.fromCharCode(this._column.charCodeAt(0)+ length);
		return this._column;
	}

	toNextRow(length=1){
		this._row += length;
		return this._row;
	}

	firstColumn(){
		this._column = "A";
		return this._column;
	}

	checkChild(){
		for(let i=0; i<this._columns.length; i++){
			if(this._columns[i].child){
				this._rowspan = 1;
			}
		}
	}

	setColumn(columns){
		this._columns = columns;
	}

	setData(data){
		this._data = data;
	}

	createHeader(){
		let rowspan = this.checkChild();
		this.column_keys = []; 
		console.log(this.worksheet.getColumn('C'));
		for(let i=0; i<this._columns.length; i++){
			let cell = this.currentCell();
			this.worksheet.getCell(cell).value = this._columns[i].name;
			this.worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' };
			if(this._columns[i].key){
				this.column_keys.push(this._columns[i].key);
			}
			if(this._rowspan > 0 && !this._columns[i].child){
				let nextCell = this.nextCell(null, this._rowspan);
				this.worksheet.mergeCells(cell+":"+nextCell);
			}
			if(this._columns[i].child){
				let nextCell = this.nextCell((this._columns[i].child.length-1), null);
				this.worksheet.mergeCells(cell+":"+nextCell);
				cell = this.nextCell(1, null);
				for(let j=0; j<this._columns[i].child.length; j++){
					cell = this.nextCell(j, 1);
					this.worksheet.getCell(cell).value = this._columns[i].child[j].name;
					this.worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' };
					this.worksheet.getColumn(this.currentColumn()).width = this._columns[i].child[j].width;
					this.column_keys.push(this._columns[i].child[j].key);
				}
			}
			this.toNextColumn()
		}
	}

	placeData(){
		this.toNextRow((this._rowspan+1));
		this.firstColumn();
		for(let i=0; i<this._data.length; i++){
			for(let j=0; j<this.column_keys.length; j++){
				let cell = this.currentCell();
				this.worksheet.getCell(cell).value = this._data[i][this.column_keys[j]];
				this.worksheet.getColumn(this.currentColumn()).width = this._data[i][this.column_keys[j]].length;
				this.toNextColumn();
			}
			this.toNextRow();
			this.firstColumn();
		}
	}

	generateExcel(filename, type="xlsx"){
		return new Promise((resolve, reject) => {
			let workbook = new exceljs.Workbook();
			this.worksheet = workbook.addWorksheet("Sheet 1");
			this.createHeader();
			this.placeData();

			workbook.xlsx.writeFile(filename+"."+type).then(function(){
				resolve(true);
			}).catch(function(err){
				reject(err);
			})
		});
	}

}