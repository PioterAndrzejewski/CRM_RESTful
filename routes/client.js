const express = require("express");

const { db } = require("../utils/db");

const clientRouter = express.Router();

clientRouter
	.get("/", (req, res) => {
		res.render("client/list-all", {
			clients: db.getAll(),
		});
	})
	.get("/:id", (req, res) => {
		res.send("Get one działa");
	})
	.post("/", (req, res) => {
		res.send("Post działa");
	})
	.put("/:id", (req, res) => {
		res.send("Put działa");
	})
	.delete("/", (req, res) => {
		res.send("Delete działa");
	});

module.exports = {
	clientRouter,
};
