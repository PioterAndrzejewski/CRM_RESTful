const { readFile, writeFile } = require("fs").promises;
const { write } = require("fs");
const { join } = require("path");

const { v4: uuid } = require("uuid");

class Db {
	constructor(dbFileName) {
		this.dbFileName = join(__dirname, "../data", dbFileName);
		this._load();
	}

	async _load() {
		this._data = JSON.parse(await readFile(this.dbFileName));
	}

	async create(obj) {
		this._data.push({
			id: uuid(),
			...obj,
		});
		this._writeDbToFile(this._data);
	}

	getAll() {
		return this._data;
	}

	getOne(id) {
		return this._data.find((obj) => obj.id === id);
	}

	update(id, newObj) {
		this._data = this._data.map((obj) =>
			obj.id === id
				? {
						...obj,
						...newObj,
				  }
				: obj
		);
		this._writeDbToFile(this._data);
	}

	delete(id) {
		this._data = this._data.filter((obj) => obj.id !== id);
		this._writeDbToFile(this._data);
	}

	_writeDbToFile(data) {
		writeFile(this.dbFileName, JSON.stringify(data), "utf8");
	}
}

const db = new Db("client.json");

module.exports = {
	db,
};
