const express = require("express");

const { db } = require("../utils/db");
const {ClientRecord} = require("../records/clientRecord");
const {NotFoundError} = require("../utils/error")

const clientRouter = express.Router()


clientRouter
	.get("/", (req, res) => {
		res.render("client/list-all", {
			clients: db.getAll(),
		});
	})
	.get("/:id", (req, res) => {
		const client = db.getOne(req.params.id);

		if (!client) {
			throw new NotFoundError();
		}
		res.render("client/one", {
			client,
		});
	})
	.post("/", (req, res) => {
		const {mail, name, nextContactAt, notes} = req.body;
		const newClient = {mail, name, nextContactAt, notes}
		const id = db.create(newClient);
		res.status(201);
		res.render('client/added', {
			name,
			id
		});
	})
	.put("/:id", (req, res) => {
		db.update(req.params.id, req.body)
		res.render('client/modified', {name: req.body.name, id: req.params.id})
	})
	.delete("/:id", (req, res) => {
		db.delete(req.params.id);
		res.render("client/deleted");
	})
	.get('/form/add', (req, res) => {
		res.render('client/forms/add')
	})
	.get('/form/edit/:id', (req, res) => {
		const client = db.getOne(req.params.id);
		res.render('client/forms/edit', {client});
	})


module.exports = {
	clientRouter,
};

