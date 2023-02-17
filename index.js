const express = require("express");
const hbs = require("express-handlebars");
const methodOverride = require('method-override')

const { clientRouter } = require("./routes/client");
const { homeRouter } = require("./routes/home");

const {handleError} = require("./utils/error")

const { db } = require("./utils/db");

const app = express();


app.use(methodOverride(`_method`));
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

app.use(handleError);

app.listen(3000, "0.0.0.0", () => {
	console.log("Server is listening");
});


