const express = require("express");
const hbs = require("express-handlebars");

const { clientRouter } = require("./routes/client");
const { homeRouter } = require("./routes/home");

const { db } = require("./utils/db");

const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.static("public"));
app.use(express.json());
app.engine(
	"hbs",
	hbs.engine({
		extname: "hbs",
	})
);
app.set("view engine", "hbs");

app.use("/", homeRouter);
app.use("/client", clientRouter);

app.get("/test", (req, res) => {
	db.create({ name: "ej", mail: "pomidor" });
	db.update("905bb36b-ea0d-4b6b-9586-f966f43037df", {
		name: "Zmieniony testerek",
	});
	res.json(db.getAll());
});

app.listen(3000, "0.0.0.0", () => {
	console.log("Server is listening");
});
